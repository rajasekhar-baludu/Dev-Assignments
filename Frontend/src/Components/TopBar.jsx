import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function TopBar() {
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
    <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-300`}>
      <h1 className="text-xl font-bold">OneBox</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} transition-colors`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <span>{user?.displayName}'s Workspace</span>
      </div>
    </div>
  );
}

export default TopBar;
