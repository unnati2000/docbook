import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { logoutUser } from "../utils/auth.utils";

const Navbar = ({ user }) => {
  return (
    <nav className="flex justify-between items-center shadow-md">
      <div className="p-2">
        <img className="h-12 w-12" alt="logo" src="/images/logo.png" />
      </div>
      <div className="flex space-x-4 items-center mx-6">
        <AiFillHome className="text-2xl text-blue-600" />
        <MdDashboard className="text-2xl text-blue-600" />
        <a onClick={logoutUser}>
          <AiOutlineLogout className="text-2xl text-blue-600" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
