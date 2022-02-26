import { useState } from "react";
import Modal from "react-modal";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import axios from "axios";
import moment from "moment";
import { parseCookies } from "nookies";
import baseURL from "../utils/baseURL";
import cookie from "js-cookie";
import SymptomTracker from "../components/symtom/SymptomTracker.component";

const getSymptom = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/symptoms/`, {
    headers: { Authorization: token },
  });
  return data;
};

const Symptom = ({ user }) => {
  const [open, setIsOpen] = useState(false);

  const { data } = useQuery(["symptoms"], () =>
    getSymptom(cookie.get("token"))
  );

  console.log(data);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "200",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "540px",
      width: "540px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="px-6 py-4">
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <button
            className="absolute top-5 right-5 text-lg text-red-500 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
          <SymptomTracker user={user} setIsOpen={setIsOpen} />
        </Modal>

        <h1 className="text-blue-500 text-2xl font-semibold">
          Symptom Tracker
        </h1>
        <p className="my-2">
          Track your symptoms on regular basis. Be healthy and rock and stay
          fit.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 rounded-md text-white px-6 py-2 shadow-lg"
        >
          Click here
        </button>
      </div>
      <section>
        <div className="container  mx-auto w-full h-full">
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>

            {data?.symptoms?.slice(0, 4).map((symptom, ind) =>
              ind % 2 === 0 ? (
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">
                      {ind + 1}
                    </h1>
                  </div>
                  <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                    <h3 className="mb-3 font-bold text-blue-500 text-xl">
                      {symptom.symptom}
                    </h3>
                    <p className="leading-snug tracking-wide text-gray-900 text-opacity-100">
                      {symptom.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      {moment(symptom.date).format("MMMM Do YYYY")},{" "}
                      {symptom.time}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto text-white font-semibold text-lg">
                      {ind + 1}
                    </h1>
                  </div>
                  <div className="order-1 bg-white border border-gray-300 rounded-lg shadow-md w-5/12 px-6 py-4">
                    <h3 className="mb-3 font-bold text-blue-500 text-xl">
                      {symptom.symptom}
                    </h3>
                    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                      {symptom.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      {moment(symptom.date).format("MMMM Do YYYY")},{" "}
                      {symptom.time}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["moods"], () =>
    getSymptom(parseCookies(ctx).token)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Symptom;
