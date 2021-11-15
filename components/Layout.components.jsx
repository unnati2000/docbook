import Navbar from "./Navbar.component";

const Layout = ({ children, user }) => {
  return (
    <div>
      {user && <Navbar user={user} />}
      {children}
    </div>
  );
};

export default Layout;
