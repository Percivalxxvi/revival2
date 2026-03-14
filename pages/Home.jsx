import React from "react";
import { motion } from "framer-motion";
import Totop from "../components/Totop";
import { Globe, Phone, HeartHandshake, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "../src/App.css";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const userName = localStorage.getItem("user_name");
  const [showGreeting, setShowGreeting] = useState(false);
  // Show greeting for 60 seconds after login
  useEffect(() => {
    const loginTime = localStorage.getItem("login_time");
    if (!loginTime) return;

    const elapsed = Date.now() - parseInt(loginTime);
    const remaining = 60000 - elapsed; // 60 seconds

    if (remaining > 0) {
      setShowGreeting(true);
      const timer = setTimeout(() => setShowGreeting(false), remaining);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="lg:hidden flex h-20"></div>

      {/* Personalized greeting */}
      {userName && showGreeting && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#150f33] border-b border-white/10 px-6 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p
              className="text-white/70 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Welcome back,{" "}
              <span className="text-white font-semibold">{userName}</span>
            </p>
            <Link
              to="/sermons"
              className="text-[#a58bff] text-xs hover:underline"
            >
              View latest sermons →
            </Link>
          </div>
        </motion.div>
      )}
      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-20 bg-linear-to-b from-[#150f33] to-[#221a50] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Restoring the biblical <br />
              <span className="text-[#553fc4]">ancient landmarks</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="mt-6 text-green-100 max-w-lg"
            >
              Revival Network Commission is a privately owned Christian ministry
              dedicated to raising disciples, transforming lives, and
              broadcasting God’s Word to the world.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-5"
            >
              <Link
                to="/sermons"
                className="bg-white text-[#150f33] px-6 py-3 rounded-full font-medium hover:bg-[#150f33] hover:text-white transition"
              >
                Watch Recorded Sermons
              </Link>

              <Link
                to="/about"
                className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition"
              >
                About the Ministry
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="w-full h-80 rounded-2xl bg-[#150f33] flex items-center justify-center">
              <img
                className="lg:h-4/5 rounded-xl"
                src="https://ik.imagekit.io/percival26/ChatGPT%20Image%20Dec%2017,%202025,%2012_45_59%20PM.png?updatedAt=1765971997238"
                alt="Revival Network Commission banner"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Our Mission
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            • To bring about a Revival in the world
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-gray-600 max-w-2xl mx-auto mb-12"
          >
            • To proclaim the Gospel of Jesus Christ with power, raise kingdom
            ambassadors, and use modern media to reach souls globally.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="lg:flex lg:items-center lg:justify-center grid sm:grid-cols-2 lg:flex-wrap gap-8"
          >
            <Feature
              icon={<BookOpen />}
              title="Sermons"
              text="Read life-transforming messages anytime."
            />
            <Feature
              icon={<Globe />}
              title="Global Outreach"
              text="Reaching nations beyond borders."
            />
            <Feature
              icon={<HeartHandshake />}
              title="Prayer & Support"
              text="Standing with believers in faith."
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CONTACT SECTION ================= */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Connect with us for prayers, counseling, or partnership.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#150f33] text-white px-6 py-3 rounded-full hover:bg-[#2d2365] transition"
          >
            <Phone size={18} />
            Contact the Ministry
          </Link>
        </div>
      </motion.section>

      <Totop />

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#150f33] text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} Revival Network Commission · Nigeria · All
        Rights Reserved
      </footer>
    </div>
  );
};

/* ================= FEATURE CARD WITH ANIMATION ================= */

const Feature = ({ icon, title, text }) => (
  <motion.div
    variants={fadeUp}
    transition={{ duration: 0.6 }}
    className="bg-gray-50 p-6 lg:w-80 rounded-xl shadow-sm hover:shadow-md transition"
  >
    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#150f33] text-white mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{text}</p>
  </motion.div>
);

export default Home;
