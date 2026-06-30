import TemplateEditorClient from "./client";

export const metadata = {
  title: "Edit Template | Admin Dashboard",
};

export default async function TemplateEditorPage({ params }) {
  const { id } = await params;
  return <TemplateEditorClient id={id} />;
}