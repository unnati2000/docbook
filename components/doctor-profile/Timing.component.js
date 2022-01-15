import { useState } from "react";

const Timing = () => {
  const time = ["11:20", "11:20", "11:20", "11:20", "11:20"];

  return (
    <>
      <div className="flex justify-between p-4 border border-b">
        <h1 className="text-lg text-gray-500">Consultation</h1>
        <h1 className="text-blue-500 text-lg font-semibold">$200</h1>
      </div>

      <div>
        <h1 className="text-blue-500 my-4 font-semibold text-lg text-center">
          Today
        </h1>
        <div className="flex flex-wrap justify-center my-2 space-x-4">
          {time.map((t) => (
            <div className="rounded-md px-2 py-1 border border-gray-400">
              {t}
            </div>
          ))}
        </div>

        <div className="px-4 mt-4">
          <button className="bg-blue-500 w-full rounded-md py-1 text-white shadow-md my-2">
            Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default Timing;
