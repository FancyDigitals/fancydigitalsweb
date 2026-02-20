async function getPost(slug) {
  const res = await fetch(
    `https://blog.fancydigitals.com.ng/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  return data[0];
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div className="py-20 text-center">Post not found</div>;
  }

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="max-w-3xl mx-auto py-20 px-6">
      {image && (
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full h-80 object-cover rounded-xl mb-10"
        />
      )}

      <h1
        className="text-4xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
