import { useState } from "react";
import baseURL from "../../utils/baseURL";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");

  const router = useRouter();

  const mutation = useMutation(async ({ password, newPassword }) => {
    console.log(password, newPassword);
    const { data } = await axios.put(
      `${baseURL}/api/profile/update`,
      {
        password,
        newPassword,
      },
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    return data;
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmNewPassword) {
        toast.error("New password and confirm password do not match");
      } else {
        const data = await mutation.mutateAsync({
          password,
          newPassword,
        });
        toast.success(data.msg);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || "There was an error. Try again later."
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-lg">Password Settings</h1>
      <p className="text-gray-500 my-1">
        You will need to enter your current password before you can update your
        password.
      </p>

      <div className="flex flex-col mt-8">
        <label>Current Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setNewConfirmPassword(e.target.value)}
          className="bg-gray-100 border p-1 my-2 rounded-md border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 mt-8 text-white rounded-sm px-4 py-2 shadow-md"
      >
        Change Password
      </button>
    </form>
  );
};

export default Password;
