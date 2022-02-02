import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import baseURL from "../../utils/baseURL";
import { useMutation } from "react-query";
import cookie from "js-cookie";
import axios from "axios";

const General = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState(user?.profilePic);
  const [file, setFile] = useState(null);

  const router = useRouter();

  const [address, setAddress] = useState({
    streetAdd: user?.address?.streetAdd,
    city: user?.address?.city,
    state: user?.address?.state,
    pincode: user?.address?.pincode,
  });

  const mutation = useMutation(async (formdata) => {
    const { data } = await axios.put(`${baseURL}/api/profile`, formdata, {
      headers: {
        Authorization: cookie.get("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("profilePic", file);
    formData.append("address", JSON.stringify(address));

    try {
      console.log(name, email, address);
      const data = await mutation.mutateAsync(formData);
      toast.success(data?.msg);
      router.push("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Please recheck your inputs");
    }
  };

  return (
    <form className="flex justify-between space-x-4" onSubmit={onSubmit}>
      <div>
        <h1 className="text-xl">User Settings</h1>
        <p className="text-gray-500 my-1">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <div className="my-4 flex flex-col">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
          />
        </div>

        <div className="my-4 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
          />
        </div>

        <div>
          <div className="my-4 flex flex-col">
            <label>Street Address</label>
            <input
              type="text"
              name="streetAdd"
              value={address.streetAdd}
              onChange={(e) =>
                setAddress({ ...address, streetAdd: e.target.value })
              }
              className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-sm px-4 py-2 my-6 shadow-md"
        >
          Update Profile
        </button>
      </div>
      <div className="text-right">
        <img
          className="rounded-full h-48 w-48 mb-2 object-cover"
          src={file ? URL.createObjectURL(file) : image}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
    </form>
  );
};

export default General;
