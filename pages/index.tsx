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
    const prompt = `${formFields.map((section) => {
      return `${section.title} paragraph;\n\n${section.fields.map((field) => {
          if (formData[field.name]) {
              return `${field.label}: ${formData[field.name]}`;
          }
          return ''; 
      }).filter(Boolean).join(',\n')}`;
  }).join(',\n\n')}\n\nWrite a SOWP SOP in 1600 words, incorporating the above details.`;

    setGeneratedText(prompt);
    setKey((prevKey) => prevKey + 1);

    console.log(prompt);
  };

  const handleNextClick = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrevClick = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-[40px] font-semibold">SOWP Statement Builder</h1>
      </div>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex responsive-container flex-col justify-center items-center">
          <div className="form-container w-full px-10">
            <Form
              onFormSubmit={handleFormSubmit}
              sections={formFields}
              currentSection={currentSection}
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
          </div>
          {generatedText && (
            <div className="chat-container w-full">
              <ChatGPT key={key} prompt={generatedText} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
