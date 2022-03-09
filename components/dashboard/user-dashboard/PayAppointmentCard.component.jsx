import { XCircleIcon } from "@heroicons/react/solid";
import { MdPayment } from "react-icons/md";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import cookie from "js-cookie";
import baseURL from "../../../utils/baseURL";
import { toast } from "react-toastify";

const PayAppointmentCard = ({ appointment, loadRazorpay }) => {
  const queryClient = useQueryClient();

  async function displayRazorpay() {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_OTRdVb3meRV7GC",
      currency: "INR",
      name: "DocBook",
      description: "Order Payment",
      order_id: `${appointment.paymentDetails.razorpayOrderId}`,
      handler: function(response) {
        mutation.mutate(response);
      },
      prefill: {
        name: "John Doe",
        email: "jdoe@gmail.com",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const mutation = useMutation(
    async (body) => {
      const { data } = await axios.post(
        `${baseURL}/api/payment/${appointment._id}`,
        body,
        {
          headers: {
            Authorization: cookie.get("token"),
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        toast.success("Successfully paid for the appointment");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const deleteMutation = useMutation(
    async () => {
      const {} = await axios.delete(
        `${baseURL}/api/appointments/${appointment._id}`,
        {
          headers: {
            Authorization: cookie.get("token"),
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointments");
        toast.success("Appointment cancelled successfully");
      },
    }
  );

  if (appointment?.isPaid) {
    return null;
  }

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {appointment?.doctor?.name}
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {appointment?.doctor?.speciality}
          </p>

          <p className="mt-1 text-gray-500 text-sm truncate">
            {appointment?.timeSlot?.split(":")[0] === 12
              ? `${appointment?.timeSlot} PM`
              : appointment?.timeSlot?.split(":")[0] > 12
              ? `${parseInt(appointment?.timeSlot?.split(":")[0]) - 12}:${
                  appointment?.timeSlot?.split(":")[1]
                } PM`
              : `${appointment?.timeSlot} AM`}
          </p>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {" "}
            {`${appointment?.date}`}
          </p>
        </div>
        <img
          className="w-10 h-10 bg-gray-300 object-cover rounded-full flex-shrink-0"
          src={appointment?.doctor?.profilePic}
          alt={appointment?.doctor?.name}
        />
      </div>
      <div>
        {appointment?.isAccepted && (
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex bg-blue-100">
              <button
                onClick={displayRazorpay}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <MdPayment
                  className="w-5 h-5 text-blue-600"
                  aria-hidden="true"
                />
                <span className="ml-3 text-blue-600">Pay</span>
              </button>
            </div>
          </div>
        )}
        {!appointment?.isConfirmed && (
          <div className="-mt-px flex">
            <div className="w-0 flex-1 flex bg-red-100">
              <button
                onClick={() => deleteMutation.mutate()}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <XCircleIcon
                  className="w-5 h-5 text-red-600"
                  aria-hidden="true"
                />
                <span className="ml-3 text-red-600">Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default PayAppointmentCard;
