import { createContext, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
export const MyContext = createContext();

const App = () => {
  const resumeRef = useRef(null);
  const keySkillsRef = useRef(null);
  const employmentRef = useRef(null);
  const educationRef = useRef(null);
  const personalRef = useRef(null); 
  return (
    <MyContext.Provider
      value={{
        resumeRef,
        keySkillsRef,
        employmentRef,  
        educationRef,
        personalRef
      }}
    >
      <Layout />
      <ToastContainer />
    </MyContext.Provider>
  );
};

export default App;
