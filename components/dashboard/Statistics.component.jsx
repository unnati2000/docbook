const Statistics = ({ data }) => {
  return (
    <div className="text-center">
      <div className="grid md:grid-cols-2 gap-4 m-4">
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">{data?.length}</h1>
          <p className="font-semibold">Total Appointments</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p className="font-semibold">Total Revenue</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p className="font-semibold">Accepted Appointments</p>
        </div>
        <div className="border flex flex-col items-center text-blue-500 border-blue-500 rounded-md px-2 py-8 hover:text-white hover:bg-blue-500">
          <h1 className="text-xl">200</h1>
          <p className="font-semibold">Rejected Appointments</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
