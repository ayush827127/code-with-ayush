import blogData from "@/public/data/blogData.json"; // Import JSON data
import Link from "next/link";

export async function generateMetadata({ params }) {
  const blog = blogData.find((b) => b.id === params.id);
  return {
    title: blog?.title || "Blog",
    description: blog?.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "Blog article",
    openGraph: {
      title: blog?.title,
      description: blog?.content?.replace(/<[^>]+>/g, "").slice(0, 160),
      images: [blog?.image || ""],
    },
  };
}

export default function BlogDetails({ params }) {
  const blog = blogData.find((b) => b.id === params.id);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-red-600 text-2xl font-semibold">
          Blog not found
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 sm:px-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
        <ol className="list-reset flex space-x-2">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/blogs"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Blogs
            </Link>
          </li>
          <li>/</li>
          <li aria-current="page" className="text-gray-800 font-semibold truncate max-w-xs">
            {blog.title}
          </li>
        </ol>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {blog.title}
          </h1>
          <time
            dateTime={new Date(blog.date).toISOString()}
            className="text-sm text-gray-500"
          >
            {blog.date}
          </time>
        </header>

        <figure className="mb-8">
          <img
            src={blog.image || "/images/blogs/blog1.png"}
            alt={blog.title}
            className="w-full rounded-lg object-cover max-h-96 shadow-md"
            loading="lazy"
          />
        </figure>

        <section
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
