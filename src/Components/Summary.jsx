import { useContext, useEffect, useState } from "react";
import { FileContext } from "../Context/FileProvider";
import { GoogleGenAI } from "@google/genai";
import { FourSquare } from "react-loading-indicators";
import pdfImg from "../assets/pdf-icon-red-and-white-color-for-free-png.webp";

const Summary = () => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCPhrwWnaRkCtX6XAaM3oZ5KIOuL3CnH8M",
  });
  const { passedFile } = useContext(FileContext);
  const [SummerizedData, setSummarizedData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  console.log(passedFile);
  useEffect(() => {
    const getSummary = async () => {
      try {
        const contents = [
          {
            text: `Summarize this document.
            Use just plai text with no markdowns or html tags.
            use line breaks and make the text looks plained and organized.
            `,
          },
          {
            inlineData: {
              mimeType: passedFile.type,
              data: passedFile.file,
            },
          },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: contents,
        });

        setSummarizedData(response?.text);
      } catch (err) {
        setErrMsg("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    getSummary();
  }, [passedFile]);

  return (
    <section className="flexColSec">
      {passedFile?.imageUrl ? (
        <img
          src={passedFile.imageUrl}
          alt="Preview Image"
          className="sm:max-w-[190px] max-w-[100px]  object-cover  mb-3"
        />
      ) : (
        <img
          src={pdfImg}
          alt="PDF Preview"
          className="md:max-w-[100px] max-w-[80px] object-cover  mb-3"
        />
      )}
      <h2 className="md:text-3xl sm:text-2xl text-xl mb-1 mt-3">Summary</h2>
      {isLoading ? (
        <FourSquare color="#5ad0ef" size="medium" text="" textColor="" />
      ) : errMsg ? (
        <p className="text-red-200 text-2xl font-bold">{errMsg}</p>
      ) : (
        <>
          <p className=" lg:mx-25 md:20 sm:mx-15 mx-10 md:text-[20px]   sm:leading-8.5 leading-7 tracking-wide">
            {SummerizedData}
          </p>
        </>
      )}
    </section>
  );
};

export default Summary;
