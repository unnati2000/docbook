import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import Modal from "react-modal";
import DropDown from "../profile-form/DropDown.component";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";
import cookie from "js-cookie";
import baseURL from "../../utils/baseURL";
import RatingStar from "./RatingStar.component";

const Review = ({ user, doctor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState("");
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

  const [tags, setTags] = useState([
    "Select tags",
    "Friendly",
    "Satisfied",
    "Not Satisfied",
    "Not Helpful",
    "Helpful",
  ]);
  const [addedTags, setAddedTags] = useState([]);

  const removeTags = (value) => {
    setTags((tags) => [...tags, value]);
    setAddedTags(addedTags.filter((addedTags) => addedTags !== value));
  };

  const mutation = useMutation(
    async ({ number, addedTags, description }) => {
      const data = await axios.post(
        `${baseURL}/api/ratings`,
        {
          doctor: doctor?.user?._id,
          name: user?.name,
          profilePic: user?.profilePic,
          doctorProfile: doctor?._id,
          rating: number,
          tags: addedTags,
          description: description,
        },
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
        toast.success("Rating submitted successfully");
        setIsOpen(false);
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(parseFloat(number))) {
      toast.error("Please enter a valid rating");
    } else if (parseFloat(number) < 0 || parseFloat(number) > 5) {
      toast.error("Please enter a rating between 0 and 5");
    } else if (addedTags.length === 0) {
      toast.error("Please select at least one tag");
    } else {
      try {
        const data = await mutation.mutateAsync({
          number,
          addedTags,
          description,
        });
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.msg || "There was an error. Try again later."
        );
      }
    }
  };

  console.log({ doctor });
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="text-center px-8 flex flex-col justify-center align-center items-center">
          <h1 className="text-blue-500 py-4 text-2xl font-semibold">
            Add your story for other patients
          </h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
              placeholder="Enter Rating"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <div className="flex flex-wrap  space-x-2 pb-2 mt-4">
              {addedTags?.length > 0 ? (
                addedTags?.map((added) => (
                  <div
                    key={added}
                    className="border flex my-2 justify-between items-center border-gray-500 rounded-full px-3 py-1 text-gray-500"
                  >
                    {added}
                    <button onClick={() => removeTags(added)}>
                      <ImCross className="mx-2 font-sm" />
                    </button>
                  </div>
                ))
              ) : (
                <h1 className="text-md  py-2">Please add tags</h1>
              )}
            </div>

            <DropDown
              proficiences={tags}
              setProficiencies={setTags}
              addedproficiencies={addedTags}
              setAddedProficiencies={setAddedTags}
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

      {doctor?.ratings?.length > 0 ? (
        doctor?.ratings.map((rating) => (
          <div
            className="flex overflow-auto my-4 border-b border-gray-300"
            key={rating?._id}
          >
            <img
              src={rating?.profilePic}
              className="object-cover h-12 w-12 rounded-full"
            />
            <div className="mx-2">
              <div className="flex items-center justify-between">
                <h1 className="text-blue-500 text-lg">{rating?.name}</h1>
                <RatingStar rating={rating?.rating} />
              </div>

              <p className="text-gray-500">{rating?.description}</p>
              <div className="flex pb-2 items-center gap-2 justify-start my-2">
                {rating?.tags?.map((tag) => (
                  <div
                    className="border-2 text-blue-500 px-2 border-blue-500 rounded-full"
                    key={tag}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No review available</h1>
      )}
    </>
  );
};

export default Review;
