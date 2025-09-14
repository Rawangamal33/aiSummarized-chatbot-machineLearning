import FileProvider from "./Context/FileProvider";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <div className="App"></div>
      <div className="stars"></div>

      <div className="AllContent z-100 text-white">
        <FileProvider>
          <Home />
        </FileProvider>
      </div>
    </>
  );
};

export default App;
