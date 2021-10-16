import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function ({
  proficiences,
  setProficiencies,
  addedproficiencies,
  setAddedProficiencies,
}) {
  const [currentDegree, setCurrentDegree] = useState(proficiences[0]);

  const onChangeCurrentDegree = (e) => {
    setCurrentDegree(e.target.value);
    setAddedProficiencies((addedproficiencies) => [
      ...addedproficiencies,
      e.target.value,
    ]);

    setProficiencies(
      proficiences.filter((proficience) => proficience !== e.target.value)
    );
  };

  console.log(currentDegree);

  console.log(proficiences);

  console.log(addedproficiencies);

  return (
    <div className="flex items-center justify-center w-full p-12">
      <div className="relative inline-block text-left w-full">
        <select
          onChange={onChangeCurrentDegree}
          value={currentDegree}
          className="w-full py-2 rounded-md px-4 border border-gray-500 text-gray-500"
        >
          {proficiences?.map((proficience) => (
            <option value={proficience}>{proficience}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
