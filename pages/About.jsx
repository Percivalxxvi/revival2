import React from "react";
import Navbar from "../components/Navbar";
import Totop from "../components/Totop";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden flex h-20"></div>
      <header className="bg-[#150f33] text-white py-10 lg:py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Revival Network Commission
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            A Christian ministry based in Nigeria, dedicated to spreading the
            message of revival across the world.
          </p>
        </div>
      </header>

      {/* About the Founder Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src="https://ik.imagekit.io/percival26/WhatsApp%20Image%202025-12-16%20at%206.14.54%20PM.1.jpeg?updatedAt=1765971308553" // replace with your founder image path
              alt="Founder"
              className="rounded-lg shadow-lg w-full object-cover h-110"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4 text-[#150f33]">
              About the Founder
            </h2>
            <p className="text-gray-700 mb-4">
              Pastor Ayodele Oladeji, the visionary behind Revival Network
              Commission, has dedicated his life to spreading the Gospel across
              Nigeria and beyond. With over 20 years of ministry experience, he
              inspires countless individuals to deepen their faith and embrace
              God's love.
            </p>
            {/* <p className="text-gray-700">
              Under his leadership, Grace Ministry has grown into a global
              platform, broadcasting sermons, teachings, and outreach programs
              to a worldwide audience, impacting lives for Christ.
            </p> */}
          </div>
        </div>
      </section>

      <Totop />
      <footer className="bg-[#150f33] text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} Revival Network Commission · Nigeria · All
        Rights Reserved
      </footer>
    </div>
  );
};

export default About;
