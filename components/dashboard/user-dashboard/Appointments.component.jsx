import axios from 'axios';
import cookie from 'js-cookie';
import baseURL from '../../../utils/baseURL';
import { useQuery } from 'react-query';
import PayAppointmentCard from './PayAppointmentCard.component';

const getAppointments = async () => {
  const data = await axios.get(`${baseURL}/api/appointments/`, {
    headers: {
      Authorization: cookie.get('token'),
    },
  });

  return data.data;
};

function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

const Appointments = () => {
  const { data } = useQuery(['appointments'], () => getAppointments());

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.length > 0 ? (
          data?.map(
            (person) =>
              (person?.isConfirmed === false ||
                person?.isAccepted === true) && (
                <PayAppointmentCard
                  appointment={person}
                  loadRazorpay={loadRazorpay}
                  key={person?._id}
                />
              )
          )
        ) : (
          <h1 className="text-lg">No appointments currentlt</h1>
        )}
      </ul>
    </div>
  );
};

export default Appointments;
