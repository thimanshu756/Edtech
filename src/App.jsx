import "./App.css";
import { Routes , Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="verify-email" element={<VerifyEmail/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
      
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
