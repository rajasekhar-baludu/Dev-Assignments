import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Onebox from './Components/Onebox';
import Login from './Components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MailList from './Components/MailList';

const App = () => {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onebox" element={isAuthenticated ? <Onebox /> : <Navigate to="/" />}>
            {/* Add other nested routes as necessary */}
          </Route>
            <Route path="/mail-list" element={isAuthenticated ? <MailList /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
