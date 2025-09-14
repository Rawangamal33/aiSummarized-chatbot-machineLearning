import { useContext, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { FileContext } from "../Context/FileProvider";
import { ThreeDot } from "react-loading-indicators";

const Chat = () => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCPhrwWnaRkCtX6XAaM3oZ5KIOuL3CnH8M",
  });
  const { passedFile } = useContext(FileContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessages = async () => {
    if (input.length) {
      let updateMessages = [...messages, { role: "user", text: input }];
      setInput("");
      setMessages(updateMessages);
      setIsLoading(true);

      try {
        const contents = [
          {
            text: `Answer this question about the attached document: ${input}.
      Answer as a chatbot with short messages and text only (no markdowns, tags or symbols)
      chat history: ${JSON.stringify(messages)}  `,
          },
          {
            inlineData: {
              mimeType: passedFile.type,
              data: passedFile.file,
            },
          },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
        });

        updateMessages = [
          ...updateMessages,
          { role: "model", text: response?.text },
        ];
        setMessages(updateMessages);
      } catch (err) {
        setMessages([
          ...updateMessages,
          {
            role: "error",
            text: "Something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <section className="flexColSec mb-5">
      <h2 className="md:text-3xl sm:text-2xl text-xl mb-2 mt-4.5">Chat</h2>
      {messages.length > 0 && (
        <div className="chat  lg:w-[950px] md:w-[730px] sm:w-[620px] w-[280px] mb-3 bg-gray-100 rounded-xl px-6 py-3 text-black flex flex-col flex-wrap gap-3.5">
          {messages?.map((msg, i) => {
            if (msg.role === "user") {
              return (
                <div
                  key={i}
                  className="user mt-1.5 text-white bg-blue-500 py-2.5 px-4 mr-6 rounded-2xl"
                >
                  <p>{msg.text}</p>
                </div>
              );
            }

            if (msg.role === "model") {
              return (
                <div className="model" key={i}>
                  <p>{msg.text}</p>
                </div>
              );
            }

            if (msg.role === "error") {
              return (
                <div className="error text-red-600 mt-2.5" key={i}>
                  <p>{msg.text}</p>
                </div>
              );
            }
            return null;
          })}

          {isLoading && (
            <ThreeDot color="#3B82F6" size="small" text="" textColor="" />
          )}
        </div>
      )}
      <div className="inputSec flex items-center gap-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessages();
            }
          }}
          placeholder="Ask any question about the uploaded document."
          className="lg:w-[800px]    md:w-[600px] md:py-3 md:text-lg border sm:placeholder:text-sm placeholder:text-[11px] bg-white text-violet-900 sm:w-[500px] px-4 py-2 rounded-lg outline-0 text-base w-[200px] "
        />
        <button
          onClick={handleSendMessages}
          type="submit"
          className=" lg:px-13 md:py-3 md:px-11 bg-violet-900 text-white flex-center sm:px-9 py-2 rounded-lg cursor-pointer px-3"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Chat;
