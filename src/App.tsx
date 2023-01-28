import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Species from "./pages/Species";
import Individuals from "./pages/Individuals";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/especies" element={<Species />} />
          <Route path="/individuals" element={<Individuals />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
