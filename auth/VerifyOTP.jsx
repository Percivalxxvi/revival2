import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid access. Please signup again.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Verification failed");
        setLoading(false);
        return;
      }

      alert("Account verified successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#150f33] to-[#221a50] px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-[#150f33]">
          Verify Your Account
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="w-full text-center tracking-widest text-xl py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#553fc4]"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#150f33] text-white py-3 rounded-lg font-medium hover:bg-[#221a50] transition cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
