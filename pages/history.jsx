import UserHistory from "../components/history/UserHistory.component";
import DoctorHistory from "../components/history/DoctorHistory.component";

const History = ({ user }) => {
  if (user.role === "doctor") {
    return <DoctorHistory />;
  } else {
    return <UserHistory />;
  }
};

export default History;
