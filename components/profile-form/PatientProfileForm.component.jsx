import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import baseURL from "../../utils/baseURL";
import axios from "axios";

const PatientProfileForm = () => {
  const [address, setAddress] = useState({
    streetAdd: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleAddress = (e) => {
    setAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();
  const { token } = router.query;

  const { streetAdd, city, state, pincode } = address;

  const [image, setImage] = useState(null);

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

    try {
      if (streetAdd === "" || city === "" || state === "" || pincode === "") {
        toast.error("Please enter all the fields");
      } else if (image === null) {
        toast.error("Please add a profile pic");
      } else {
        const formdata = new FormData();
        formdata.append("address", JSON.stringify(address));
        formdata.append("image", image);

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
    <div className="flex justify-center py-16 space-x-6">
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="col-span-6">
                <label
                  for="street-address"
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
                  autocomplete="street-address"
                  className="mt-1 p-2 block border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                <div className="grid grid-cols-3 gap-3 my-4">
                  <div>
                    <label
                      for="city"
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
                      for="state"
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
                      for="postal-code"
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
                      autocomplete="postal-code"
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center my-4">
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

              <button
                type="submit"
                className="bg-blue-600 w-full text-center text-white rounded shadow-md py-1"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileForm;
