import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";

const DoctorProfile = ({ doctor }) => {
  return (
    <>
      <div className="flex  space-x-4">
        <img
          src={doctor?.user?.profilePic}
          className="h-16 w-16 rounded-full"
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

            <p className="flex items-center">
              <AiFillStar className="h-4 w-4 text-yellow-500" />
              <AiFillStar className="h-4 w-4 text-yellow-500" />
              <AiFillStar className="h-4 w-4 text-yellow-500" />
              <FaStarHalf />
            </p>
          </div>
        </div>
      </div>

      <p className="pt-8">{doctor?.description}</p>
    </>
  );
};

export default DoctorProfile;
