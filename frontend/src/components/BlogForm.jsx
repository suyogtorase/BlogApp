import { useState } from "react";
import axios from "axios";

const BlogForm = ({ onBlogAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/create", formData);

      alert("Blog added successfully");

      setFormData({
        title: "",
        content: "",
        author: "",
      });

      onBlogAdded();

    } catch (error) {
      console.log(error);
      alert("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Create New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-gray-300 mb-2 font-medium">
            Blog Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-600 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">
            Author Name
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-600 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">
            Blog Content
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            placeholder="Write your blog content..."
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-600 text-white outline-none focus:border-blue-500 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-all duration-200 text-white py-3 rounded-xl font-semibold text-lg"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>

      </form>
    </div>
  );
};

export default BlogForm;