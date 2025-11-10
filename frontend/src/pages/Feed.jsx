import { useEffect, useState } from "react";
import { API } from "../api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const authorName = localStorage.getItem("name");

  // Fetch all posts
  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Create new post
  const handlePost = async () => {
    if (!content.trim() && !image) return alert("Please add content or an image!");

    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("content", content);
    if (image) formData.append("image", image);

    await API.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setContent("");
    setImage(null);
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  // Handle Like (frontend-only)
  const handleLike = (id) => {
    const updatedPosts = posts.map((p) =>
      p._id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 relative overflow-hidden p-4">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 backdrop-blur-2xl"></div>

      {/* Feed Container */}
      <div className="relative z-10 max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-white shadow-md">
          <h1 className="text-2xl font-bold">Welcome, {authorName}</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-4 py-1 rounded-full font-semibold hover:bg-purple-100 transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* Post Creator */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-lg p-5 text-white mb-8">
          <h2 className="text-lg font-semibold mb-3">Create a Post</h2>
          <textarea
            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 mb-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            rows="3"
            placeholder="What’s on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="text-sm mb-4 text-white/80"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            onClick={handlePost}
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-full shadow-md hover:bg-purple-100 transition-all duration-200"
          >
            Post
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-white/80">No posts yet. Be the first to share something!</p>
          ) : (
            posts.map((p) => (
              <div
                key={p._id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-5 text-white transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300"
              >
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center font-bold text-white shadow-md">
                    {p.authorName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.authorName}</h3>
                    <p className="text-xs text-white/70">
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-white/90 mb-3">{p.text}</p>

                {p.imageUrl && (
                  <img
                    src={`http://localhost:5000${p.imageUrl}`}
                    alt="Post"
                    className="rounded-xl max-h-80 w-full object-cover shadow-lg border border-white/10"
                  />
                )}

                {/* ❤️ Like Button */}
                <div className="flex items-center space-x-2 mt-3">
                  <button
                    onClick={() => handleLike(p._id)}
                    className="text-white/80 hover:text-pink-400 transition-all"
                  >
                    ❤️ {p.likes || 0}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

