import { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { AiOutlinePlus } from "react-icons/ai";

const Medication = () => {
  const [open, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "200",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "540px",
      width: "540px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const timeFreq = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const dayFreq = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  return (
    <div>
      <div className="p-8 bg-blue-100">
        <h1 className="text-blue-500 text-2xl font-semibold">
          Your health is our concenrn.
        </h1>
        <p className="text-gray-500">
          Do you have tendency to forgot medicines? Keep track of your medicines
          here
        </p>

        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <button
            className="absolute top-5 right-5 text-lg text-red-500 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>

          <form className="p-8">
            <h1 className="text-blue-600 font-semibold text-xl">
              Add your medicine here!
            </h1>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="postal-code"
              placeholder="Medicine name"
              autoComplete="postal-code"
              className="mt-4 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            />
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              id="postal-code"
              placeholder="Medicine name"
              autoComplete="postal-code"
              className="mt-4 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            />
            <div className="mt-4">
              <Select
                isClearable
                options={timeFreq}
                onChange={(e) => setTime(e.value)}
                placeholder="Select frequency by time"
                //   className="md:w-48"
                isSearchable={false}
              />
            </div>

            <div className="mt-4">
              <Select
                isClearable
                options={dayFreq}
                onChange={(e) => setDay(e.value)}
                placeholder="Select frequency by day"
                //   className="md:w-48"
                isSearchable={false}
              />
              <button className="bg-blue-600 flex gap-2 items-center px-4 text-white shadow-md rounded-md my-4 py-2">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 flex gap-2 items-center px-4 text-white shadow-md rounded-md my-4 py-2"
        >
          <AiOutlinePlus /> Add medicine
        </button>
      </div>
    </div>
  );
};

export default Medication;
