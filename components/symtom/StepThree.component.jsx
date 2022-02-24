import { AiOutlineArrowLeft } from "react-icons/ai";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const StepThree = ({
  setStep,
  description,
  setDescription,
  duration,
  name,
  age,
  gender,
  severity,
  symptom,
}) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById("pdf");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${name}.pdf`);
    });
  };

  return (
    <div className="relative flex flex-col justify-center">
      <div>
        <h1 className="text-blue-500 font-semibold text-3xl">Step 3</h1>
        <p className="text-gray-500 my-1">
          You can also add some more description.
        </p>
      </div>

      <textarea
        name="description"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="flex  items-center gap-2 bg-gray-100 border-gray-400 border  px-6 py-2 rounded-md shadow-md "
      ></textarea>
      <div className="flex my-4 gap-4 items-center">
        <p>You can also download a report </p>
        <button
          onClick={downloadPdfDocument}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        >
          Download here
        </button>
      </div>
      <div className="my-4" id="pdf">
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">
            Patient name:{" "}
          </h1>
          <p className="text-gray-500 text-lg">{name}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">Age: </h1>
          <p className="text-gray-500 text-lg">{age}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">Gender: </h1>
          <p className="text-gray-500 text-lg">{gender}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">
            Symptoms noted:{" "}
          </h1>
          <p className="text-gray-500 text-lg">{symptom}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">
            Severity of the symptom:{" "}
          </h1>
          <p className="text-gray-500 text-lg">{severity}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">
            Duration of symptom:{" "}
          </h1>
          <p className="text-gray-500 text-lg">{duration}</p>
        </div>
        <div className="flex  items-center gap-2">
          <h1 className="font-semibold text-lg text-blue-500">Description: </h1>
          <p className="text-gray-500 text-s">{description}</p>
        </div>
      </div>

      <div className="absolute right-0 -bottom-10">
        <div className="flex  gap-8">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 bg-gray-200 text-gray-500 px-6 py-2 rounded-md shadow-md "
          >
            <AiOutlineArrowLeft />
            Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
