import { useState } from "react";
import { API } from "../api";

export default function CreatePost({ refresh }) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await API.post("/posts", { text });
    setText("");
    refresh();
  };

  return (
    <div className="p-4 border rounded mb-4 bg-white shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="What's on your mind?"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
