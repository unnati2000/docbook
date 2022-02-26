import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectIsInPreview,
} from "@100mslive/hms-video-react";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { MdOutlineCancel } from "react-icons/md";
import baseURL from "../utils/baseURL";
import Header from "../components/home/Header.component";
import { toast } from "react-toastify";

const endPoint = "https://prod-in.100ms.live/hmsapi/docbook.app.100ms.live/";

const Home = ({ user }) => {
  const [hmsToken, setHMSToken] = useState("");
  const hmsActions = useHMSActions();
  const isInPreview = useHMSStore(selectIsInPreview);
  const router = useRouter();

  const onSubmit = async (roomId) => {
    const token = await getToken(roomId);

    setHMSToken(token);

    await hmsActions.preview({ authToken: token, userName: user?.name });
  };

  const getToken = async (roomId) => {
    const response = await fetch(`${endPoint}api/token`, {
      method: "POST",
      body: JSON.stringify({
        type: "app",
        room_id: roomId,
        role: "host",
      }),
    });
    const { token } = await response.json();
    return token;
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["appointments", "today"],
    async () => {
      if (user.role === "patient") {
        const { data } = await axios.get(
          `${baseURL}/api/appointments/user/today`,
          {
            headers: {
              Authorization: cookie.get("token"),
            },
          }
        );
        return data;
      } else {
        const { data } = await axios.get(`${baseURL}/api/appointments/today`, {
          headers: {
            Authorization: cookie.get("token"),
          },
        });
        return data;
      }
    }
  );

  const mutation = useMutation(async (id) => {
    const { data } = await axios.put(
      `${baseURL}/api/appointments/over`,
      { id },
      {
        headers: { Authorization: cookie.get("token") },
      }
    );
    return data;
  });

  const cancelAppointment = async (id) => {
    try {
      const data = await mutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  if (isInPreview) {
    router.push("/video?token=" + hmsToken);
  }

  return (
    <div>
      <Header />

      <div className="mx-12 my-8">
        <h2 className="text-blue-600 text-2xl mt-4 mb-6 font-semibold my-2">
          Upcoming Appointments
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error</p>
          ) : isSuccess && data?.length === 0 ? (
            <p className="text-gray-500 text-xl">No appointments today!</p>
          ) : (
            data.map((appointment) => (
              <li
                key={appointment._id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {user.role === "doctor"
                          ? appointment.user.name
                          : appointment.doctor.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.date}
                    </p>

                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.timeSlot}
                    </p>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {appointment.day}
                    </p>
                  </div>
                  <img
                    className="w-10 h-10 object-cover bg-gray-300 rounded-full flex-shrink-0"
                    src={
                      user.role === "doctor"
                        ? appointment.user.profilePic
                        : appointment.doctor.profilePic
                    }
                    alt={
                      user.role === "doctor"
                        ? appointment.user.name
                        : appointment.doctor.name
                    }
                  />
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex ">
                      <button
                        onClick={() => onSubmit(appointment?.roomId)}
                        className="relative bg-blue-100 -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <VideoCameraIcon
                          className="w-5 h-5 text-blue-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-blue-600">Join</span>
                      </button>
                      {user.role === "doctor" && (
                        <button
                          className="relative bg-red-100 -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                          onClick={() => cancelAppointment(appointment?._id)}
                        >
                          {" "}
                          <MdOutlineCancel
                            className="w-5 h-5 text-red-500"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-red-500">Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
