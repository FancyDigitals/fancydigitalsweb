import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import {
  addDomainToVercel,
  verifyDomainOnVercel,
  getDomainStatus,
  getDomainConfig,
  removeDomainFromVercel,
} from "@/lib/vercel";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function isValidDomain(d) {
  if (!d) return false;
  // basic check: x.y format, no spaces, no http://
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(d);
}

// LIST domains for a page
export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");
    if (!pageId) return NextResponse.json({ error: "pageId required" }, { status: 400 });

    const { data: domains } = await admin
      .from("custom_domains")
      .select("id, domain, status, verification_data, created_at, verified_at")
      .eq("page_id", pageId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    return NextResponse.json({ domains: domains || [] });
  } catch (error) {
    console.error("[custom-domain-list]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

// ADD new custom domain
export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify Pro
    const { data: profile } = await admin
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const isPro = profile?.plan && profile.plan !== "free";
    if (!isPro) {
      return NextResponse.json(
        { error: "Custom domains are a Pro feature. Upgrade to add your own domain." },
        { status: 403 }
      );
    }

    const { pageId, domain: rawDomain } = await request.json();
    const domain = (rawDomain || "").toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/$/, "");

    if (!pageId || !domain) {
      return NextResponse.json({ error: "pageId and domain required" }, { status: 400 });
    }

    if (!isValidDomain(domain)) {
      return NextResponse.json({ error: "Invalid domain format (use: yourdomain.com)" }, { status: 400 });
    }

    // Block our own root domain
    if (domain.endsWith("fancydigitals.com.ng")) {
      return NextResponse.json({ error: "Cannot use fancydigitals.com.ng as a custom domain" }, { status: 400 });
    }

    // Verify builder owns the page
    const { data: page } = await admin
      .from("published_pages")
      .select("id")
      .eq("id", pageId)
      .eq("user_id", user.id)
      .single();
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    // Check if domain already exists in our DB
    const { data: existing } = await admin
      .from("custom_domains")
      .select("id, user_id")
      .eq("domain", domain)
      .maybeSingle();

    if (existing) {
      if (existing.user_id !== user.id) {
        return NextResponse.json({ error: "This domain is already in use" }, { status: 409 });
      }
      return NextResponse.json({ error: "You already added this domain" }, { status: 409 });
    }

    // Add to Vercel
    let vercelResponse;
    try {
      vercelResponse = await addDomainToVercel(domain);
    } catch (err) {
      console.error("[vercel-add-domain]", err);
      return NextResponse.json(
        { error: err.message || "Failed to add domain to Vercel" },
        { status: 500 }
      );
    }

    // Get DNS config
    let config = null;
    try {
      config = await getDomainConfig(domain);
    } catch {
      // Non-blocking
    }

    // Save to DB
    const { data: saved, error: saveError } = await admin
      .from("custom_domains")
      .insert({
        page_id: pageId,
        user_id: user.id,
        domain,
        status: "pending",
        vercel_domain_id: vercelResponse?.name || domain,
        verification_data: {
          vercel: vercelResponse,
          config,
        },
      })
      .select()
      .single();

    if (saveError) {
      // Rollback Vercel
      try { await removeDomainFromVercel(domain); } catch {}
      throw saveError;
    }

    return NextResponse.json({
      success: true,
      domain: saved,
      instructions: buildDnsInstructions(domain, config),
    });
  } catch (error) {
    console.error("[custom-domain-add]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

// VERIFY domain
export async function PATCH(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domainId } = await request.json();
    if (!domainId) return NextResponse.json({ error: "domainId required" }, { status: 400 });

    const { data: record } = await admin
      .from("custom_domains")
      .select("id, domain, user_id")
      .eq("id", domainId)
      .eq("user_id", user.id)
      .single();

    if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      await verifyDomainOnVercel(record.domain);
    } catch {
      // Verify endpoint can throw if already verified — continue to status check
    }

    const status = await getDomainStatus(record.domain);
    const isVerified = status?.verified === true;

    await admin
      .from("custom_domains")
      .update({
        status: isVerified ? "verified" : "pending",
        verified_at: isVerified ? new Date().toISOString() : null,
      })
      .eq("id", domainId);

    return NextResponse.json({
      success: true,
      verified: isVerified,
      status,
    });
  } catch (error) {
    console.error("[custom-domain-verify]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

// REMOVE domain
export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domainId } = await request.json();
    if (!domainId) return NextResponse.json({ error: "domainId required" }, { status: 400 });

    const { data: record } = await admin
      .from("custom_domains")
      .select("id, domain, user_id")
      .eq("id", domainId)
      .eq("user_id", user.id)
      .single();

    if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Remove from Vercel
    try { await removeDomainFromVercel(record.domain); } catch {}

    // Remove from DB
    await admin.from("custom_domains").delete().eq("id", domainId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[custom-domain-delete]", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

// Helper to build DNS instructions
function buildDnsInstructions(domain, config) {
  const isApex = !domain.includes(".") || domain.split(".").length === 2;

  if (isApex) {
    return {
      type: "A",
      name: "@",
      value: "76.76.21.21",
      note: "For apex/root domain (e.g. example.com)",
    };
  }

  return {
    type: "CNAME",
    name: domain.split(".")[0],
    value: "cname.vercel-dns.com",
    note: "For subdomain (e.g. www.example.com)",
  };
}