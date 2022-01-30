import { useState, useEffect } from 'react';
import moment from 'moment';
import cookie from 'js-cookie';
import axios from 'axios';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import baseURL from '../../utils/baseURL';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Timing = ({ doctor }) => {
  const [date, setDate] = useState(moment());
  const [timings, setTimings] = useState([]);

  const getAppointments = async (id, date) => {
    const { data } = await axios.get(
      `${baseURL}/api/appointments/${id}?date=${moment(date).format(
        'DD-MM-YYYY'
      )}`,
      {
        headers: { Authorization: cookie.get('token') },
      }
    );

    return data;
  };

  const { data, status } = useQuery(
    ['appointments', doctor?.user?._id, date],
    () => getAppointments(doctor?.user?._id, date),
    {
      enabled: !!doctor?.user?._id,
    }
  );

  // ARRAY OF TIMESLOT AVAILABLE IN DATA
  // const timeslots =

  // setTiming with timeslot available in data
  useEffect(() => {
    setTimings(
      data?.map((appointment) => {
        return appointment.timeSlot;
      })
    );
  }, [data]);

  const weekday = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return (
    <>
      <div className="flex justify-between p-4 border border-b">
        <h1 className="text-lg text-gray-500">Consultation</h1>
        <h1 className="text-blue-500 text-lg font-semibold">$200</h1>
      </div>

      <div>
        <div className="flex justify-evenly items-center">
          <p
            className={
              moment(date).isBefore(moment())
                ? 'invisible pointer-events-none'
                : ''
            }
            onClick={() => setDate(moment(date).subtract(1, 'days'))}
          >
            <IoIosArrowBack className="text-xl text-blue-500 cursor-pointer" />
          </p>
          <h1 className="text-blue-500 my-4 font-semibold text-lg text-center">
            {moment(date).format('DD-MM-YYYY')}
          </h1>

          <p onClick={() => setDate(moment(date).add(1, 'days'))}>
            <IoIosArrowForward className="text-xl text-blue-500 cursor-pointer" />
          </p>
        </div>

        <div className="flex flex-wrap justify-center my-2 gap-4">
          {weekday.map((day, ind) => {
            if (date.isoWeekday() === ind) {
              return doctor?.timeSlots?.[day]?.length > 0 ? (
                doctor?.timeSlots?.[day]?.map(
                  (t) =>
                    timings?.includes(t) === false && (
                      <div
                        key={`${day}-${t}`}
                        className="rounded-md px-2 py-1 border border-gray-400 cursor-pointer"
                      >
                        {t}
                      </div>
                    )
                )
              ) : (
                <h1 key={`${day}`}>No slots available</h1>
              );
            }
          })}
        </div>

        <div className="px-4 mt-4">
          <button className="bg-blue-500 w-full rounded-md py-1 text-white shadow-md my-2">
            Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['appointments', doctor?.user?._id, date],
    () => getAppointments(doctor?.user?._id, moment(date).format('DD-MM-YYYY')),
    {
      enabled: !!doctor?.user?._id,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Timing;

//  //
