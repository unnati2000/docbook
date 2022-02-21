import { useState } from "react";
import { useMutation } from "react-query";
import { ResponsiveCalendar } from "nivo";
import Modal from "react-modal";
import Select from "react-select";
import baseURL from "../utils/baseURL";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const moodCodeArray = [
  {
    happy: 50,
  },
  { sad: 10 },
  { angry: 20 },
  { neutral: 30 },
];

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

const Mood = ({ user }) => {
  const [open, setIsOpen] = useState(false);
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const moods = [
    { label: "Happy 😀", value: "happy" },
    { label: "Sad 🥺", value: "sad" },
    { label: "Angry 😡", value: "angry" },
    { label: "Neutral 🙂", value: "neutral" },
  ];

  const mutation = useMutation(
    async ({ user, mood, moodCode, description }) => {
      console.log({ user, mood, moodCode, description });
      const { data } = await axios.post(
        `${baseURL}/api/moods/`,
        { user, moodType: mood, moodScore: moodCode, description },
        {
          headers: { Authorization: cookie.get("token") },
        }
      );
      return data;
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    let moodCode;
    // loop through moodCode array and get value of mood state
    for (let i = 0; i < moodCodeArray.length; i++) {
      if (moodCodeArray[i][mood]) {
        moodCode = moodCodeArray[i][mood];
      }
    }

    console.log("mood", mood);

    try {
      const data = await mutation.mutateAsync({
        user: user?._id,
        mood,
        moodCode,
        description,
      });
      if (data) {
        setIsOpen(false);
      }

      toast.success(data?.msg);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
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
          <h1 className="text-lg text-blue-500 my-2 font-semibold">
            Hi {user?.name}{" "}
          </h1>

          <Select
            isClearable
            options={moods}
            onChange={(e) => setMood(e.value)}
            placeholder="Select your mood"
            className="md:w-48"
            isSearchable={false}
          />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us why you're in this mood"
            className="bg-gray-100 border outline-none h-32 px-2 border-gray-400 rounded-sm"
          ></textarea>
          <button type="submit" className="bg-blue-500 px-4 py-2 text-white ">
            Submit
          </button>
        </form>
      </Modal>
      <section className="py-4 px-6">
        <h1 className="text-blue-500 text-2xl font-semibold">
          Here's your mood tracker
        </h1>
        <p className="text-gray-500 text-md mt-4">
          This is a simple mood tracker that you can use to keep track of your
          Moods. Keep a track of your moods and see how they change over time.
          Click on the button given below to start the process.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 my-2 px-4 py-2 text-white shadow-md rounded-md"
        >
          Click Here
        </button>
      </section>
      <div className="h-screen">
        <ResponsiveCalendar
          data={[
            {
              value: 41,
              day: "2016-03-15",
            },
            {
              value: 283,
              day: "2015-08-29",
            },
            {
              value: 298,
              day: "2017-07-25",
            },
          ]}
          from="2015-03-01"
          to="2016-07-12"
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Mood;