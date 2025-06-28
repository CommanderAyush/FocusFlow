import React, { useState } from 'react';
import axios from "axios"

function FlowTribe() {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  const handlePost = () => {
    if (!author.trim() || !content.trim()) return;

    const newBlog = {
      id: Date.now(),
      author,
      content,
      timestamp: new Date().toLocaleString(),
    };
    axios.post(`/addBlog`,{
      Blog:newBlog
    }).catch(err=>console.log(err))

    setBlogs([newBlog, ...blogs]);
    setAuthor('');
    setContent('');
  };

  React.useEffect(() => {
    axios.get(`/getBlogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-sky-100 p-6 font-Montserrat">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-400">📝 Share Your Blog</h1>

        {/* Input Section */}
        <div className="space-y-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
          />
          <button
            onClick={handlePost}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Post Blog
          </button>
        </div>
      </div>

      {/* Blog Display Section */}
      <div className="max-w-4xl mx-auto mt-10 grid gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-lg font-semibold text-sky-500">{blog.author}</p>
                <p className="text-sm text-gray-500">{blog.times}</p>
              </div>
              
            </div>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowTribe;
