const weeks = [
  "Monday",
  "Monday",
  "Monday",
  "Monday",
  "Monday",
  "Monday",
  "Monday",
];
const Address = ({ doctor }) => {
  return (
    <div className="grid grid-cols-2 space-x-4 p-4">
      <div>
        <h2 className="text-blue-500 text-lg">Address</h2>
        <p className="text-gray-500">
          {doctor?.user?.address?.streetAdd}, {doctor?.user?.address?.city},{" "}
          {doctor?.user?.address?.state}.
        </p>
        <p className="text-gray-500">{doctor?.user?.address?.pincode}</p>
      </div>

      <div>
        <section className="flex justify-start space-x-6">
          <h2 className="text-blue-500 text-lg">Day of week</h2>
          <h2 className="text-blue-500 text-lg">To</h2>
          <h2 className="text-blue-500 text-lg">From</h2>
        </section>

        {/* {Object.entries(doctor.timings).map(([key, value]) => (
          <section className="flex  justify-start space-x-6">
            <h2 className="text-gray-500 ">{key}</h2>
            <h2>{value.markAsHoliday ? "-" : value?.from}</h2>
            <h2>{value.markAsHoliday ? "-" : value?.to}</h2>
          </section>
        ))} */}

        {console.log(doctor)}
      </div>
    </div>
  );
};

export default Address;
