import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import Address from "../../components/doctor-profile/Address.component";
import DoctorProfile from "../../components/doctor-profile/DoctorProfile.component";
import Review from "../../components/doctor-profile/Review.component";
import Timing from "../../components/doctor-profile/Timing.component";

const getDoctorDetails = async (id) => {
  const { data } = await axios.get(`${baseURL}/api/doctor/${id}`, {
    headers: { Authorization: cookie.get("token") },
  });

  return data;
};

const Doctor = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(["doctors", id], () => getDoctorDetails(id));

  console.log(data);

  return (
    <div className="bg-gray-100">
      <section className="grid my-12 mx-8 grid-cols-3 gap-4">
        <div className="bg-white col-span-2 p-8 rounded-md shadow-sm">
          <DoctorProfile doctor={data} />
        </div>
        <div className="bg-white col-span-1 rounded-md shadow-sm">
          <Timing doctor={data} />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4 my-2 mx-8">
        <div className="col-span-2 p-4 rounded-md shadow-sm bg-white">
          <Address doctor={data} />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-sm">
          <Review doctor={data} />
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["doctors", id], () => getDoctorDetails(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Doctor;
