// components/Form.tsx
import React, { useState } from "react";
import "../app/globals.css";

interface Field {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface FormSection {
  title: string;
  fields: Field[];
}

interface FormProps {
  onFormSubmit: (formData: any) => void;
  sections: FormSection[];
  currentSection: number;
}

const Form: React.FC<FormProps> = ({
  onFormSubmit,
  sections,
}) => {

  
  const initialFormData: Record<string, string> = {};

  const [formData, setFormData] = useState(initialFormData);
  const [currentSection, setCurrentSection] = useState(0);

  const section = sections[currentSection];

  
  section.fields.forEach((field) => {
    initialFormData[field.name] = "";
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  const handleDotClick = (index: number) => {
    setCurrentSection(index);
  };

  
  const handleNextClick = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrevClick = () => {
    setCurrentSection(currentSection - 1);
  };


  return (
    <div className="max-w-2xl">
      <form className="bg-[#f5f5f5] shadow-md rounded px-8 pt-6 pb-8 mb-4 text-size-tablet">
        <h2 className="text-[26px] font-semibold mt-4 mb-2">{section.title}</h2>
        {section.fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label
              className="block text-gray-700 text-m font-bold mb-1"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        ))}

        <div className="flex flex-col">
          <div className="flex flex-row">
            <button
              className={`bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-4 ${
                currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
              onClick={handlePrevClick}
              disabled={currentSection === 0}
            >
              Previous
            </button>

            <button
              className={`bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ${
                currentSection === sections.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              type="button"
              onClick={handleNextClick}
              disabled={currentSection === sections.length - 1}
            >
              Next
            </button>
          </div>

          <div className="flex justify-center items-center space-x-2 mt-4">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                currentSection === index ? "bg-[#f59723]" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

          {currentSection === sections.length - 1 && (
            <button
              className="bg-[#FFCB70] hover:bg-[#f59723] text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="submit"
              onClick={handleSubmit}
            >
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
