import { useState } from "react";
import { ImCross } from "react-icons/im";
import MyDropdown from "./DropDown.component";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DoctorProfileForm = () => {
  const [address, setAddress] = useState({
    streetAdd: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { streetAdd, city, state, pincode } = address;

  const [degree, setDegree] = useState({
    name: "",
    from: "",
    to: "",
    university: "",
  });

  const { name, from, to, university } = degree;

  const [image, setImage] = useState(null);

  const [workingHours, setWorkingHours] = useState({
    monday: {
      to: "",
      from: "",
      holiday: false,
    },
    tuesday: { to: "", from: "", holiday: false },
    wednesday: { to: "", from: "", holiday: false },
    thursday: { to: "", from: "", holiday: false },
    friday: { to: "", from: "", holiday: false },
    saturday: { to: "", from: "", holiday: false },
    sunday: { to: "", from: "", holiday: false },
  });

  const onWorkingHoursChange = (e) => {
    console.log(e);
  };

  const [proficiences, setProficiencies] = useState([
    "MD",
    "Psychologist",
    "MBBS",
    "BDS",
    "Cosmetics",
  ]);

  const [addedproficiencies, setAddedProficiencies] = useState([]);

  const removeProficiency = (value) => {
    console.log(value);
    setProficiencies((proficiences) => [...proficiences, value]);
    setAddedProficiencies(
      addedproficiencies.filter(
        (addedproficiencies) => addedproficiencies !== value
      )
    );
  };

  return (
    <div class="grid grid-cols-3 py-16 space-x-6 px-6">
      <div class="">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="col-span-6">
                <label
                  for="street-address"
                  class="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="streetAdd"
                  value={streetAdd}
                  onChange={(e) => setAddress({ streetAdd: e.target.value })}
                  id="street-address"
                  autocomplete="street-address"
                  class="mt-1 p-2 block border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                <div class="grid grid-cols-3 gap-3 my-4">
                  <div>
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setAddress({ city: e.target.value })}
                      id="city"
                      class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      for="state"
                      class="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={state}
                      onChange={(e) => setAddress({ state: e.target.value })}
                      id="state"
                      class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      for="postal-code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={pincode}
                      onChange={(e) => setAddress({ pincode: e.target.value })}
                      id="postal-code"
                      autocomplete="postal-code"
                      class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              {/* Degree details */}
              <div className="my-8">
                <label
                  for="postal-code"
                  class="block text-lg font-medium text-gray-700"
                >
                  Degree Details
                </label>

                <div>
                  <div className="my-4">
                    <label
                      for="postal-code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Degree Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setDegree({ name: e.target.value })}
                      id="postal-code"
                      autocomplete="postal-code"
                      class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <label
                        for="postal-code"
                        class="block text-sm font-medium text-gray-700"
                      >
                        From
                      </label>
                      <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => setDegree({ from: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        for="postal-code"
                        class="block text-sm font-medium text-gray-700"
                      >
                        To
                      </label>
                      <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={(e) => setDegree({ to: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="my-6">
                    <label
                      for="postal-code"
                      class="block text-sm font-medium text-gray-700"
                    >
                      University
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={university}
                      onChange={(e) =>
                        setDegree({ university: e.target.value })
                      }
                      id="postal-code"
                      autocomplete="postal-code"
                      class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex justify-between my-3 items-center">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <img
                    src="https://solangvalleyresorts.com/wp-content/uploads/2019/03/gravatar-60-grey.jpg"
                    className="h-28 w-28 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              {/* Degree details */}
              <div className="my-4">
                <label
                  for="postal-code"
                  class="block text-lg font-medium text-gray-700"
                >
                  Working Hours
                </label>

                <div className="my-4">
                  {daysOfWeek.map((day) => (
                    <div className="my-2">
                      <label
                        for="postal-code"
                        class="block text-sm font-medium text-gray-700"
                      >
                        {day}
                      </label>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <input
                          type="text"
                          name="from"
                          value={workingHours[day].from}
                          onChange={(e) => onWorkingHoursChange(e)}
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                        />
                        <input
                          type="text"
                          name="to"
                          value={workingHours[day].to}
                          onChange={(e) => onWorkingHoursChange(e)}
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                        />
                        <div>
                          <input
                            type="checkbox"
                            name="holiday"
                            checked={workingHours[day].holiday}
                          />
                          <label>Mark as holiday</label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-gray-700 text-center font-semibold text-lg">
          Select your proficiencies
        </h3>

        {console.log(addedproficiencies)}

        <div className="flex flex-wrap justify-center space-x-2 mx-4 mt-6">
          {addedproficiencies?.length > 0 ? (
            addedproficiencies?.map((added) => (
              <div className="border flex my-2 justify-between items-center border-gray-500 rounded-full px-3 py-1 text-gray-500">
                {added}
                <button onClick={() => removeProficiency(added)}>
                  <ImCross className="mx-2 font-sm" />
                </button>
              </div>
            ))
          ) : (
            <h1>Please add degree</h1>
          )}
        </div>
        <MyDropdown
          proficiences={proficiences}
          setProficiencies={setProficiencies}
          addedproficiencies={addedproficiencies}
          setAddedProficiencies={setAddedProficiencies}
        />
        <button
          type="submit"
          className="bg-blue-600 w-full py-1 rounded shadow-md text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DoctorProfileForm;
