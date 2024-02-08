// components/Form.tsx
import React, { useState } from "react";
import "../app/globals.css";
import formFields from "./formFields.json";

interface FormProps {
  onFormSubmit: (formData: any) => void;
}

const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = formFields[0].builder;
  const initialFormData: Record<string, string> = {};

  sections[1].fields.forEach((field: { name: string; }) => {
    initialFormData[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <form className="bg-[#f5f5f5] shadow-md rounded px-8 pt-6 pb-8 mb-4 text-size-tablet">
      <h2 className="text-[26px] font-semibold mt-4 mb-2">
        {sections[currentSection].title}
      </h2>
      {sections[currentSection].fields.map((field) => (
        <div className="mb-4" key={field.name}>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={field.inputType}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}

      <div className="flex justify-center">
        <div className="flex flex-row w-[500px]">
          <button
            className={`bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-4 ${
              currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="button"
            onClick={handlePreviousSection}
            disabled={currentSection === 0}
          >
            Previous
          </button>

          {currentSection !== sections.length - 1 && (
            <button
              className="bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="button"
              onClick={handleNextSection}
            >
              Next
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button
              className="bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="submit"
              onClick={onFormSubmit}
            >
              Generate
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
