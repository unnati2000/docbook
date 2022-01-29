import { useState, useEffect } from "react";
import baseURL from "../../utils/baseURL";
import cookie from "js-cookie";
import axios from "axios";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import Select from "react-select/creatable";

const Header = () => {
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");

  const locations = [
    { label: "Mumbai", value: "mumbai" },
    { label: "Chennai", value: "chennai" },
    { label: "Banglore", value: "banglore" },
    { label: "Hyderabad", value: "hyderabad" },
    { label: "Ahmedabad", value: "ahmedabad" },
    { label: "Delhi", value: "delhi" },
    { label: "Kolkata", value: "kolkata" },
  ];
  const specialities = [
    { label: "Dentist", value: "dentist" },
    { label: "Gynecologist", value: "gynecologist" },
    { label: "General Physician", value: "general physician" },
    { label: "Dermatologist", value: "dermatologist" },
    { label: "Ear-nose-throat (ent)", value: "ear-nose-throat (ent)" },
    { label: "Homoepath", value: "homoepath" },
    { label: "Ayurveda", value: "ayurveda" },
  ];

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
          />
        </div>
        <div>
          <Select
            isClearable
            options={specialities}
            onChange={(e) => setSpeciality(e.value)}
            placeholder="Speciality"
            formatCreateLabel={(input) => `Search for ${input}`}
          />
        </div>

        <div>
          <Link href={`/search?location=${location}&speciality=${speciality}`}>
            <a className="bg-blue-500 rounded-md px-4 py-2 text-white">
              Search
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
