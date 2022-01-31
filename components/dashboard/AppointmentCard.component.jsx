import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const AppointmentCard = ({ data }) => {
  console.log(data);
  return (
    <>
      {data?.length > 0 ? (
        data?.map((doc) => (
          <div className="border-b border-gray-300">
            <div className="flex space-x-4 p-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h3 className="text-lg text-blue-500">Name</h3>
                <p className="text-gray-500">
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem
                </p>
              </div>
            </div>
            <div className="flex space-x-4 pb-4 ml-8">
              <button className="bg-green-100 flex items-center text-green-600 px-8 py-2 rounded-sm">
                <TiTick className="text-lg" />
                Accept
              </button>
              <button className="bg-red-100 flex items-center text-red-600 px-8 py-2 rounded-sm">
                <ImCancelCircle className="text-lg mr-2" /> Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="p-4 text-xl text-blue-500">No Appointments available</h1>
      )}
    </>
  );
};

export default AppointmentCard;
