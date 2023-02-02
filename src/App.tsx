import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Species from "./pages/Species";
import Individuals from "./pages/Individuals";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { OrganizationContext } from "./contexts/organizationContext";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  const [session, setSession] = useState({
    organization: "",
    token: ""
})
  
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <OrganizationContext.Provider value={{ session, setSession }}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:id" element={<ProjectPage />} />
            <Route path="/especies" element={<Species />} />
            <Route path="/individuals" element={<Individuals />} />
          </Routes>
        </OrganizationContext.Provider>
      </BrowserRouter>
    </>
  );
}

