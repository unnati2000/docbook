import axios from 'axios';
import Router from 'next/router';
import catchErrors from './error.utils';
import cookie from 'js-cookie';
import baseURL from './baseURL';

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

    toast.info(res.data.msg);
    Router.push('/');
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
    cookie.set('token', res.data.token, { expires: 730 });

    if (res.data.role === 'doctor') {
      if (res.data.doctor != '' && res.data.doctor.initialFee !== 0) {
        Router.push('/home');
      } else {
        Router.push('/doctor-details');
      }
    } else {
      Router.push('/home');
    }
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const logoutUser = () => {
  cookie.remove('token');
  Router.push('/signin');
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
