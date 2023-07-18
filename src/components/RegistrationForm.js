import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsonData from "./data.json";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = data;
    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const user = jsonData.users.find((user) => user.email === email);
        if (user) {
          toast.error("User already exists with the provided email");
        } else {
          const newUser = {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          };

          // Append new user to the users array
          jsonData.users.push(newUser);

          console.log("Signup data:", data);
          toast.success("Signup successful");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        toast.error("Password and confirm password do not match");
      }
    } else {
      toast.error("Please enter all required fields");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 animate-bounce">
          Sign up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={data.fullName}
              onChange={handleOnChange}
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? (
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
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-medium">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
