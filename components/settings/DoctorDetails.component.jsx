import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import baseURL from "../../utils/baseURL";
import TimingsForm from "../doctor-details/TimingsForm.component";

const DoctorDetails = ({ user }) => {
  const router = useRouter();

  const [initialFee, setInitialFee] = useState(user?.doctor?.initialFee);

  const [description, setDescription] = useState(user?.doctor?.description);

  const [monday, setMonday] = useState({
    from: user?.doctor?.timings?.monday?.from,
    to: user?.doctor?.timings?.monday?.from,
    markAsHoliday: user?.doctor?.timings?.monday?.markAsHoliday,
  });

  const [tuesday, setTuesday] = useState({
    from: user?.doctor?.timings?.tuesday?.from,
    to: user?.doctor?.timings?.tuesday?.to,
    markAsHoliday: user?.doctor?.timings?.tuesday?.markAsHoliday,
  });

  const [wednesday, setWednesday] = useState({
    from: user?.doctor?.timings?.wednesday?.from,
    to: user?.doctor?.timings?.wednesday?.to,
    markAsHoliday: user?.doctor?.timings?.wednesday?.markAsHoliday,
  });

  const [thursday, setThursday] = useState({
    from: user?.doctor?.timings?.thursday?.from,
    to: user?.doctor?.timings?.thursday?.to,
    markAsHoliday: user?.doctor?.timings?.thursday?.markAsHoliday,
  });

  const [friday, setFriday] = useState({
    from: user?.doctor?.timings?.friday?.from,
    to: user?.doctor?.timings?.friday?.to,
    markAsHoliday: user?.doctor?.timings?.friday?.markAsHoliday,
  });

  const [saturday, setSaturday] = useState({
    from: user?.doctor?.timings?.saturday?.from,
    to: user?.doctor?.timings?.saturday?.to,
    markAsHoliday: false,
  });

  const [sunday, setSunday] = useState({
    from: user?.doctor?.timings?.sunday?.from,
    to: user?.doctor?.timings?.sunday?.to,
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
    } else if (sunday.from.split(":")[0] === "00") {
      sunday.from = `12:${sunday.from.split(":")[1]}}`;
    } else if (sunday.to.split(":")[0] === "00") {
      sunday.to = `12:${sunday.to.split(":")[1]}}`;
    }

    // monday
    if (monday.markAsHoliday === true) {
      setMonday({ ...monday, from: "", to: "" });
    } else if (monday.from.split(":")[0] === "00") {
      monday.from = `12:${monday.from.split(":")[1]}}`;
    } else if (monday.to.split(":")[0] === "00") {
      monday.to = `12:${monday.to.split(":")[1]}}`;
    }

    // tuesday
    if (tuesday.markAsHoliday === true) {
      setTuesday({ ...tuesday, from: "", to: "" });
    } else if (tuesday.from.split(":")[0] === "00") {
      tuesday.from = `12:${tuesday.from.split(":")[1]}}`;
    } else if (tuesday.to.split(":")[0] === "00") {
      tuesday.to = `12:${tuesday.to.split(":")[1]}}`;
    }

    // wednesday
    if (wednesday.markAsHoliday === true) {
      setWednesday({ ...wednesday, from: "", to: "" });
    } else if (wednesday.from.split(":")[0] === "00") {
      wednesday.from = `12:${wednesday.from.split(":")[1]}}`;
    } else if (wednesday.to.split(":")[0] === "00") {
      wednesday.to = `12:${wednesday.to.split(":")[1]}}`;
    }

    // Thursday
    if (thursday.markAsHoliday === true) {
      setThursday({ ...thursday, from: "", to: "" });
    } else if (thursday.from.split(":")[0] === "00") {
      thursday.from = `12:${thursday.from.split(":")[1]}}`;
    } else if (thursday.to.split(":")[0] === "00") {
      thursday.to = `12:${thursday.to.split(":")[1]}}`;
    }

    // Friday
    if (friday.markAsHoliday === true) {
      setFriday({ ...friday, from: "", to: "" });
    } else if (friday.from.split(":")[0] === "00") {
      friday.from = `12:${friday.from.split(":")[1]}}`;
    } else if (friday.to.split(":")[0] === "00") {
      friday.to = `12:${friday.to.split(":")[1]}}`;
    }

    // Saturday
    if (saturday.markAsHoliday === true) {
      setSaturday({ ...saturday, from: "", to: "" });
    } else if (saturday.from.split(":")[0] === "00") {
      saturday.from = `12:${saturday.from.split(":")[1]}}`;
    } else if (saturday.to.split(":")[0] === "00") {
      saturday.to = `12:${saturday.to.split(":")[1]}}`;
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
      description,
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
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md shadow-md py-2 px-4 mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
