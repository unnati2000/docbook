import { Fragment } from "react";

import DoctorDashboard from "../components/dashboard/DoctorDashboard.component";
import UserDashboard from "../components/dashboard/UserDashboard.component";

const Dashboard = ({ user }) => {
  return (
    <Fragment>
      {user?.role === "doctor" ? (
        <DoctorDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </Fragment>
  );
};

export default Dashboard;
