const ResetPassword = () => {
  return (
    <div className="bg-blue-50 flex flex-col justify-center py-48 items-center">
      <h1 className="text-blue-600 text-3xl font-bold">Reset Password</h1>

      <div className="my-8 w-1/4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="my-8 w-1/4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between my-4">
          <a href="/signup" className="text-blue-600">
            Don't have an account?
          </a>
          <a href="/signin" className="text-blue-600">
            Login instead
          </a>
        </div>
        <button className="bg-blue-600 text-white rounded w-full my-4 py-1">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
