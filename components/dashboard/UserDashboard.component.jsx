import { useState } from "react";
import Appointment from "./user-dashboard/Appointments.component";

const tabs = [
  { name: "Unchecked Appointments", current: true },
  { name: "Plans", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("Unchecked Appointments");

  return (
    <div className="relative h-screen flex overflow-hidden bg-white">
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {/* Breadcrumb */}

            <article>
              {/* Profile header */}
              <div>
                <div>
                  <img
                    className="h-32 w-full object-cover lg:h-48"
                    src="https://onco.com/blog/wp-content/uploads/2021/02/Healthy-living-Onco.com_-e1614244286433-1280x720.jpg"
                    alt={user?.name}
                  />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                      <img
                        className="h-24 w-24 object-cover rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        src={user?.profilePic}
                        alt=""
                      />
                    </div>
                    <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                          {user?.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {user?.name}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          onClick={() => setActiveTab(tab.name)}
                          className={classNames(
                            activeTab === tab.name
                              ? "border-b border-blue-500 text-blue-500"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                    <div className="mt-8 pb-16">
                      {activeTab === "Unchecked Appointments" && (
                        <Appointment />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
