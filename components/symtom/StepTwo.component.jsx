import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Select from "react-select/creatable";

const StepTwo = ({
  setStep,
  setPart,
  bodyPart,
  part,
  head,
  eyes,
  nose,
  ears,
  chest,
  stomach,
  back,
  severityLevel,
  symptom,
  setSymptom,
  severity,
  setSeverity,
  setDuration,
  durationOfSymptom,
}) => {
  return (
    <div className="relative">
      <div className="my-4">
        <h1 className="text-blue-500 font-semibold text-3xl">Step 2</h1>
        <p className="text-gray-500 my-2">
          Select the body part first. You can then select the symptom and the
          severity level.
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <Select
          isClearable
          options={bodyPart}
          onChange={(e) => setPart(e.value)}
          placeholder="Select body part"
          className="w-full my-2"
        />
        {part === "head" && (
          <Select
            isClearable
            options={head}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "nose" && (
          <Select
            isClearable
            options={nose}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "ears" && (
          <Select
            isClearable
            options={ears}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "eyes" && (
          <Select
            isClearable
            options={eyes}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "hands" && (
          <Select
            isClearable
            options={hands}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "stomach" && (
          <Select
            isClearable
            options={stomach}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "chest" && (
          <Select
            isClearable
            options={chest}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
        {part === "back" && (
          <Select
            isClearable
            options={back}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}

        {part === "neck" && (
          <Select
            isClearable
            options={neck}
            onChange={(e) => setSymptom(e.value)}
            placeholder={`Symptoms of ${part}`}
            className="w-full my-2"
          />
        )}
      </div>
      {part !== "" && (
        <Select
          isClearable
          options={severityLevel}
          onChange={(e) => setSeverity(e.value)}
          placeholder={`Severity level`}
          className="w-full my-2"
        />
      )}

      {part !== "" && (
        <Select
          isClearable
          options={durationOfSymptom}
          onChange={(e) => setDuration(e.value)}
          placeholder={`Duration`}
          className="w-full"
        />
      )}
      <div className="absolute -bottom-20 right-0">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 bg-gray-200 text-gray-500 px-6 py-2 rounded-md shadow-md "
          >
            Back <AiOutlineArrowLeft />
          </button>
          <button
            onClick={() => setStep(3)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md "
          >
            Next <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
