import { useState } from "react";
import DoctorProfileForm from "../../components/profile-form/DoctorProfileForm.component";
import PatientProfileForm from "../../components/profile-form/PatientProfileForm.component";

const OnBoarding = () => {
  const [user, setUser] = useState("doctor");
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* {user === "patient" ? <PatientProfileForm /> : <DoctorProfileForm />} */}
    </div>
  );
};

export default OnBoarding;
