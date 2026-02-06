import { Link } from "react-router-dom";

const Header = ({ userRole, username }) => {
  return (
    <header className="sticky top-0 z-50 bg-emerald-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-xl">S</span>
            </div>
            <h1 className="text-white text-2xl font-bold">SHOP Manager</h1>
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <img
                src="/placeholder.svg?height=24&width=24&text=📱"
                alt="Tablet Icon"
                className="w-6 h-6"
              />
              <span className="text-yellow-300 font-semibold capitalize">
                {userRole}
              </span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-white">
              <span className="text-emerald-200">Welcome, </span>
              <span className="font-semibold">{username}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/profile"
                className="text-white hover:text-emerald-200 transition-colors p-2 rounded-lg hover:bg-emerald-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              <Link
                to="/"
                className="text-white hover:text-emerald-200 transition-colors p-2 rounded-lg hover:bg-emerald-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
