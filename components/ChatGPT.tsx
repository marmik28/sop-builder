// components/ChatGPT.tsx
import React from "react";
import axios from "axios";

interface ChatGPTProps {
  prompt: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ prompt }) => {
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are a professional SOP writer for Canada visa applications.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 3097,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          }
        );
        setResponse(result.data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [prompt]);

  return (
    <div className="w-full h-screen px-[10px]">
      <div className="w-full h-full border rounded-lg p-2 text-size-tablet" onChange={() => {}}>
        {response}
        </div>
    </div>
  );
};

export default ChatGPT;
