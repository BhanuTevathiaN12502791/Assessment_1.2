import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition"
        >
          SubManager
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 text-sm">

          {user ? (
            <>
              <Link
                to="/tasks"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Subscriptions
              </Link>

              <Link
                to="/profile"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Profile
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Admin
                </Link>
              )}

              {/* ROLE BADGE */}
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                {user.role}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;