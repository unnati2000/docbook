const Password = () => {
  return (
    <form>
      <h1 className="text-lg">Password Settings</h1>
      <p className="text-gray-500 my-1">
        You will need to enter your current password before you can update your
        password.
      </p>

      <div className="flex flex-col mt-8">
        <label>Current Password</label>
        <input
          type="password"
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label>New Password</label>
        <input
          type="password"
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label>Confirm New Password</label>
        <input
          type="password"
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>
      <button className="bg-blue-500 mt-8 text-white rounded-sm px-4 py-2 shadow-md">
        Change Password
      </button>
    </form>
  );
};

export default Password;
