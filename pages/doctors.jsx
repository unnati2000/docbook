import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";

const docs = [
  {
    photo:
      "https://media.istockphoto.com/photos/portrait-of-confident-young-medical-doctor-on-blue-background-picture-id1161336374?k=20&m=1161336374&s=612x612&w=0&h=ER2Gs06udn4kBPUy8SwLQR2su0GsRWe0kRHZvDbcQCc=",
    name: "Dr Sharma",
    degree: "MBBS",
    initialFee: 400,
    rating: 4,
    location: "Chennai",
  },
  {
    photo:
      "https://media.istockphoto.com/photos/portrait-of-confident-young-medical-doctor-on-blue-background-picture-id1161336374?k=20&m=1161336374&s=612x612&w=0&h=ER2Gs06udn4kBPUy8SwLQR2su0GsRWe0kRHZvDbcQCc=",
    name: "Dr Sharma",
    degree: "MBBS",
    initialFee: 400,
    rating: 4,
    location: "Chennai",
  },
  {
    photo:
      "https://media.istockphoto.com/photos/portrait-of-confident-young-medical-doctor-on-blue-background-picture-id1161336374?k=20&m=1161336374&s=612x612&w=0&h=ER2Gs06udn4kBPUy8SwLQR2su0GsRWe0kRHZvDbcQCc=",
    name: "Dr Sharma",
    degree: "MBBS",
    initialFee: 400,
    rating: 4,
    location: "Chennai",
  },
  {
    photo:
      "https://media.istockphoto.com/photos/portrait-of-confident-young-medical-doctor-on-blue-background-picture-id1161336374?k=20&m=1161336374&s=612x612&w=0&h=ER2Gs06udn4kBPUy8SwLQR2su0GsRWe0kRHZvDbcQCc=",
    name: "Dr Sharma",
    degree: "MBBS",
    initialFee: 400,
    rating: 4,
    location: "Chennai",
  },

  {
    photo:
      "https://media.istockphoto.com/photos/portrait-of-confident-young-medical-doctor-on-blue-background-picture-id1161336374?k=20&m=1161336374&s=612x612&w=0&h=ER2Gs06udn4kBPUy8SwLQR2su0GsRWe0kRHZvDbcQCc=",
    name: "Dr Sharma",
    degree: "MBBS",
    initialFee: 400,
    rating: 4,
    location: "Chennai",
  },
];

const Doctors = () => {
  return (
    <div className="text-center my-8">
      <h2 className="text-blue-500 text-xl text-left mx-8">Search Results</h2>
      {docs?.map((doc) => (
        <div className="border bg-white rounded-md mx-8 my-4 p-8">
          <div className="flex items-center justify-between">
            <div className="flex text-left">
              <img src={doc?.photo} className="h-16 w-16 rounded-full" />
              <div className="ml-2">
                <h2 className="text-blue-500 text-xl font-semibold">
                  {doc?.name}
                </h2>

                <h4 className="text-gray-500 text-md ">{doc?.degree}</h4>
                <p className="text-gray-500 text-md">
                  Initial Fee:{" "}
                  <span className="text-blue-500"> ₹{doc?.initialFee}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="flex items-center">
                <AiFillStar className="h-4 w-4 text-yellow-500" />
                <AiFillStar className="h-4 w-4 text-yellow-500" />
                <AiFillStar className="h-4 w-4 text-yellow-500" />
                <FaStarHalf />
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md my-2">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
