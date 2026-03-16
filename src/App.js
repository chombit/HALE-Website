import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs";
import Programs from "./pages/Programs";
// import ContactUs from "./pages/ContactUs";
import Events from "./pages/Events";
import OpenEvent from "./pages/OpenEvent";
import { useContext } from "react";
import { GeneralContext } from "./hooks/GeneralContext";
import OurTeam from "./pages/OurTeam";
import OpenTeam from "./pages/OpenTeam";
import Resources from "./pages/Resources";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/NewContactUs";

export default function App() {
  const {navOpen} = useContext(GeneralContext)
  return (
    <main style={{overflowY:`${navOpen?"hidden":""}`}}> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<AboutUs />} path="/aboutus" />
          <Route element={<Programs />} path="/programs" />
          {/* <Route element={<ContactUs />} path="/contact" /> */}
          <Route element={<Contact />} path="/contact" />
          <Route element={<Events />} path="/events" />
          <Route element={<OpenEvent />} path="/events/:index" />
          <Route element={<OurTeam/>} path="/team" />
          <Route element={<OpenTeam/>} path="/team/:index" />
          <Route element={<Resources/>} path="/resources" />
          <Route element={<PageNotFound/>} path="/*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
