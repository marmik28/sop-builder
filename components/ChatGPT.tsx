// components/ChatGPT.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

interface ChatGPTProps {
  prompt: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ prompt }) => {
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4-0125-preview",
            messages: [
              {
                role: "system",
                content: `You specialize in writing Statement of Purpose (SOP) for Canada SOWP (Spousal Open Work Permit) applications. Craft a comprehensive and compelling SOP for applicants. The SOP MUST be of 1600 words, and strictly follow this format:\n
                1. Introduction.\n
                2. Relationship Story.\n
                3. Engagement, Marriage and Honeymoon.\n
                4. Willingness to be with spouse.\n
                5. My Work plan.
                6. Strong ties to India.\n
                7. Conclusion`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 4096,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          }
        );
        setResponse(result.data.choices[0].message.content);
        setShowTypingEffect(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prompt]);

  return (
    <div className="w-full h-screen px-[10px]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="response-container">
          {showTypingEffect ? (
            <TypingEffect text={response} />
          ) : (
            <textarea
              className="w-full h-screen border-[3px] rounded-lg p-2 text-size-tablet"
              value={response}
              readOnly
            />
          )}
        </div>
      )}
    </div>
  );
};

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [text, currentIndex]);

  return (
    <div className="w-full h-screen px-[10px]">
    <textarea
      className="w-full h-screen border rounded-lg p-2 text-size-tablet"
      value={typedText}
      readOnly
    />
    </div>
  );
};

export default ChatGPT;
