import { XCircleIcon } from "@heroicons/react/solid";
import { MdPayment } from "react-icons/md";

import axios from "axios";
import cookie from "js-cookie";
import baseURL from "../../../utils/baseURL";
import moment from "moment";
import { useQuery } from "react-query";
import { AiOutlineWarning } from "react-icons/ai";

const getAppointments = async () => {
  const data = await axios.get(`${baseURL}/api/appointments/`, {
    headers: {
      Authorization: cookie.get("token"),
    },
  });

  return data.data;
};

const persons = ["1", "2", "34"];

const Appointments = () => {
  const { data } = useQuery(["appointments"], () => getAppointments());

  console.log(data);
  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.length > 0 ? (
          data?.map(
            (person) =>
              (person?.isConfirmed === false ||
                person?.isAccepted === true) && (
                <li
                  key={person?._id}
                  className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="w-full flex justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                          {person?.doctor?.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {person?.doctor?.speciality}
                      </p>

                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {person?.timeSlot?.split(":")[0] === 12
                          ? `${person?.timeSlot} PM`
                          : person?.timeSlot?.split(":")[0] > 12
                          ? `${
                              parseInt(person?.timeSlot?.split(":")[0]) - 12
                            }:${person?.timeSlot?.split(":")[1]} PM`
                          : `${person?.timeSlot} AM`}
                      </p>
                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {" "}
                        {`${person?.date}`}
                      </p>
                    </div>
                    <img
                      className="w-10 h-10 bg-gray-300 object-cover rounded-full flex-shrink-0"
                      src={person?.doctor?.profilePic}
                      alt={person?.doctor?.name}
                    />
                  </div>
                  <div>
                    {person?.isAccepted && (
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex bg-blue-100">
                          <a
                            href={`mailto:`}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                          >
                            <MdPayment
                              className="w-5 h-5 text-blue-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-blue-600">Pay</span>
                          </a>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex bg-red-100">
                          <a
                            href={`tel`}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                          >
                            <XCircleIcon
                              className="w-5 h-5 text-red-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-red-600">Cancel</span>
                          </a>
                        </div>
                      </div>
                    )}
                    {person?.isConfirmed === false && (
                      <div className="-mt-px flex">
                        <div className="w-0 flex-1 flex bg-gray-100">
                          <a
                            href={`mailto:`}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                          >
                            <AiOutlineWarning
                              className="w-5 h-5 text-gray-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-gray-600">
                              Not Confirmed Yet
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )
          )
        ) : (
          <h1 className="text-lg">No appointments currentlt</h1>
        )}
      </ul>
    </div>
  );
};

export default Appointments;
