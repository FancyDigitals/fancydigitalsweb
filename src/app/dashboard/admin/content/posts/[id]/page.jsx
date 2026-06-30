import PostEditorClient from "./client";

export const metadata = {
  title: "Edit Blog Post | Admin Dashboard",
};

export default async function EditPostPage({ params }) {
  const { id } = await params;
  return <PostEditorClient id={id} />;
}