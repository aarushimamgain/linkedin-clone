export default function Navbar({ onLogout }) {
  const name = localStorage.getItem("name");

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">LinkedIn Clone</h1>
      <div>
        <span className="mr-4">{name}</span>
        <button
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
