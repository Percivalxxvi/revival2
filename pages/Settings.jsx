import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  KeyRound,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Settings as SettingsIcon,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const username = localStorage.getItem("user_name") || "User";
  const email = localStorage.getItem("user_email") || "";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const handleChangePassword = async () => {
    setPasswordMsg(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch(
        "https://revival-api-rzf5.onrender.com/auth/change-password",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg({
          type: "success",
          text: "Password changed successfully.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({
          type: "error",
          text: data.detail || "Failed to change password.",
        });
      }
    } catch (err) {
      setPasswordMsg({
        type: "error",
        text: "Something went wrong. Try again.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="lg:hidden flex h-20" />

      <div className="bg-linear-to-b from-[#150f33] to-[#221a50] pt-24 pb-28" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6"
        >
          {/* ── HEADER CARD ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-1.5 bg-linear-to-r from-[#150f33] to-[#553fc4]" />
            <div className="p-6 sm:p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#150f33]/5 flex items-center justify-center">
                  <SettingsIcon size={22} className="text-[#150f33]" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-[#150f33]">
                    Account Settings
                  </h1>
                  <p className="font-body text-xs text-gray-400 mt-0.5">
                    {email}
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                className="font-body flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#150f33] transition"
              >
                <ArrowLeft size={13} /> Profile
              </Link>
            </div>
          </motion.div>

          {/* ── CHANGE PASSWORD CARD ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-1.5 bg-linear-to-r from-[#150f33] to-[#221a50]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <KeyRound size={18} className="text-[#150f33]" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#150f33]">
                    Change Password
                  </h2>
                  <p className="font-body text-xs text-gray-400 mt-0.5">
                    Keep your account secure with a strong password
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Current password */}
                <div>
                  <label className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1.5 block">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="font-body w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/30 focus:border-[#553fc4] transition"
                    />
                    <button
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div>
                  <label className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1.5 block">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="font-body w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/30 focus:border-[#553fc4] transition"
                    />
                    <button
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1.5 block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="font-body w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/30 focus:border-[#553fc4] transition"
                    />
                    <button
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {passwordMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body ${
                        passwordMsg.type === "success"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {passwordMsg.type === "success" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {passwordMsg.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="font-body flex items-center justify-center gap-2 bg-[#150f33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  {passwordLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <footer className="bg-[#150f33] text-white py-6 text-center text-sm font-body">
        © {new Date().getFullYear()} Revival Network Commission · Nigeria · All
        Rights Reserved
      </footer>
    </div>
  );
};

export default Settings;
