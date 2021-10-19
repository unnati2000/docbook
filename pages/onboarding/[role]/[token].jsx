import { useRouter } from "next/router";
import DoctorProfileForm from "../../../components/profile-form/DoctorProfileForm.component";
import PatientProfileForm from "../../../components/profile-form/PatientProfileForm.component";

const OnBoarding = () => {
  const router = useRouter();
  const { role } = router.query;

  return (
    <div className="bg-gray-100 min-h-screen">
      {role === "patient" ? <PatientProfileForm /> : <DoctorProfileForm />}
    </div>
  );
};

export default OnBoarding;
