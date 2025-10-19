import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, backendURL,setRole } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/logout`, {},
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedIn(false);
        setRole(null);
        toast.info("Logged out successfully");
        navigate('/')

      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          MyAppLogo
        </Link>

        <div className="space-x-4">
          <Link to="/" className="hover:text-teal-400">Home</Link>

          {isLoggedIn ? (
            <>
              <Link to="/document" className="hover:underline">Documents</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-teal-400 text-slate-800 px-3 py-1 rounded hover:bg-teal-500 transition duration-200">
                Login
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

