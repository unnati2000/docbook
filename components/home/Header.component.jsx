import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select/creatable';

const Header = () => {
  const [location, setLocation] = useState('mumbai');
  const [speciality, setSpeciality] = useState('dentist');

  const locations = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Banglore', value: 'banglore' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Kolkata', value: 'kolkata' },
  ];
  const specialities = [
    { label: 'Dentist', value: 'dentist' },
    { label: 'Gynecologist', value: 'gynecologist' },
    { label: 'General Physician', value: 'general physician' },
    { label: 'Dermatologist', value: 'dermatologist' },
    { label: 'Ear-nose-throat (ent)', value: 'ear-nose-throat (ent)' },
    { label: 'Homoepath', value: 'homoepath' },
    { label: 'Ayurveda', value: 'ayurveda' },
  ];

  const router = useRouter();

  return (
    <section className="bg-blue-50 py-12 flex flex-col justify-around items-center">
      <h1 className="text-blue-500 font-semibold text-2xl">
        Welcome to DocBook
      </h1>
      <h2 className="text-gray-600 my-2">Search for the doctors here</h2>
      <div className="flex items-center space-x-2">
        <div>
          <Select
            isClearable
            options={locations}
            onChange={(e) => setLocation(e.value)}
            placeholder="Location"
            formatCreateLabel={(input) => `Search for ${input}`}
            className="md:w-48"
          />
        </div>
        <div>
          <Select
            isClearable
            options={specialities}
            onChange={(e) => setSpeciality(e.value)}
            placeholder="Speciality"
            formatCreateLabel={(input) => `Search for ${input}`}
            className="md:w-48"
          />
        </div>
        <a
          onClick={() =>
            router.push({
              pathname: '/search',
              query: {
                location,
                speciality: encodeURIComponent(speciality),
              },
            })
          }
          className="bg-blue-500 cursor-pointer rounded-md px-4 py-2 text-white"
        >
          Search
        </a>
      </div>
    </section>
  );
};

export default Header;
