import { createClient } from "@supabase/supabase-js";
import PublicDeckViewer from "@/components/pitch-deck/PublicDeckViewer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { token } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data } = await supabase
    .from("pitch_decks")
    .select("title, document_type")
    .eq("share_token", token)
    .eq("is_public", true)
    .maybeSingle();

  return {
    title: data ? `${data.title} — ${data.document_type}` : "Pitch Deck",
    description: "Professional pitch deck powered by Fancy Digitals",
  };
}

export default async function PublicPitchPage({ params }) {
  const { token } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: deck } = await supabase
    .from("pitch_decks")
    .select("*")
    .eq("share_token", token)
    .eq("is_public", true)
    .maybeSingle();

  if (!deck) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Deck not found</h1>
          <p className="text-gray-500">This pitch deck is private or has been removed.</p>
        </div>
      </div>
    );
  }

  const deckData = {
    title: deck.title,
    documentType: deck.document_type,
    theme: deck.theme,
    slides: deck.slides,
    primaryColor: deck.input_data?.primaryColor || "#075a01",
  };

  return <PublicDeckViewer deck={deckData} />;
}