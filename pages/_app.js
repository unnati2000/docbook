import axios from "axios";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { HMSRoomProvider, HMSThemeProvider } from "@100mslive/hms-video-react";

import { parseCookies, destroyCookie } from "nookies";

import Layout from "../components/Layout.components";
import "tailwindcss/tailwind.css";

import baseURL from "../utils/baseURL";
import { redirectUser } from "../utils/auth.utils";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, user }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HMSRoomProvider>
      <HMSThemeProvider appBuilder={{ theme: "dark" }}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout {...pageProps} user={pageProps?.user}>
              <ToastContainer />
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </HMSThemeProvider>
    </HMSRoomProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === "/history" ||
    ctx.pathname === "/doctors" ||
    ctx.pathname === "/advanced-search" ||
    ctx.pathname === "/doctor-details" ||
    ctx.pathname === "/charts" ||
    ctx.pathname === "/settings" ||
    ctx.pathname === "/search" ||
    ctx.pathname === "/doctor/[id]" ||
    ctx.pathname === "/dashboard";

  const availableForEveryone =
    ctx.pathname === "/home" ||
    ctx.pathname === "/forgot-password" ||
    ctx.pathname === "/test";

  if (!token) {
    destroyCookie(ctx, "token");

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
