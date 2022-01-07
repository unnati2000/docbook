const General = () => {
  return (
    <div className="flex justify-between space-x-4">
      <div>
        <h1 className="text-xl">User Settings</h1>
        <p className="text-gray-500 my-1">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <div className="my-4 flex flex-col">
          <label>Your Name</label>
          <input
            type="text"
            className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
          />
        </div>

        <div className="my-4 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
          />
        </div>

        <div>
          <div className="my-4 flex flex-col">
            <label>Street Address</label>
            <input
              type="text"
              className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <label>City</label>
              <input
                type="text"
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label>State</label>
              <input
                type="text"
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Pincode</label>
              <input
                type="text"
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <img
          className="rounded-full h-48 w-48 mb-2"
          src="https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg"
        />
        <button className="bg-blue-500 text-white rounded-sm px-4 py-2 my-2 shadow-md">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default General;
