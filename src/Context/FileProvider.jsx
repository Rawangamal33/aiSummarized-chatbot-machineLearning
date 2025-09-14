import { createContext, useState } from "react";
export const FileContext = createContext();
import { Buffer } from "buffer";

const FileProvider = ({ children }) => {
  const [passedFile, setPassedFile] = useState(null);
  const handleFileUpload = async (e) => {
    const fileUploaded = await e.target.files[0].arrayBuffer();
    const file = {
      type: e.target.files[0].type,
      file: Buffer.from(fileUploaded).toString("base64"),
      imageUrl:
        !e.target.files[0].type.includes("pdf") &&
        URL.createObjectURL(e.target.files[0]),
    };
    setPassedFile(file);
  };

  return (
    <FileContext.Provider
      value={{ handleFileUpload, passedFile, setPassedFile }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
