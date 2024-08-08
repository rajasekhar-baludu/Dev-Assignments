import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiHome, FiSearch, FiSend, FiGrid, FiCloud, FiBarChart2 } from 'react-icons/fi';
import { getAuth } from 'firebase/auth';
import 'tailwindcss/tailwind.css';

function SideBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    // Toggle the dark mode class on the <body> element
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col items-center w-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} py-4 space-y-8`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={handleToggle}
        className={`mb-4 p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} transition-colors`}
      >
        {darkMode ? '🌙' : '☀️'}
      </button>

      <div className="relative group">
        <FiMail className={`w-6 h-6 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => navigate('/')} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Mail
        </span>
      </div>
      <div className="relative group">
        <FiHome className={`w-6 h-6 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} onClick={() => navigate('/mail-list')} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Home
        </span>
      </div>
      <div className="relative group">
        <FiSearch className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Search
        </span>
      </div>
      <div className="relative group">
        <FiSend className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Campaign
        </span>
      </div>
      <div className="relative group">
        <FiGrid className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Lead List
        </span>
      </div>
      <div className="relative group">
        <FiCloud className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          One Box
        </span>
      </div>
      <div className="relative group">
        <FiBarChart2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
          Analytics
        </span>
      </div>
      {user && (
        <div className="relative group mt-auto mb-4">
          <img
            src={user.photoURL || 'default-profile.png'}
            alt="User Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className={`absolute left-8 top-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100`}>
            {user.displayName}
          </span>
        </div>
      )}
    </div>
  );
}

export default SideBar;
