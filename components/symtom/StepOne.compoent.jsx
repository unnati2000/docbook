import Select from "react-select/creatable";
import { AiOutlineArrowRight } from "react-icons/ai";

const StepOne = ({
  setStep,
  name,
  setName,

  setGender,
  age,
  setAge,
}) => {
  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div>
      <div className="flex justify-center flex-col">
        <header>
          <h1 className="text-blue-500 font-semibold text-lg">Hi Name</h1>
          <p className="text-gray-500 py-2">
            Kindly fill the current information for the same. There are 3 steps
            to fill the form. Please make sure you fill all the details.
          </p>
        </header>

        <section className="my-6">
          <input
            type="text"
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-between items-center my-6 gap-4">
            <input
              type="text"
              name="age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              placeholder="Enter Age"
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
            />

            <Select
              isClearable
              options={gender}
              onChange={(e) => setGender(e.value)}
              placeholder="Gender"
              className="md:w-48"
            />
          </div>
        </section>
        <div className="flex justify-end">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md "
          >
            Next <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
