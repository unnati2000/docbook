import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar.component";
import Searchbar from "./Searchbar.component";

const routesArray = [
  "/signup",
  "/signin",
  "/",
  "/onboarding/[role]/[token]",
  "/forgot-password",
];

const Layout = ({ user, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { pathname } = useRouter();

  const showNavigation = !routesArray.includes(pathname);

  return (
    <div className=" bg-gray-50 flex overflow-hidden">
      {showNavigation && (
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showNavigation && (
          <Searchbar
            user={user}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
