import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white p-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;