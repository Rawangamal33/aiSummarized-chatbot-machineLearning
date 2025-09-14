import { useContext } from "react";
import FileUpload from "../Components/FileUpload";
import Header from "../Components/Header";
import Summary from "../Components/Summary";
import { FileContext } from "../Context/FileProvider";
import Chat from "../Components/Chat";

const Home = () => {
  const { passedFile } = useContext(FileContext);
  return (
    <div className="flex flex-col item-center gap-7 selection:bg-[#C967AA]">
      <Header />
      {passedFile ? (
        <>
          <Summary /> <Chat />
        </>
      ) : (
        <FileUpload />
      )}
    </div>
  );
};

export default Home;
