import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://revival-api-rzf5.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Account created! Check email for OTP.");

      // Optional: redirect to OTP page
      navigate("/verify-otp", { state: { userId: data.user.id } });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#150f33] to-[#221a50] px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#150f33]">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="relative">
            <Lock className="absolute left-3 top-4 text-gray-400" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#150f33] text-white py-3 rounded-lg font-medium hover:bg-[#221a50] transition cursor-pointer"
          >
            {loading ? "Processing..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#553fc4] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Mail, Lock, User } from "lucide-react";

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     // confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     console.log(form);
//     // 🔥 Connect to backend here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#150f33] to-[#221a50] px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl font-bold text-center mb-6 text-[#150f33]"
//         >
//           Create an Account
//         </motion.h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div className="relative">
//             <User className="absolute left-3 top-4 text-gray-400" size={18} />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               required
//               value={form.name}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               required
//               value={form.email}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={form.password}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
//             />
//           </div>

//           {/* Confirm Password */}
//           {/* <div className="relative">
//             <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               required
//               value={form.confirmPassword}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
//             />
//           </div> */}

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             type="submit"
//             className="w-full bg-[#150f33] text-white py-3 rounded-lg font-medium hover:bg-[#221a50] transition cursor-pointer"
//           >
//             Sign Up
//           </motion.button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-[#553fc4] font-medium hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
