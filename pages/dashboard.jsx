import React, { useState } from "react";
import { BsCalendar2Check } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const DoctorDashboard = () => {
  const [tab, setTab] = useState("Unchecked");
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <aside className="bg-white col-span-3 border-r border-gray-300">
        <div className="flex items-center space-x-4 border-b border-gray-300 pt-8 pl-4 pb-8">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-blue-500 font-semibold text-lg">Doctor Name</h1>
            <p className="text-gray-500 ">Speciality, Speciality</p>
          </div>
        </div>

        <div className="mt-6">
          <div
            onClick={() => setTab("Unchecked")}
            className={
              tab === "Unchecked"
                ? "text-blue-500 bg-blue-100 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
                : "text-gray-500 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
            }
          >
            <BsCalendar2Check />
            <p className="text-gray-500 hover:text-blue-500">
              Unchecked Appointments
            </p>
          </div>
          <div
            onClick={() => setTab("Today")}
            className={
              tab === "Today"
                ? "text-blue-500 bg-blue-100 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
                : "text-gray-500 p-2 cursor-pointer rounded-tr-full rounded-br-full flex items-center space-x-4"
            }
          >
            <MdCalendarToday />
            <p className="text-gray-500 hover:text-blue-500">
              Today's Appointments
            </p>
          </div>
        </div>
      </aside>
      <section className="col-span-6 bg-white border-r border-gray-300">
        <div className="border-b border-gray-300 py-8 px-4">
          <h2 className="text-gray-500 text-xl">Unchecked Appointments</h2>
        </div>

        <div className="border-b border-gray-300">
          <div className="flex space-x-4 p-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h3 className="text-lg text-blue-500">Name</h3>
              <p className="text-gray-500">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem
              </p>
            </div>
          </div>
          <div className="flex space-x-4 pb-4 ml-8">
            <button className="bg-green-100 flex items-center text-green-600 px-8 py-2 rounded-sm">
              <TiTick className="text-lg" />
              Accept
            </button>
            <button className="bg-red-100 flex items-center text-red-600 px-8 py-2 rounded-sm">
              <ImCancelCircle className="text-lg mr-2" /> Reject
            </button>
          </div>
        </div>
      </section>
      <aside className="col-span-3 bg-white">
        <div className="border-b border-gray-300 py-6 px-4">
          <h2 className="text-blue-500 text-xl">Upcoming Appointment</h2>
        </div>

        <div>
          <div className="flex space-x-2 py-4 px-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU"
              className="h-6 w-6 rounded-full"
            />
            <div>
              <h3 className="text-lg text-blue-500">Name</h3>
              <p className="text-gray-500 text-sm">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem
              </p>
              <p className="py-2">Time: 3:45 PM</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DoctorDashboard;
