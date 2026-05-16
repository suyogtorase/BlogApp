import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const BlogList = ({ refreshTrigger }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api");

      setBlogs(res.data.blogs);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);

      alert("Blog deleted successfully");

      fetchBlogs();

    } catch (error) {
      console.log(error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">

      {blogs.length === 0 ? (
        <div className="text-center text-gray-300 text-xl">
          No blogs available
        </div>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {blog.title}
                </h2>

                <p className="text-blue-400 mb-4">
                  By {blog.author}
                </p>

                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </p>

                <p className="text-gray-500 text-sm mt-4">
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default BlogList;