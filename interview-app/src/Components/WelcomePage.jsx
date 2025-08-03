import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/main'); // Change this path to your desired route
  };

  return (
      <>
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[90%] max-w-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome, Candidate!
            </h1>
            <p className="text-gray-600 mb-8">
              We're excited to have you here. Click below to begin your application.
            </p>
            <button
              onClick={handleNavigate}
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
            >
              Start Application
            </button>
          </div>
        </div>
        <div className='bg-white border-2 border-black mx-auto p-6 w-[200px] text-blue-600 flex items-center justify-center my-4 rounded transition duration-300 ease-in-out active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' 
        onClick={()=>navigate('/userlist')}>
          <h2>Welcome Admin</h2>
        </div>
      </>
  );
};

export default WelcomePage;