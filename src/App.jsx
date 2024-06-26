import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Settings from "./Components/Core/Dashboard/Settings";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./Components/Core/Dashboard/AddCouse";
import CoursesTable from "./Components/Core/Dashboard/InstructorCourses/CoursesTable";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import EditCourse from "./Components/Core/Dashboard/EditCourse";
import Catalog from "../src/Pages/Catalog"
import CourseDetails from "./Pages/CourseDetails";
import Cart from "./Components/Core/Dashboard/Cart";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/viewCourse/VideoDetails";
import Instructor from "./Components/Core/Dashboard/InstructorDashboard/InstructorDashboard";
import Contact from "./Pages/ContactUs";
import Error from "./Pages/Error";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

        <Route path="/signup" element={
          <OpenRoute>
            <SignUp />
          </OpenRoute>
        } />


        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>

        } />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>  
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/cart" element={<Cart />} />
              </>
            

            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />    
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />  
              <Route path="/dashboard/instructor" element={<Instructor />} />

              </>
       
            )
          }
        </Route>
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </div>
  );
}

export default App;
