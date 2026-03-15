import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PrayerRequest = () => {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !request.trim()) return;
    setLoading(true);

    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        "https://revival-api-rzf5.onrender.com/prayer-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ name, request }),
        },
      );

      const data = await res.json();

      //   if (!res.ok) {
      //     console.log("Error detail:", data.detail);
      //     alert(data.detail || "Failed to submit. Please try again.");
      //     setLoading(false);
      //     return;
      //   }
      if (!res.ok) {
        console.log("FULL ERROR:", data);

        const errorMsg = Array.isArray(data.detail)
          ? data.detail.map((e) => e.msg).join(", ")
          : data.detail || "Failed to submit";

        toast.error(errorMsg);
        setLoading(false);
        return;
      }
      toast.success("Prayer request submitted 🙏");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

      {/* Top banner */}
      <div className="bg-linear-to-b from-[#150f33] to-[#221a50] pt-24 pb-32" />

      {/* Card */}
      <div className="max-w-2xl mx-auto px-6 -mt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-10 sm:p-14"
        >
          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6">
                <HeartHandshake size={28} className="text-green-500" />
              </div>
              <h2 className="font-display text-3xl font-bold text-[#150f33] mb-3">
                We've received your request
              </h2>
              <div className="w-12 h-0.5 bg-[#553fc4]/30 mx-auto mb-5" />
              <p className="font-body text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Our team will be standing in agreement with you in prayer. You
                are not alone — God hears every cry of the heart.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setRequest("");
                  }}
                  className="font-body bg-[#150f33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition w-full sm:w-auto"
                >
                  Submit Another
                </button>
                <Link
                  to="/"
                  className="font-body flex items-center gap-2 text-gray-400 text-sm hover:text-[#150f33] transition"
                >
                  <ArrowLeft size={15} /> Back to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Form state */
            <>
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#150f33]/5 flex items-center justify-center mx-auto mb-6">
                <HeartHandshake size={28} className="text-[#150f33]" />
              </div>

              {/* Label */}
              <p className="font-body text-xs tracking-[0.3em] uppercase text-[#553fc4] mb-3 text-center">
                We're Here For You
              </p>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#150f33] mb-4 text-center">
                Prayer Requests
              </h1>

              {/* Divider */}
              <div className="w-12 h-0.5 bg-[#553fc4]/30 mx-auto mb-6" />

              {/* Message */}
              <p className="font-body text-gray-500 text-sm leading-relaxed mb-8 text-center max-w-md mx-auto">
                Share your prayer request with us. Our team prays over every
                submission. Your request is handled with complete
                confidentiality.
              </p>

              {/* Form */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Joshua Oladeji"
                    className="font-body w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/30 focus:border-[#553fc4] transition"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1.5 block">
                    Prayer Request
                  </label>
                  <textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Share what's on your heart..."
                    rows={5}
                    className="font-body w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/30 focus:border-[#553fc4] transition resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !request.trim() || loading}
                  className="font-body flex items-center justify-center gap-2 bg-[#150f33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition disabled:opacity-40 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={15} /> Submit Request
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <Link
                  to="/"
                  className="font-body flex items-center justify-center gap-2 text-gray-400 text-xs hover:text-[#150f33] transition"
                >
                  <ArrowLeft size={13} /> Back to Home
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
      <footer className="bg-[#150f33] text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} Revival Network Commission · Nigeria · All
        Rights Reserved
      </footer>
    </div>
  );
};

export default PrayerRequest;
