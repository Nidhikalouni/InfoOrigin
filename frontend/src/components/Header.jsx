import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-cyan-600 text-white py-20 shadow-xl">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Your App
        </h1>
        <p className="text-xl mb-8">
        Document Versioning App - A perfect app for your document verification and review.
        </p>
        <Link 
          to="/signup" 
          className="bg-teal-400 text-slate-900 font-bold text-lg px-8 py-3 rounded-full hover:bg-teal-300 transition duration-300 transform hover:scale-105 inline-block"
        >
          Get Started Now
        </Link>
      </div>
    </header>
  );
};

export default Header;