import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import baseURL from "../utils/baseURL";
import axios from "axios";
import TimingsForm from "../components/doctor-details/TimingsForm.component";

const DoctorDetails = ({ user }) => {
  const router = useRouter();

  const [initialFee, setInitialFee] = useState("");

  const [monday, setMonday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [tuesday, setTuesday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [wednesday, setWednesday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [thursday, setThursday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [friday, setFriday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [saturday, setSaturday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [sunday, setSunday] = useState({
    from: "",
    to: "",
    markAsHoliday: false,
  });

  const [description, setDescription] = useState("");

  const mutation = useMutation(
    async ({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      initialFee,
      description,
    }) => {
      const { data } = await axios.post(
        `${baseURL}/api/doctor`,
        {
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          initialFee,
          description,
        },
        {
          headers: {
            Authorization: cookie.get("token"),
          },
        }
      );
      return data;
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    // sunday
    if (sunday.markAsHoliday === true) {
      setSunday({ ...sunday, from: "", to: "" });
    }

    // monday
    if (monday.markAsHoliday === true) {
      setMonday({ ...monday, from: "", to: "" });
    }

    // tuesday
    if (tuesday.markAsHoliday === true) {
      setTuesday({ ...tuesday, from: "", to: "" });
    }

    // wednesday
    if (wednesday.markAsHoliday === true) {
      setWednesday({ ...wednesday, from: "", to: "" });
    }

    // Thursday
    if (thursday.markAsHoliday === true) {
      setThursday({ ...thursday, from: "", to: "" });
    }

    // Friday
    if (friday.markAsHoliday === true) {
      setFriday({ ...friday, from: "", to: "" });
    }

    // Saturday
    if (saturday.markAsHoliday === true) {
      setSaturday({ ...saturday, from: "", to: "" });
    }
    console.log(sunday, monday, tuesday, wednesday, thursday, friday, saturday);
    const data = await mutation.mutateAsync({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      initialFee,
      description,
    });
    toast.success(data.msg);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form
        className="bg-white px-4 shadow-md w-3/4 rounded-xl px-16 py-12"
        onSubmit={onSubmit}
      >
        <h1 className="text-center text-blue-500 text-2xl font-semibold">
          Please enter the following details
        </h1>
        <div className="flex flex-col">
          <div className="flex justify-between space-x-4">
            <input
              type="text"
              name="intialFee"
              value={initialFee}
              onChange={(e) => setInitialFee(e.target.value)}
              placeholder="Initial Fee"
              className="bg-gray-50 w-full border p-1 mt-6 mb-2 rounded-md border-blue-500"
            />
          </div>

          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-gray-50 w-full border p-1 mt-4 mb-2 rounded-md border-blue-500"
          />

          <div>
            <h2 className="text-blue-500 text-xl mt-4 mb-2">Timings</h2>
          </div>

          <TimingsForm day="Monday" timing={monday} changeTiming={setMonday} />
          <TimingsForm
            day="Tuesday"
            timing={tuesday}
            changeTiming={setTuesday}
          />
          <TimingsForm
            day="Wednesday"
            timing={wednesday}
            changeTiming={setWednesday}
          />
          <TimingsForm
            day="Thursday"
            timing={thursday}
            changeTiming={setThursday}
          />
          <TimingsForm day="Friday" timing={friday} changeTiming={setFriday} />
          <TimingsForm
            day="Saturday"
            timing={saturday}
            changeTiming={setSaturday}
          />
          <TimingsForm day="Sunday" timing={sunday} changeTiming={setSunday} />

          <div className=""></div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md shadow-md py-2 px-6 mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
