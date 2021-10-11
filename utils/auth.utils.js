import axios from "axios";
import Router from "next/router";
import catchErrors from "./error.utils";
import cookie from "js-cookie";

import baseURL from "./baseURL";

export const registerUser = async (
  { name, email, password, role },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);

  try {
    const res = await axios.post(`${baseURL}/api/signup`, {
      name,
      email,
      password,
      role,
    });
    console.log(res);
    toast.info(res.data.msg);
    Router.push("/");
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const login = async (
  { email, password },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/auth`, { email, password });
    cookie.set(res.data.token);
    Router.push("/");
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};
