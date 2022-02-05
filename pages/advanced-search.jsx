import { useState } from "react";

const AdvancedSearch = () => {
  const [proficiences, setProficiencies] = useState([
    "Select your degree",
    "MBBS",
    "BDS",
    "BAMS",
    "BUMS",
    "BHMS",
    "BYNS",
    "MD Anaesthesiology",
    "MD Dermatology",
    "MD Family Medicine",
    "MD General Medicine",
    "MD Physiology",
    "MS ENT",
    "MS General Surgery",
    "MS Ophthalmology",
    "MS Orthopaedics",
    "MS Obstetrics and Gynaecology",
    "MS Dermatology, Venerology and Leprosy",
  ]);
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-evenly items-center bg-white rounded-xl border shadow-md px-8 py-6 space-x-16 my-8">
        <div>
          <select className="w-full py-2 rounded-md px-4 border border-gray-500 text-gray-500">
            {proficiences?.map((proficience) => (
              <option key={proficience} value={proficience}>
                {proficience}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-blue-500 text-xl">Fee Range</h2>

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <p>300-500</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <p>500-800</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <p>800-1000</p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <p>1000-1200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
