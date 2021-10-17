import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";

import baseURL from "../utils/baseURL";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation(async () => {
    const { data } = await axios.post(`${baseURL}/api/auth/forgot-password`, {
      email,
    });
    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync();
      toast.success("Please check your email to reset your password");
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  return (
    <div className="bg-blue-50 flex flex-col justify-center py-48 items-center">
      <h1 className="text-blue-600 text-3xl font-bold">Forgot Password</h1>
      <p className="text-gray-600">
        {" "}
        Enter your email to receive the passoword reset link.
      </p>
      <form className="my-8 w-1/4" onSubmit={onSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between my-4">
          <a href="/signup" className="text-blue-600">
            Don't have an account?
          </a>
          <a href="/signin" className="text-blue-600">
            Login instead
          </a>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded w-full my-4 py-1"
        >
          {mutation.isLoading && (
            <span className="absolute right-0 inset-y-0 flex items-center pr-3">
              <AiOutlineLoading
                className="h-5 w-5 text-gray-100 animate-spin"
                aria-hidden="true"
              />
            </span>
          )}
          Sign In
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
