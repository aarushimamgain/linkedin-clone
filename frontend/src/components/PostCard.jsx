export default function PostCard({ post }) {
  return (
    <div className="p-4 border rounded mb-3 bg-white shadow-sm">
      <h3 className="font-semibold">{post.authorName}</h3>
      <p className="mt-2">{post.text}</p>
      <p className="text-xs text-gray-500 mt-1">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
