import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import { createContext, useState } from "react";
export const GlobalContext =createContext()
const App = () => {
  const [ createAccountPopUp, setCreateAccountPopUp ] = useState(false);

  return (
    <GlobalContext.Provider value={{createAccountPopUp, setCreateAccountPopUp}}>
      <Layout />
      <ToastContainer />
    </GlobalContext.Provider>
  );
};

export default App;
