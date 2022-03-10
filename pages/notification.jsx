import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import baseURL from "../utils/baseURL";
import cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router";

const Notification = () => {
  const router = useRouter();

  const { data } = useQuery(["notification"], async () => {
    const data = await axios.get(`${baseURL}/api/notifications`, {
      headers: {
        Authorization: cookies.get("token"),
      },
    });

    return data.data;
  });

  useEffect(() => {
    const setNotificationsToRead = async () => {
      try {
        await axios.post(
          `${baseURL}/api/notifications`,
          {},
          { headers: { Authorization: cookies.get("token") } }
        );
      } catch (error) {
        console.log(error);
      }
    };
    setNotificationsToRead();
  }, []);

  return (
    <div className="p-8">
      <header className="">
        <h1 className="text-blue-500 font-semibold text-xl">
          Your Notifications
        </h1>
      </header>
      <ul className="py-4">
        {data?.map((doc) => (
          <li key={doc?._id} className="py-4 cursor-pointer">
            <div className="flex space-x-3">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={doc?.user?.profilePic}
                alt={doc?.user?.name}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-md text-gray-700 hover:text-blue-500 font-medium"
                    onClick={() => router.push(`/doctor/${doc?.user?._id}`)}
                  >
                    {doc?.user?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {moment(doc?.date).format("hh:mm A, Mo MMM YY")}
                  </p>
                </div>

                {doc?.type === "booked" && (
                  <p className="text-sm text-gray-500">
                    {doc?.user?.name} has{" "}
                    <span
                      className="text-blue-500 hover:font-semibold"
                      onClick={() => router.push("/dashboard")}
                    >
                      booked
                    </span>{" "}
                    an appointment with you.
                  </p>
                )}
                {doc?.type === "accepted" && (
                  <p className="text-sm text-gray-500">
                    {doc?.user?.name} has{" "}
                    <span
                      onClick={() => router.push("/dashboard")}
                      className="text-green-600 hover:font-semibold"
                    >
                      accepted
                    </span>{" "}
                    your appointment.
                  </p>
                )}
                {doc?.type === "cancelled" && (
                  <p className="text-sm text-gray-500">
                    {doc?.user?.name} has{" "}
                    <span className="text-red-600 hover:font-semibold">
                      cancelled
                    </span>{" "}
                    your appointment.
                  </p>
                )}
                {doc?.type === "cancelledByPatient" && (
                  <p className="text-sm text-gray-500">
                    {doc?.user?.name} has
                    <span className="text-red-600 hover:font-semibold">
                      cancelled
                    </span>{" "}
                    your appointment.
                  </p>
                )}
                {doc?.type === "rating" && (
                  <p className="text-sm text-gray-500">
                    You just completed an appointment with {doc?.user?.name}.
                    Please rate your experience here.
                    <span
                      className="text-blue-500"
                      onClick={() => router.push(`/doctor/${doc?.doctor}`)}
                    >
                      Click here to add review
                    </span>
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
