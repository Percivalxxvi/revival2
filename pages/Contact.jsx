import React from "react";
import Navbar from "../components/Navbar";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Totop from "../components/Totop";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden flex h-20"></div>
      {/* Header */}
      <header className="bg-[#150f33] text-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We would love to hear from you. Reach out to us for prayers,
            inquiries, or partnership opportunities.
          </p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-semibold text-[#150f33] mb-6">
            Get in Touch
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-4">
              <Phone className="text-[#150f33]" />
              <span>+234 806 781 7968</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-[#150f33]" />
              <span>revivalnetworkcommission365@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-[#150f33]" />
              <span>Lagos, Nigeria</span>
            </div>

            <div className="flex items-center gap-4">
              <Globe className="text-[#150f33]" />
              <span>Broadcasting to the World</span>
            </div>

            <a href="" className="flex items-center gap-4">
              <BsInstagram className="text-[#150f33] inline-block w-6 h-6" />
              <span>@revivalnetworkcommission</span>
            </a>

            <a href="" className="flex items-center gap-4">
              <BsFacebook className="text-[#150f33] inline-block w-6 h-6" />
              <span>/revivalnetworkcommission</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Send a Message
          </h3>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="10"
                placeholder="Write your message..."
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#150f33] text-white py-3 rounded-md font-medium hover:bg-[#2d2365] transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Totop />
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2025 Revival Network Commission. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
