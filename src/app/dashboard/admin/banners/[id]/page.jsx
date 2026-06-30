import BannerEditorClient from "./client";

export const metadata = {
  title: "Edit Banner | Admin Dashboard",
};

export default async function BannerEditorPage({ params }) {
  const { id } = await params;
  return <BannerEditorClient id={id} />;
}