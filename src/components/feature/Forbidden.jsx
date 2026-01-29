import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold mt-4">Access Forbidden</h2>
        <p className="text-gray-400 mt-3">
          You don’t have permission to access this page.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2  font-semibold rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-2  font-semibold rounded-lg border border-gray-600 hover:bg-gray-300 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
