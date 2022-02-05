const Statistics = ({ data }) => {
  return (
    <div className="text-center">
      <div className="flex items-center gap-4 m-4">
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">{data?.length}</h1>
          <p>Total Appointments</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p>Total Revenue</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p>Total Reviews</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p>All Appointments</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
