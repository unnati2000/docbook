import { useMutation, useQueryClient } from 'react-query';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';
import { ImCancelCircle } from 'react-icons/im';

const AppointmentCard = ({ data, tab }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, status }) => {
      const { data } = await axios.put(
        `${baseURL}/api/appointments/`,
        { id, status },
        {
          headers: { Authorization: cookie.get('token') },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const old = queryClient.getQueryData(['appointments', tab]);
        queryClient.setQueryData(
          ['appointments', tab],
          old.filter(
            (appointment) => appointment._id !== data.updatedAppointment._id
          )
        );
        toast.success('Appointment updated successfully');
      },
    }
  );

  const updateAppointmentStatus = async (id, status) => {
    try {
      const data = await mutation.mutateAsync({ id, status });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || 'There was an error. Try again later.'
      );
    }
  };

  return (
    <>
      {data?.length > 0 ? (
        data?.map((doc) => (
          <div className="border-b border-gray-300" key={doc?._id}>
            <div className="flex space-x-4 p-6">
              <img
                src={doc?.user?.profilePic}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h3 className="text-lg text-blue-500">{doc?.user?.name}</h3>
                <p className="text-gray-500">
                  {doc?.timeSlot} on {doc?.day}, {doc?.date}
                </p>
              </div>
            </div>
            <div
              className={
                doc?.isConfirmed === true
                  ? 'hidden'
                  : 'flex space-x-4 pb-4 ml-8'
              }
            >
              <button
                onClick={() => updateAppointmentStatus(doc?._id, 'confirm')}
                className="bg-green-100 flex items-center text-green-600 px-8 py-2 rounded-sm"
              >
                <TiTick className="text-lg" />
                Accept
              </button>
              <button
                onClick={() => updateAppointmentStatus(doc?._id, 'cancel')}
                className="bg-red-100 flex items-center text-red-600 px-8 py-2 rounded-sm"
              >
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
