import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Dropdown from "./DropDown.component";
import axios from "axios";
import baseURL from "../../utils/baseURL";

const DoctorProfileForm = () => {
  const router = useRouter();
  const { token } = router.query;

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

  const handleDegree = (e) => {
    setDegree((prevState) => ({
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
    formdata.append("degree", JSON.stringify(degree));
    formdata.append("address", JSON.stringify(address));
    formdata.append("document", document);
    formdata.append("proficiencies", JSON.stringify(addedproficiencies));

    try {
      if (
        streetAdd === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        name === "" ||
        to === "" ||
        from === "" ||
        university === ""
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
    <div class="py-16 px-6">
      <form
        onSubmit={onSubmit}
        className="grid md:grid-cols-2 grid-cols-1 space-x-6 "
      >
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="col-span-6">
              <label
                htmlFor="street-address"
                class="block text-sm font-medium text-gray-700"
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
                class="mt-1 p-2 block border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />

              <div class="grid grid-cols-3 gap-3 my-4">
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
            {/* Degree details */}
            <div className="my-8">
              <label
                htmlFor="postal-code"
                className="block text-lg font-medium text-gray-700"
              >
                Degree Details
              </label>

              <div>
                <div className="my-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Degree Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleDegree}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      From
                    </label>
                    <input
                      type="date"
                      name="from"
                      value={from}
                      onChange={handleDegree}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      To
                    </label>
                    <input
                      type="date"
                      name="to"
                      value={to}
                      onChange={handleDegree}
                    />
                  </div>
                </div>
                <div className="my-6">
                  <label
                    htmlFor="postal-code"
                    class="block text-sm font-medium text-gray-700"
                  >
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={university}
                    onChange={handleDegree}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
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
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://solangvalleyresorts.com/wp-content/uploads/2019/03/gravatar-60-grey.jpg"
                  }
                  className="h-28 w-28 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-gray-700 text-center font-semibold text-lg">
            Select your proficiencies
          </h3>

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
          <Dropdown
            proficiences={proficiences}
            setProficiencies={setProficiencies}
            addedproficiencies={addedproficiencies}
            setAddedProficiencies={setAddedProficiencies}
          />

          <div className="my-4">
            <h2 className="font-semibold text-xl my-2 text-gray-700">
              Enter the following documents for verification
            </h2>
            <ol className="my-2">
              <li className="font-semibold text-gray-600">Aadhar Card</li>
              <li className="font-semibold text-gray-600">
                Your respective degree
              </li>
              <li className="font-semibold text-gray-600">Practice License</li>
            </ol>
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
              className="my-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full py-1 rounded shadow-md text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfileForm;
