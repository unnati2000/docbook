import { useState } from "react";
import Modal from "react-modal";

const Symptom = ({ user }) => {
  const [open, setIsOpen] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="px-6 py-4">
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <form
            onSubmit={onSubmit}
            className="p-8 h-240 relative flex flex-col justify-center gap-4 w-full"
          >
            <button
              className="absolute top-0 right-0 text-lg text-red-500 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
            <h1 className="text-2xl text-blue-500 my-2 font-semibold">
              Hi {user?.name}{" "}
            </h1>
          </form>
        </Modal>

        <h1 className="text-blue-500 text-2xl font-semibold">
          Symptom Tracker
        </h1>
        <p className="my-2">
          Track your symptoms on regular basis. Be healthy and rock and stay
          fit.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 rounded-md text-white px-6 py-2 shadow-lg"
        >
          Click here
        </button>
      </div>
      <section>
        <div className="container  mx-auto w-full h-full">
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>

            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
              </div>
              <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-blue-500 text-xl">
                  Lorem Ipsum
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
              </div>
              <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-blue-500 text-xl">
                  Lorem Ipsum
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
              </div>
              <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-blue-500 text-xl">
                  Lorem Ipsum
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
            </div>

            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
              </div>
              <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-blue-500 text-xl">
                  Lorem Ipsum
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Symptom;
