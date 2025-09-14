import { useContext } from "react";
import { FileContext } from "../Context/FileProvider";

const FileUpload = () => {
  const { handleFileUpload } = useContext(FileContext);

  return (
    <section className="flexColSec md:gap-3 gap-2">
      <h1 className="sm:text-2xl text-xl">Get started</h1>
      <input
        type="file"
        name="file"
        id="file"
        className="md:file:mr-4 sm:file:mr-2 file:mr-2 sm:text-base text-[14px] file:cursor-pointer cursor-pointer file:rounded-full file:border-0  file:px-4 file:py-2 lg:file:text-base sm:file:text-sm file:text-[12px] file:font-semibold  file:bg-violet-600 file:text-violet-100 hover:file:bg-violet-500"
        accept=".pdf, .jpg , .jpeg , .png"
        onChange={handleFileUpload}
      />
    </section>
  );
};

export default FileUpload;
