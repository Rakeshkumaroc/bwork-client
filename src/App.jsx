import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
export const MyContext = createContext();

const App = () => {
  return (
    <MyContext.Provider>
      <Layout />
      <ToastContainer />
    </MyContext.Provider>
  );
};

export default App;
