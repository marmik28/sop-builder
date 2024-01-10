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
  onPrevClick: () => void;
  onNextClick: () => void;
  sectionPrompt: string;
}

const Form: React.FC<FormProps> = ({
  onFormSubmit,
  sections,
  currentSection,
  onPrevClick,
  onNextClick,
}) => {
  const section = sections[currentSection];
  const initialFormData: Record<string, string> = {};

  section.fields.forEach((field) => {
    initialFormData[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormData);

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
          <button
            className="bg-[#FFCB70] hover:bg-[#f59723] text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            Generate {section.title}
          </button>

          <div className="flex flex-row">
            {currentSection > 0 && (
              <button
                className="bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-4"
                type="button"
                onClick={onPrevClick}
              >
                Previous
              </button>
            )}

            {currentSection < sections.length - 1 && (
              <button
                className="bg-[#FFCB70] hover:bg-[#f59723] text-black w-1/2 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                type="button"
                onClick={onNextClick}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
