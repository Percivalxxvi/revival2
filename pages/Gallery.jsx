import React from "react";
import { motion } from "framer-motion";
import { Images, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
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
          {/* Placeholder image grid decoration */}
          <div className="grid grid-cols-3 gap-2 mb-8 max-w-xs mx-auto">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`aspect-square rounded-xl ${
                  i % 3 === 0
                    ? "bg-[#150f33]/10"
                    : i % 3 === 1
                      ? "bg-[#553fc4]/10"
                      : "bg-[#150f33]/5"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#150f33]/5 flex items-center justify-center mx-auto mb-6">
            <Images size={28} className="text-[#150f33]" />
          </div>

          {/* Label */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#553fc4] mb-3">
            Coming Soon
          </p>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#150f33] mb-4">
            Gallery
          </h1>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#553fc4]/30 mx-auto mb-6" />

          {/* Message */}
          <p className="font-body text-gray-500 text-base leading-relaxed mb-10 max-w-md mx-auto">
            We are putting together a collection of photos and memories from our
            services, conferences, and outreach programs. Come back soon.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="font-body bg-[#150f33] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition w-full sm:w-auto"
            >
              Back to Home
            </Link>
            <Link
              to="/sermons"
              className="font-body flex items-center gap-2 text-gray-400 text-sm hover:text-[#150f33] transition"
            >
              <ArrowLeft size={15} /> View Sermons
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

export default Gallery;
