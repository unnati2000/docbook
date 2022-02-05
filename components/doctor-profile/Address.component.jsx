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
        {/* table using tailwind css */}
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="px-6 py-2">
                <p className="text-blue-500">
                  <span className="font-semibold">Day</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-blue-500">
                  <span className="font-semibold">From</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-blue-500">
                  <span className="font-semibold">To</span>
                </p>
              </td>
            </tr>
            {Object.entries(doctor?.timings).map(([key, value]) => (
              <tr key={key}>
                <td className="px-6 py-2">
                  <p className="text-gray-500">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </td>
                <td className="px-6 py-2">
                  <p className="text-gray-500">
                    {value?.markAsHoliday
                      ? "-"
                      : value?.from.split(":")[0] == 12
                      ? `${value?.from} PM`
                      : value?.from.split(":")[0] > 12
                      ? `${parseInt(value.from.split("0")) - 12}:${
                          value?.from.split(":")[1]
                        } PM`
                      : `${value?.from} AM`}
                  </p>
                </td>
                <td className="px-6 py-2">
                  <p className="text-gray-500">
                    {value?.markAsHoliday
                      ? "-"
                      : value?.to.split(":")[0] == 12
                      ? `${value?.to} PM`
                      : value?.to.split(":")[0] > 12
                      ? `${parseInt(value.to.split("0")) - 12}:${
                          value?.to.split(":")[1]
                        } PM`
                      : `${value?.to} AM`}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Address;
