import { useState } from "react";
import StepOne from "./StepOne.compoent";
import StepThree from "./StepThree.component";
import StepTwo from "./StepTwo.component";

const bodyPart = [
  { label: "Head", value: "head" },
  { label: "Eyes", value: "eyes" },
  { label: "Nose", value: "nose" },
  { label: "Ears", value: "ears" },
  { label: "Chest", value: "chest" },
  { label: "Stomach", value: "stomach" },
  { label: "Back", value: "back" },
  { label: "Neck", value: "neck" },
];

const head = [
  { label: "Headache", value: "headache" },
  { label: "Fatigue", value: "fatigue" },
  {
    label: "LightHeadedness",
    value: "lightHeadedness",
  },
  {
    label: "Hallucination",
    value: "hallucination",
  },
];

const eyes = [
  { label: "Black Eye", value: "black eye" },
  { label: "Blind Spot", value: "blind spot" },
  { label: "Blurry Vision", value: "blurry vision" },
  { label: "Itching", value: "itching" },
  { label: "Watery Eyes", value: "watery eyes" },
  { label: "Red Eyes", value: "red eyes" },
];

const nose = [
  { label: "Blockage in Nose", value: "Blockage in Nose" },
  { label: "Sinus pain", value: "sinus pain" },
  { label: "Sneezy", value: "Sneezy" },
  { label: "Stuffy", value: "stuffy" },
  { label: "Bloody Nose", value: "Bloddy nose" },
  { label: "Nasal Congestion", value: "Nasal Congestion" },
];

const ears = [
  { label: "Ear Pain", value: "Ear Pain" },
  { label: "Ear Discharge", value: "Ear Discharge" },
  { label: "Ear Infection", value: "Ear Infection" },
  { label: "Blockage", value: "Blockage" },
];

const chest = [
  { label: "Chest Pain", value: "Chest Pain" },
  { label: "Heartburn", value: "Heartburn" },
  { label: "Hiccups", value: "Hiccups" },
];

const stomach = [
  { label: "Burping", value: "burping" },

  { label: "Vomiting", value: "vomiting" },
  { label: "Diarrhea", value: "diarrhea" },
  { label: "Constipation", value: "constipation" },
  { label: "Indigestion", value: "Indigestion" },
  { label: "Nausea", value: "nausea" },
  { label: "Abdominal Pain", value: "abdominal pain" },
  { label: "Abdominal Cramps", value: "abdominal cramps" },
];

const back = [
  { label: "Back Ache", value: "backache" },
  { label: "Can't bend", value: "can't bend" },
];

const neck = [
  { label: "Choking", value: "choking" },
  { label: "Cough", value: "cough" },
  { label: "Itchy", value: "itchy" },
  { label: "Sore Throat", value: "Sore Throat" },
];

const severityLevel = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Severe", value: "severe" },
];

const durationOfSymptom = [
  { label: "Few hours", value: "Few hours" },
  { label: "Few days", value: "Few days" },
  { label: "1 week ", value: "1 week" },
  { label: "15 days", value: "15 days" },
  { label: "1 month", value: "1 month" },
  { label: "More", value: "More" },
];

const Symptom = () => {
  const [step, setStep] = useState(1);
  const [part, setPart] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="px-4 py-8">
      {step === 1 && (
        <StepOne
          setStep={setStep}
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
        />
      )}
      {step === 2 && (
        <StepTwo
          bodyPart={bodyPart}
          head={head}
          eyes={eyes}
          nose={nose}
          ears={ears}
          chest={chest}
          stomach={stomach}
          back={back}
          part={part}
          neck={neck}
          severityLevel={severityLevel}
          setPart={setPart}
          setStep={setStep}
          symptom={symptom}
          durationOfSymptom={durationOfSymptom}
          setDuration={setDuration}
          setSymptom={setSymptom}
          severity={severity}
          setSeverity={setSeverity}
        />
      )}
      {step === 3 && (
        <StepThree
          duration={duration}
          setDuration={setDuration}
          description={description}
          setDescription={setDescription}
          setStep={setStep}
          name={name}
          age={age}
          gender={gender}
          severity={severity}
          symptom={symptom}
        />
      )}
    </form>
  );
};

export default Symptom;
