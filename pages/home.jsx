import { XCircleIcon, VideoCameraIcon } from "@heroicons/react/solid";

const people = [
  {
    name: "Jane Cooper",
    title: "BDS",
    time: "1:30PM-2:00PM",
    day: "Sun 12/2/2022",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "BDS",
    time: "1:30PM-2:00PM",
    day: "Sun 12/2/2022",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "BDS",
    time: "1:30PM-2:00PM",
    day: "Sun 12/2/2022",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "BDS",
    time: "1:30PM-2:00PM",
    day: "Sun 12/2/2022",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const Home = () => {
  return (
    <div>
      <section className="bg-blue-50 py-12 flex justify-around items-center">
        <div className="flex">
          <input
            type="text"
            placeholder="Location"
            className="p-2 border border-gray-400 rounded-sm"
          />
          <input
            type="text"
            placeholder="Search for doctor/specialist"
            className="border border-gray-400 pl-2 pr-8 rounded-sm"
          />
          <button className="bg-blue-500 px-4 shadow-md text-white rounded-sm">
            Search
          </button>
        </div>
      </section>

      <div className="mx-12 my-8">
        <h2 className="text-blue-600 text-2xl mt-4 mb-6 font-semibold my-2">
          Upcoming Appointments
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li
              key={person.email}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {person.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.title}
                  </p>

                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.time}
                  </p>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.day}
                  </p>
                </div>
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src={person.imageUrl}
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex bg-blue-100">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <VideoCameraIcon
                        className="w-5 h-5 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-blue-600">Join</span>
                    </a>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex bg-red-100">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <XCircleIcon
                        className="w-5 h-5 text-red-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-red-600">Cancel</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
