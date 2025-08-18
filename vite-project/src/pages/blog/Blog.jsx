import React, { useState } from "react";

const blogs = [
  {
    id: 1,
    imageSrc: "/media/images/1264.png",
    category: "UNCATEGORIZED",
    title: "How grocers are approaching delivery as the market evolves",
    date: "November 3, 2023",
    excerpt: `Bämlävakt treskaõe tníbel den mölmörisöbruk deren jyn rörinäg osk heterositik i rel ultran...`,
  },
  {
    id: 2,
    imageSrc: "/media/images/1272.png",
    category: "FOOD",
    title: "The Friday Checkout: Food insecurity keeps retailers off balance",
    date: "November 3, 2023",
    excerpt: `This blog explores challenges retailers face due to food insecurity...`,
  },
  {
    id: 3,
    imageSrc: "/media/images/1279.png",
    category: "AI",
    title: "Consumers want grocers to use AI to help them save money",
    date: "November 3, 2023",
    excerpt: `Consumers increasingly expect AI technologies to assist them...`,
  },
  {
    id: 4,
    imageSrc: "/media/images/1279.png",
    category: "RETAIL",
    title: "Order up! How grocers are replicating restaurant experience",
    date: "November 3, 2023",
    excerpt: `Grocers are innovating by combining elements of restaurant dining...`,
  },
  {
    id: 5,
    imageSrc: "/media/images/banner-21.jpg.png",
    category: "SUSTAINABILITY",
    title: "Sustainability trends driving grocery innovation in 2024",
    date: "November 1, 2023",
    excerpt: `A look at sustainability innovations in packaging and food waste...`,
  },
];

function BlogCard({ blog }) {
  return (
    <article className="mb-8">
      <a href="#" className="block overflow-hidden rounded-lg">
        <img
          src={blog.imageSrc}
          alt={blog.title}
          className="w-full h-100 object-cover transition-transform duration-300 hover:scale-105" // ✅ height increased
        />
      </a>
      <div className="mt-3 text-xs text-purple-700 font-semibold uppercase">
        {blog.category}
      </div>
      <h2 className="mt-2 text-lg font-semibold leading-6">
        <a href="#" className="hover:text-purple-700">
          {blog.title}
        </a>
      </h2>
      <time
        dateTime={blog.date.toString()}
        className="block text-xs text-gray-500 mt-1"
      >
        {blog.date}
      </time>
      <p className="mt-2 text-sm text-gray-700">{blog.excerpt}</p>
      <button className="mt-3 rounded px-3 py-1 bg-purple-700 text-white text-sm font-medium hover:bg-purple-800 transition">
        Read More
      </button>
    </article>
  );
}

function BlogSidebar() {
  const recentPosts = blogs.slice(0, 4);
  return (
    <aside className="w-full max-w-xs pl-6 border-l border-gray-200">
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Blog Post List</h3>
        <ul className="space-y-4 text-sm">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <a
                href="#"
                className="flex items-center space-x-3 hover:text-purple-700"
              >
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold leading-snug">{post.title}</h4>
                  <time className="block text-xs text-gray-500">
                    {post.date}
                  </time>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Social Media Widget</h3>
        <div className="space-y-2">
          <a
            href="#"
            className="block py-2 px-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            facebook
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded bg-blue-400 text-white hover:bg-blue-500"
          >
            twitter
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded bg-red-600 text-white hover:bg-red-700"
          >
            instagram
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            linkedin
          </a>
        </div>
      </div>
    </aside>
  );
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  const paginatedBlogs = blogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-white px-6 py-8 max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8">
      <main className="flex-1">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}

        {/* ✅ Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </main>

      <BlogSidebar />
    </div>
  );
}
