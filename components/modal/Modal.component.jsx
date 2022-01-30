import { useRouter } from "next/router";
import Modal from "react-modal";
import baseURL from "../../utils/baseURL";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "2",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComponent = ({ open, setOpen, user, doctor, time, date, day }) => {
  const router = useRouter();

  const closeModal = () => {
    setOpen(false);
  };

  const mutation = useMutation(async (appointment) => {
    const { data } = await axios.post(
      `${baseURL}/api/appointments/`,
      appointment,
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    return data;
  });

  const bookAppointment = async () => {
    try {
      if (time === "") {
        toast.error("Please select a time slot");
      } else {
        const appointment = {
          user: user?._id,
          doctor: doctor?.user?._id,
          timeSlot: time,
          date,
          day,
          fee: doctor?.initialFee,
        };

        const data = await mutation.mutateAsync(appointment);

        toast.success(data.msg);

        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <div className="px-4 py-8">
        <h1 className="text-blue-500 font-semibold text-xl">
          Are you sure you want to book an appointment?
        </h1>
        <div className="flex justify-evenly items-center mt-10">
          <button
            onClick={() => bookAppointment()}
            className="bg-blue-500 text-white px-12 py-2 rounded-sm shadow-md"
          >
            Yes
          </button>
          <button
            onClick={() => closeModal()}
            className="bg-gray-200 text-gray-800 px-12 py-2 rounded-sm shadow-md"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
