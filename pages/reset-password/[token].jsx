import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";

import baseURL from "../../utils/baseURL";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { token } = router.query;

  const mutation = useMutation(async () => {
    const { data } = await axios.put(
      `${baseURL}/api/auth/reset-password/${token}`,
      { password }
    );

    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password and confirm password should be same");
    }

    try {
      await mutation.mutateAsync();
      toast.success("Your password has been updated successfully");
      router.push("/signin");
    } catch (error) {
      console.log(error.response?.data?.msg);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-blue-50 flex flex-col justify-center py-48 items-center"
    >
      <h1 className="text-blue-600 text-3xl font-bold">Reset Password</h1>

      <div className="my-4 w-1/4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            name="password"
            type="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="my-4 w-1/4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            name="confirmPassword"
            type="password"
            autoComplete="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded w-1/4 my-4 py-1"
      >
        {mutation.isLoading && (
          <span className="absolute right-0 inset-y-0 flex items-center pr-3">
            <AiOutlineLoading
              className="h-5 w-5 text-gray-100 animate-spin"
              aria-hidden="true"
            />
          </span>
        )}
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
