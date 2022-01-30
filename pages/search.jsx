import axios from 'axios';
import Link from 'next/link';
import { memo } from 'react';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';
import { FaStarHalf } from 'react-icons/fa';
import baseURL from '../utils/baseURL';

const getDoctorsFromSearch = async (location, speciality) => {
  const data = await axios.get(
    `${baseURL}/api/search/${location}/${speciality}`
  );
  return data.data;
};

const Doctors = () => {
  const router = useRouter();
  const { location, speciality } = router.query;

  const { data } = useQuery(['search', location, speciality], () =>
    getDoctorsFromSearch(location, speciality)
  );

  return (
    <div className="text-center my-8">
      <h2 className="text-blue-500 text-xl text-left mx-8">Search Results</h2>
      {data === undefined ? (
        <h1>Loading!!!!</h1>
      ) : (
        data?.map((doc) => (
          <div
            key={doc._id}
            className="border bg-white rounded-md mx-8 my-4 p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex text-left">
                <img
                  src={doc?.user?.profilePic}
                  className="h-16 w-16 rounded-full"
                />
                <div className="ml-2">
                  <Link href={`/doctor/${doc?.user?._id}`}>
                    <h2 className="text-blue-500 text-xl font-semibold">
                      {doc?.user?.name}
                    </h2>
                  </Link>

                  <h4 className="text-gray-500 text-md ">{doc?.speciality}</h4>
                  <p className="text-gray-500 text-md">
                    Initial Fee:{' '}
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
                <Link href={`/doctor/${doc?.user?._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md my-2">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // Get location and speciality from params
  const { location, speciality } = ctx.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['search', location, speciality], () =>
    getDoctorsFromSearch(location, speciality)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default memo(Doctors);
