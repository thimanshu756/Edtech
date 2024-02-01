import "./App.css";
import { Routes , Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import OpenRoute from "./Components/Core/AuthAcesses/OpenRoute";
import PrivateRoute from "./Components/Core/AuthAcesses/PrivateRoute";
import AboutUs from "./Pages/AboutUs";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/signup" element={
        <OpenRoute>
            <SignUp/>
        </OpenRoute>
        }/>

   
        <Route path="/login" element={
          <OpenRoute>
              <Login/>
          </OpenRoute>
    
        }/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>

        <Route path="forgot-password" element={
        <OpenRoute>
        <ForgotPassword/>     
        </OpenRoute>
     }/>
        <Route path="update-password/:id" element={
        <OpenRoute>
        <UpdatePassword/>  
        </OpenRoute>
        }/>
        <Route
       element={
        <PrivateRoute>
               <Dashboard/>   
        </PrivateRoute>
       } 
      >
        <Route path=""/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
