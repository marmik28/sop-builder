// pages/index.tsx
import React, { useState } from "react";
import Form from "../components/Form";
import ChatGPT from "../components/ChatGPT";
import formFields from "../components/formFields.json";
import "../app/globals.css";

const Home: React.FC = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [key, setKey] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const handleFormSubmit = (formData: any) => {
    // Get the current section data
    const currentFormFields = formFields[currentSection];

    // Construct the prompt dynamically using formField.prompt and formData
    const prompt = `${
      currentFormFields.sectionPrompt
    }\n${currentFormFields.fields
      .map((field: any) => `${field.label}: ${formData[field.name]}`)
      .join(
        ",\n"
      )},\nEnsure that the language is formal, engaging, and aligned to establish a strong SOP.`;

    // Set the generatedText with the response
    setGeneratedText(prompt);
    setKey((prevKey) => prevKey + 1);
  };

  const handleNextClick = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrevClick = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <h1 className="text-[40px] pl-[32px] font-semibold mb-6">SOP Builder</h1>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg ">
        <div className="flex responsive-container">
          <div className="form-container w-[500px]">
            <Form
              onFormSubmit={handleFormSubmit}
              sections={formFields}
              currentSection={currentSection}
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
              sectionPrompt={formFields[currentSection].sectionPrompt}
            />
          </div>
          <div className="chat-container w-full">
            <ChatGPT key={key} prompt={generatedText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
