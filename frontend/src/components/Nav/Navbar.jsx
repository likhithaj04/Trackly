import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // adjust path
import { toast } from "react-toastify";

function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully')
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white">

      <div className="flex items-center gap-6">

        <Link to="/app/addJob">
          <h2 className="text-xl font-semibold">Trackly</h2>
        </Link>

        <ul className="flex gap-4">
          <li className="cursor-pointer hover:text-blue-500">
            Dashboard
          </li>
        </ul>

      </div>

      <div>

        {user?.isAuthenticated ? (

          <button
            className="px-4 py-1.5 border rounded-md hover:bg-gray-300 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <button
            className="px-4 py-1.5 border rounded-md hover:bg-gray-300 hover:cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

        )}

      </div>

    </nav>
  );
}

export default Navbar;