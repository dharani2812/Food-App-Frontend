import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import DonatePage from "../Pages/Donate";
import Request from "../Pages/Request";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DonorDashboard from "../Pages/donorDashboard";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/request" element={<Request />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />


    </Routes>
  );
};

export default Approutes;