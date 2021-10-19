import { useState } from "react";
import axios from "axios";

const PatientProfileForm = () => {
  const [address, setAddress] = useState({
    streetAdd: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { streetAdd, city, state, pincode } = address;

  const [image, setImage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div class="flex justify-center py-16 space-x-6">
      <div class="">
        <form onSubmit={onSubmit}>
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
              <div className="flex justify-between items-center my-4">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  src="https://solangvalleyresorts.com/wp-content/uploads/2019/03/gravatar-60-grey.jpg"
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
