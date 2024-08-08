import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineCopyright } from 'react-icons/ai';
import { auth, provider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      navigate('/onebox');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <div className="bg-black text-white p-4 flex items-center justify-center flex-col">
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-white text-2xl mr-2" />
          <h1 className="text-2xl">REACHINBOX</h1>
        </div>
        <hr className="border-t border-gray-600 w-full" />
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-white text-2xl mb-4">Create a new account</h2>
          <button 
            onClick={handleGoogleSignIn}
            className="w-full bg-black text-white py-2 px-4 rounded mb-4 flex items-center justify-center"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Sign Up with Google
          </button>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Create an Account
          </button>
          <p className="text-white mt-4">Already have an account? <a href="/login" className="text-blue-400">Sign In</a></p>
        </div>
      </div>
      <div className="bg-black text-white p-4 flex flex-col items-center">
        <hr className="border-t border-gray-600 w-full mb-4" />
        <div className="flex items-center">
          <AiOutlineCopyright className="mr-2" />
          <span>2023 Reachinbox. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
