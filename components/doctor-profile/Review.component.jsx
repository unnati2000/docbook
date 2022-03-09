import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";

const Review = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");

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
      height: "540px",
      width: "540px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="text-center px-8 flex flex-col justify-center align-center items-cxenter">
          <h1 className="text-blue-500 py-4 text-2xl font-semibold">
            Add your story for other patients
          </h1>
          <form>
            <input
              type="text"
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
              placeholder="Enter Name"
              name="name"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex items-center gap-2 my-4 border-gray-200 border w-full px-6 py-2 rounded-md shadow-md "
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 py-2 rounded-md w-full text-white shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <div className="flex items-center justify-between">
        <h2 className="text-blue-500 font-semibold text-xl">Reviews</h2>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 flex gap-2 items-center px-4 py-1 text-white rounded-md shadow-md"
        >
          <AiOutlinePlus /> Add
        </button>
      </div>

      <div className="flex my-4">
        <img
          src="https://imagesx.practo.com/providers/d02a7033-1123-49f1-a59d-19c3ba795dd1.jpg?i_type=t_100x100"
          className="h-12 w-12 rounded-full"
        />
        <div className="mx-2">
          <h1 className="text-blue-500 text-lg">name</h1>
          <p className="text-gray-500">nulla, animi veritatis consectetur</p>
          <p className="flex items-center">
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <FaStarHalf />
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
