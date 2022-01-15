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

    let minutes, hour;

    // sunday
    if (sunday.markAsHoliday === true) {
      setSunday({ ...sunday, from: "", to: "" });
    } else if (sunday.from.split(":")[0] > sunday.to.split(":")[0]) {
      minutes = sunday.to.split(":")[1];
      hour = sunday.to.split(":")[0] + 12;
      setSunday({ ...sunday, to: `${hour}:${minutes}` });
    }

    // monday
    if (monday.markAsHoliday === true) {
      setMonday({ ...monday, from: "", to: "" });
    } else if (monday.from.split(":")[0] > monday.to.split(":")[0]) {
      minutes = monday.to.split(":")[1];
      hour = monday.to.split(":")[0] + 12;
      setMonday({ ...monday, to: `${hour}:${minutes}` });
    }

    // tuesday
    if (tuesday.markAsHoliday === true) {
      setTuesday({ ...tuesday, from: "", to: "" });
    } else if (tuesday.from.split(":")[0] > tuesday.to.split(":")[0]) {
      minutes = tuesday.to.split(":")[1];
      hour = tuesday.to.split(":")[0] + 12;
      setTuesday({ ...tuesday, to: `${hour}:${minutes}` });
    }

    // wednesday
    if (wednesday.markAsHoliday === true) {
      setWednesday({ ...wednesday, from: "", to: "" });
    } else if (wednesday.from.split(":")[0] > wednesday.to.split(":")[0]) {
      minutes = wednesday.to.split(":")[1];
      hour = wednesday.to.split(":")[0] + 12;
      setWednesday({ ...wednesday, to: `${hour}:${minutes}` });
    }

    // Thursday
    if (thursday.markAsHoliday === true) {
      setThursday({ ...thursday, from: "", to: "" });
    } else if (thursday.from.split(":")[0] > thursday.to.split(":")[0]) {
      minutes = thursday.to.split(":")[1];
      hour = thursday.to.split(":")[0] + 12;
      setThursday({ ...thursday, to: `${hour}:${minutes}` });
    }

    // Friday
    if (friday.markAsHoliday === true) {
      setFriday({ ...friday, from: "", to: "" });
    } else if (friday.from.split(":")[0] > friday.to.split(":")[0]) {
      minutes = friday.to.split(":")[1];
      hour = friday.to.split(":")[0] + 12;
      setFriday({ ...friday, to: `${hour}:${minutes}` });
    }

    // Saturday
    if (saturday.markAsHoliday === true) {
      setSaturday({ ...saturday, from: "", to: "" });
    } else if (saturday.from.split(":")[0] > saturday.to.split(":")[0]) {
      minutes = saturday.to.split(":")[1];
      hour = saturday.to.split(":")[0] + 12;
      setSaturday({ ...saturday, to: `${hour}:${minutes}` });
    }

    console.log(sunday, monday, tuesday, wednesday, thursday);
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
