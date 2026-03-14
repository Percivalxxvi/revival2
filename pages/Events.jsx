import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
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
      <div className="max-w-2xl mx-auto px-6 -mt-20  mb-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-10 sm:p-14 text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#150f33]/5 flex items-center justify-center mx-auto mb-6">
            <Calendar size={28} className="text-[#150f33]" />
          </div>

          {/* Label */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#553fc4] mb-3">
            Coming Soon
          </p>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#150f33] mb-4">
            Events
          </h1>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#553fc4]/30 mx-auto mb-6" />

          {/* Message */}
          <p className="font-body text-gray-500 text-base leading-relaxed mb-10 max-w-md mx-auto">
            We are currently planning exciting events and gatherings. Check back
            soon for updates on conferences, prayer nights, and more.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="font-body bg-[#150f33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition w-full sm:w-auto"
            >
              Get Notified
            </Link>
            <Link
              to="/"
              className="font-body flex items-center gap-2 text-gray-400 text-sm hover:text-[#150f33] transition"
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
      <footer className="bg-[#150f33] text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} Revival Network Commission · Nigeria · All
        Rights Reserved
      </footer>
    </div>
  );
};

export default Events;
