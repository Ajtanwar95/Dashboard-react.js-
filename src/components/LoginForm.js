import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsonData from "./data.json";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      const user = jsonData.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 animate-bounce">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <BiShow className="text-gray-400" />
                ) : (
                  <BiHide className="text-gray-400" />
                )}
              </span>
            </div>
          </div>
          <button
            className="w-full py-2 px-4 text-white bg-pink-500 hover:bg-pink-600 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to={"/"} className="text-pink-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
