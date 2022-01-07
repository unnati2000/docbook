import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import baseURL from "../../utils/baseURL";
import axios from "axios";

import TimingsForm from "../doctor-details/TimingsForm.component";

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
    }) => {
      const { data } = await axios.post(`${baseURL}/api/doctor`, {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        initialFee,
      });
      return data;
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sunday.markAsHoliday === true) {
      setSunday({ ...sunday, from: "", to: "" });
    }
    if (monday.markAsHoliday === true) {
      setMonday({ ...monday, from: "", to: "" });
    }
    if (tuesday.markAsHoliday === true) {
      setTuesday({ ...tuesday, from: "", to: "" });
    }
    if (wednesday.markAsHoliday === true) {
      setWednesday({ ...wednesday, from: "", to: "" });
    }
    if (thursday.markAsHoliday === true) {
      setThursday({ ...thursday, from: "", to: "" });
    }
    if (friday.markAsHoliday === true) {
      setFriday({ ...friday, from: "", to: "" });
    }
    if (saturday.markAsHoliday === true) {
      setSaturday({ ...saturday, from: "", to: "" });
    }

    const data = await mutation.mutateAsync({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      initialFee,
    });
    toast.success(data.msg);
    router.push("/");
  };

  return (
    <div className="flex items-center">
      <form className="bg-white w-3/4 rounded-xl  py-4" onSubmit={onSubmit}>
        <h1 className=" text-blue-500 text-2xl font-semibold">
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
