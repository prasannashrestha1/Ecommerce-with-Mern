import React, { useState } from "react";
import login from ".././assets/login.webp";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <section className="flex">
      <div className="w-full h-[800px] flex items-center justify-center p-10 bg-black/4 lg:w-1/2">
        <div className="grow max-w-[500px]  bg-white p-12 rounded-md border border-gray-200">
          <div className="flex flex-col mb-8 text-center gap-2">
            <h4 className="text-lg font-medium">Ecommerce</h4>
            <h2 className="text-2xl font-medium mt-2">Hey there!</h2>
            <p className="text-sm font-medium">
              Enter your username and password to Login
            </p>
          </div>
          <form onSubmit={handleLogin} className="my-3">
            <div className=" my-3 flex flex-col gap-2">
              <label className="font-semibold text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="outline-none px-3 py-2 text-sm rounded-lg border border-gray-400 focus:border-primary"
              />
            </div>
            <div className="my-3 flex flex-col gap-2">
              <label className="font-semibold text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="outline-none px-3 py-2 text-sm rounded-lg border border-gray-400 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white p-2 rounded-lg mt-2 font-medium hover:bg-primary/80 cursor-pointer bg-primary"
            >
              {" "}
              Sign in
            </button>
          </form>
          <p className="mt-5 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 h-[800px] bg-red-400">
        <img src={login} className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default Login;
