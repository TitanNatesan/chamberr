import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icci from "../../Assets/icci.jpg";
import axios from "axios";
import Cookies from "js-cookie";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const csrf = Cookies.get("csrftoken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await axios.post("http://192.168.169.82:8000/login/", {
        username,
        password,
      }, {
        headers:{
          "X-CSRFToken": csrf,
        },
        withCredentials: true,
      });

      if (response.data['message']==="Login successful") {
        navigate("/now");
      }
      else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={icci} alt="Chamber" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to admin account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-black font-bold"
              >
                username Id
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-black font-bold"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer px-6 py-3 rounded-lg text-white font-bold"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
