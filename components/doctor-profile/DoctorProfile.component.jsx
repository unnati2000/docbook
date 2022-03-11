import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import RatingStar from "./RatingStar.component";

const DoctorProfile = ({ doctor }) => {
  return (
    <>
      <div className="flex  space-x-4">
        <img
          src={doctor?.user?.profilePic}
          className="h-16 object-cover w-16 rounded-full"
        />

        <div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl text-blue-600">
              {doctor?.user?.name}
            </h1>
            <div>
              {doctor?.proficiencies?.map((proficiency) => (
                <h3 className="text-sm text-gray-500" key={proficiency}>
                  {proficiency}
                </h3>
              ))}
            </div>

            <p className="py-1">{doctor?.experience} years of Experience</p>

            <RatingStar rating={doctor?.averageRating} />
          </div>
        </div>
      </div>

      <p className="pt-8">{doctor?.description}</p>
    </>
  );
};

export default DoctorProfile;
