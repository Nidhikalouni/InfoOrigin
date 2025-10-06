import React, { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

const SignUp = () => {
  const {backendURL} = useContext(AppContext)
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const handleSignUp =  async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(
        `${backendURL}/api/auth/register`,
        {name,email,password},
        {withCredentials:true}
      );

      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container mx-auto py-12 px-6 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-b from-cyan-50 to-white p-6 rounded-lg shadow-lg">
          <div className="bg-cyan-600 text-white rounded-md p-4 mb-4 text-center font-semibold">
            SIGN UP
          </div>

          <form
            onSubmit={handleSignUp}
            className="p-6 bg-slate-800 text-white rounded-md space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-700 text-white outline-none"
              required
            />
            <button className="w-full bg-teal-400 text-slate-800 py-2 rounded mt-4">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to = '/login'
              className="text-teal-400 cursor-pointer underline"
            
              
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
