import React from 'react';
import Header from '../components/Header.jsx';
const Home = () => {
  return (
    <div className="min-h-screen">
      <Header /> 
      <main className="container mx-auto py-12 px-6">   
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-2">Secure Login</h3>
              <p className="text-gray-600">We Keep Your Data Safe.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-2">Documents</h3>
              <p className="text-gray-600">Find All Your Document at a place.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated team is always here to help you succeed.</p>
            </div>
          </div>
        </section>
      </main> 
    </div>
  );
};

export default Home;