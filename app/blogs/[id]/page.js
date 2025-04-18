import blogData from "@/public/data/blogData.json"; // Import JSON data
 
  
  export async function generateMetadata({ params }) {
    const blog = blogData.find((b) => b.id === params.id);
    return {
      title: blog?.title || 'Blog',
      description: blog?.content?.slice(0, 160) || 'Blog article',
      openGraph: {
        title: blog?.title,
        description: blog?.content?.slice(0, 160),
        images: [blog?.image || ''],
      },
    };
  }
  
  // ✅ CORRECT: No type annotations in JS
  export default function BlogDetails({ params }) {
    const blog = blogData.find((b) => b.id === params.id);
  
    if (!blog) {
      return (
        <div className="text-center text-red-500 text-xl py-10">
          Blog not found
        </div>
      );
    }
  
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{blog.date}</p>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-xl mb-6"
        />
        <article className="prose prose-lg max-w-none">{blog.content}</article>
      </main>
    );
  }
  