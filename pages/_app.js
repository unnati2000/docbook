import axios from "axios";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { parseCookies, destroyCookie } from "nookies";

import Head from "../components/Head.component";
import Layout from "../components/Layout.components";
import "tailwindcss/tailwind.css";

import baseURL from "../utils/baseURL";
import { redirectUser } from "../utils/auth.utils";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, user }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout {...pageProps} user={pageProps?.user}>
          <ToastContainer />
          <Head />
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = ctx.pathname === "/dashboard";
  const availableForEveryone =
    ctx.pathname === "/home" ||
    ctx.pathname === "/forgot-password" ||
    ctx.pathname === "/test";

  if (!token) {
    destroyCookie(ctx, "token");
    // Redirect to login if user is trying to access protected routes
    protectedRoutes && redirectUser(ctx, "/signin");
  } else {
    try {
      const res = await axios.get(`${baseURL}/api/auth`, {
        headers: { Authorization: token },
      });

      const { user } = res.data;

      if (user && !availableForEveryone) {
        !protectedRoutes && redirectUser(ctx, "/home");
      }
      pageProps.user = user;
    } catch (err) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/signin");
    }
  }
  return { pageProps };
};

export default MyApp;
