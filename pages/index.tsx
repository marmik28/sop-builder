// pages/index.tsx
import React, { useState } from "react";
import Form from "../components/Form";
import ChatGPT from "../components/ChatGPT";
import formFields from "../components/formFields.json";
import "../app/globals.css";

const Home: React.FC = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [key, setKey] = useState(0);
  const [currentSection] = useState(0);

  const handleFormSubmit = (formData: any) => {

    const prompt = `Write 1200-1600 word SOP incorporating the following details:\n`+ formFields.map(section => section.fields.map(field => `${field.label}: ${formData[field.name]}`).join(",\n"));
  
    setGeneratedText(prompt);
    setKey(prevKey => prevKey + 1);

  };
  

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center"><h1 className="text-[40px] font-semibold">SOP Builder</h1></div>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex responsive-container">
          <div className="form-container w-[500px]">
            <Form
              onFormSubmit={handleFormSubmit}
              sections={formFields}
              currentSection={currentSection}
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
