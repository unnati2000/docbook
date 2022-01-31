import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Dropdown from "./DropDown.component";
import axios from "axios";
import baseURL from "../../utils/baseURL";

const specialities = [
  "Dentist",
  "Gynecologist",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homoepath",
  "Ayurveda",
  "Cardiologist",
  "Neurologist",
  "Orthopedic",
  "Dietician",
  "Physiotherapist",
];

const DoctorProfileForm = () => {
  const router = useRouter();
  const { token } = router.query;

  const [address, setAddress] = useState({
    streetAdd: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [experience, setExperience] = useState("");

  const [speciality, setSpeciality] = useState(specialities[0]);

  const [image, setImage] = useState(null);

  const [document, setDocument] = useState(null);

  const [proficiences, setProficiencies] = useState([
    "Select your degree",
    "MBBS",
    "BDS",
    "BAMS",
    "BUMS",
    "BHMS",
    "BYNS",
    "MD Anaesthesiology",
    "MD Dermatology",
    "MD Family Medicine",
    "MD General Medicine",
    "MD Physiology",
    "MS ENT",
    "MS General Surgery",
    "MS Ophthalmology",
    "MS Orthopaedics",
    "MS Obstetrics and Gynaecology",
    "MS Dermatology, Venerology and Leprosy",
  ]);

  const { streetAdd, city, state, pincode } = address;

  const [addedproficiencies, setAddedProficiencies] = useState([]);

  const removeProficiency = (value) => {
    setProficiencies((proficiences) => [...proficiences, value]);
    setAddedProficiencies(
      addedproficiencies.filter(
        (addedproficiencies) => addedproficiencies !== value
      )
    );
  };

  const handleAddress = (e) => {
    setAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const mutation = useMutation(async (formdata) => {
    const { data } = await axios.post(
      `${baseURL}/api/onboarding/${token}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("experience", experience);
    formdata.append("speciality", speciality);
    formdata.append("address", JSON.stringify(address));
    formdata.append("document", document);
    formdata.append("proficiencies", JSON.stringify(addedproficiencies));

    try {
      if (
        streetAdd === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        experience === "" ||
        image === null
      ) {
        toast.error("Please enter all the details");
      } else if (addedproficiencies.length === 0) {
        toast.error("Please select your proficiency");
      } else {
        const data = await mutation.mutateAsync(formdata);

        toast.success(data.msg);
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  return (
    <div className="py-16 px-6">
      <form
        onSubmit={onSubmit}
        className="grid md:grid-cols-2 grid-cols-1 space-x-6 "
      >
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="col-span-6">
              <label
                htmlFor="postal-code"
                className="block text-lg my-2 font-medium text-gray-700"
              >
                Clinic Address
              </label>
              <div>
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="streetAdd"
                  value={streetAdd}
                  onChange={handleAddress}
                  id="street-address"
                  autoComplete="street-address"
                  className="mt-1 p-2 block border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                <div className="grid grid-cols-3 gap-3 my-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={handleAddress}
                      id="city"
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={state}
                      onChange={handleAddress}
                      id="state"
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={pincode}
                      onChange={handleAddress}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Degree details */}
            <div className="my-8">
              <label
                htmlFor="postal-code"
                className="block text-lg font-medium text-gray-700"
              >
                Degree Details
              </label>

              <div className="flex flex-wrap  space-x-2 pb-2 mt-4">
                {addedproficiencies?.length > 0 ? (
                  addedproficiencies?.map((added) => (
                    <div
                      key={added}
                      className="border flex my-2 justify-between items-center border-gray-500 rounded-full px-3 py-1 text-gray-500"
                    >
                      {added}
                      <button onClick={() => removeProficiency(added)}>
                        <ImCross className="mx-2 font-sm" />
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 className="text-md  py-2">Please add degree</h1>
                )}
              </div>
              <Dropdown
                proficiences={proficiences}
                setProficiencies={setProficiencies}
                addedproficiencies={addedproficiencies}
                setAddedProficiencies={setAddedProficiencies}
              />
              <div className="mt-4">
                <label
                  htmlFor="postal-code"
                  className="block text-md font-medium text-gray-700"
                >
                  Years of Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-2 p-2 block border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 bg-white sm:p-6 shadow rounded-md">
          <label
            htmlFor="postal-code"
            className="block text-lg my-2 font-medium text-gray-700"
          >
            Select Speciality
          </label>

          <div className="">
            <select
              className="w-full py-2 rounded-md px-4 border border-gray-500 text-gray-500"
              name="speciality"
              value={speciality}
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
            >
              {specialities?.map((specialityAv) => (
                <option key={specialityAv} value={specialityAv}>
                  {specialityAv}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4">
            <h2 className="font-semibold text-xl my-2 text-gray-700">
              Enter the following documents for verification
            </h2>
            <ol className="my-2">
              <li className="text-gray-500">1) Aadhar Card</li>
              <li className="text-gray-500">2) Your respective degree</li>
              <li className="text-gray-500">3) Practice License</li>
            </ol>
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
              className="my-2"
            />
          </div>

          <div className="flex justify-between my-3 items-center">
            <div>
              <h1 className="my-2 text-lg text-gray-700 font-semibold">
                Upload profile pic
              </h1>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://solangvalleyresorts.com/wp-content/uploads/2019/03/gravatar-60-grey.jpg"
              }
              className="h-28 w-28 rounded-full object-cover"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full py-1 my-8 rounded shadow-md text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfileForm;
