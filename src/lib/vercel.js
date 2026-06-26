const VERCEL_API = "https://api.vercel.com";
const TOKEN = process.env.VERCEL_API_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;

if (!TOKEN || !PROJECT_ID) {
  console.warn("[vercel] Missing VERCEL_API_TOKEN or VERCEL_PROJECT_ID");
}

async function vercelFetch(path, options = {}) {
  const res = await fetch(`${VERCEL_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data?.error?.message || "Vercel API error");
    err.code = data?.error?.code;
    err.status = res.status;
    throw err;
  }
  return data;
}

// Add a domain to your Vercel project
export async function addDomainToVercel(domain) {
  return vercelFetch(`/v10/projects/${PROJECT_ID}/domains`, {
    method: "POST",
    body: JSON.stringify({ name: domain }),
  });
}

// Verify a domain
export async function verifyDomainOnVercel(domain) {
  return vercelFetch(
    `/v9/projects/${PROJECT_ID}/domains/${domain}/verify`,
    { method: "POST" }
  );
}

// Get domain status/config
export async function getDomainStatus(domain) {
  return vercelFetch(`/v9/projects/${PROJECT_ID}/domains/${domain}`);
}

// Get DNS config needed for the domain
export async function getDomainConfig(domain) {
  return vercelFetch(`/v6/domains/${domain}/config`);
}

// Remove a domain from your Vercel project
export async function removeDomainFromVercel(domain) {
  return vercelFetch(`/v9/projects/${PROJECT_ID}/domains/${domain}`, {
    method: "DELETE",
  });
}