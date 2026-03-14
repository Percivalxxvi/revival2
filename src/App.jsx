import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Sermons from "../pages/Sermons";
import SermonDetails from "../pages/SermonDetails";
import Gallery from "../pages/Gallery";
import Events from "../pages/Events";
import PrayerRequest from "../pages/Prayers";

import Navbar from "../components/Navbar";

import Signup from "../auth/Signup";
import Login from "../auth/Login";
import AdminLogin from "../auth/AdminLogin";
import VerifyOTP from "../auth/VerifyOTP";

import AdminDashboard from "../admin/AdminDashboard";

// 🔒 Admin Route Protection
const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

// Layout Wrapper (to hide navbar on admin pages)
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/posts/:id" element={<SermonDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/prayers" element={<PrayerRequest />} />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard token={localStorage.getItem("token")} />
              </RequireAdmin>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="h-[70vh] flex items-center justify-center text-6xl font-bold text-gray-500">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import Sermons from "../pages/Sermons";
// import SermonDetails from "../pages/SermonDetails";
// import Navbar from "../components/Navbar";
// import Signup from "../auth/Signup";
// import Login from "../auth/Login";
// import AdminLogin from "../auth/AdminLogin";
// import VerifyOTP from "../auth/VerifyOTP";
// import { i } from "framer-motion/client";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/sermons" element={<Sermons />} />
//         <Route path="/posts/:id" element={<SermonDetails />} />
//         <Route
//           path="/admin"
//           element={<AdminDashboard token={localStorage.getItem("token")} />}
//         />

//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route
//           path="*"
//           element={
//             <div className="h-[70vh] flex items-center justify-center text-6xl font-bold text-gray-500">
//               Page Not Found
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
