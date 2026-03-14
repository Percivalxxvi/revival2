import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // const [token, setToken] = useState(null);
  // const token = localStorage.getItem("access_token");
  // const [role, setRole] = useState(
  //   localStorage.getItem("user_role") || "users",
  // );
  // const [username, setUsername] = useState(
  //   localStorage.getItem("user_name") || "User",
  // );

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [role, setRole] = useState(localStorage.getItem("user_role") || "user");
  const [username, setUsername] = useState(
    localStorage.getItem("user_name") || "User",
  );

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    // token(null);
    // setRole("user");
    // setUsername("User");
    // localStorage.clear;
    window.location.replace("/login");
  };

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("access_token"));
      setRole(localStorage.getItem("user_role") || "user");
      setUsername(localStorage.getItem("user_name") || "User");
    };

    // Listen for storage changes (works across tabs too)
    window.addEventListener("storage", syncAuth);

    // Also sync on every location change (catches same-tab login/logout)
    syncAuth();

    return () => window.removeEventListener("storage", syncAuth);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const authPages = ["/login", "/register", "/verify-otp", "/admin-login"];
  const hideLinks = authPages.includes(location.pathname);

  return (
    <header className="lg:sticky fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => (window.location.href = "/")}
            className="lg:h-12 h-15 lg:rounded-full rounded-xl cursor-pointer"
            src="https://ik.imagekit.io/percival26/ChatGPT%20Image%20Dec%2017,%202025,%2012_45_59%20PM.png?updatedAt=1765971997238"
            alt=""
          />
          <span className="font-bold text-2xl text-gray-800">
            Revival Network Commission
          </span>
        </div>

        {!hideLinks && (
          <>
            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 text-md font-medium text-gray-500">
              <a
                href="/"
                style={{ color: location.pathname === "/" ? "#150f33" : "" }}
                className="hover:text-[#150f33]"
              >
                Home
              </a>

              <a
                href="/about"
                style={{
                  color: location.pathname === "/about" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                About
              </a>

              <a
                href="/contact"
                style={{
                  color: location.pathname === "/contact" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                Contact
              </a>

              <a
                href="/sermons"
                style={{
                  color: location.pathname === "/sermons" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                Sermons
              </a>

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 hover:text-[#150f33] cursor-pointer"
                >
                  More
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md py-2 w-44 border border-gray-100">
                    {token && (
                      <a
                        href="/gallery"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Gallery
                      </a>
                    )}
                    {token && (
                      <a
                        href="/events"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Events
                      </a>
                    )}

                    {/* <a
                      href="/ministries"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Ministries
                    </a> */}

                    {!token && (
                      <a
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Up
                      </a>
                    )}
                    {!token && (
                      <a
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </a>
                    )}
                    {/* Admin login — only show when not logged in */}
                    {!token && (
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <a
                          href="/admin-login"
                          className="block px-4 py-2 text-xs text-gray-400 hover:bg-gray-100"
                        >
                          Admin
                        </a>
                      </div>
                    )}

                    <div className="border-t border-gray-100 my-1" />
                  </div>
                )}
              </div>

              {token && role === "admin" && (
                <a href="/create-post" className="hover:text-[#150f33]">
                  Create Post
                </a>
              )}

              {/* Avatar Dropdown */}
              {token && (
                <div className="relative" ref={avatarRef}>
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="flex items-center gap-2 hover:text-[#150f33] cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#150f33] text-white flex items-center justify-center text-sm font-semibold">
                      {initials}
                    </div>

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        avatarOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {avatarOpen && (
                    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md py-2 w-48 border border-gray-100 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          {username}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {role}
                        </p>
                      </div>

                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Profile
                      </a>

                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Settings
                      </a>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        {token && (
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                          >
                            Log out
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ul>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-700"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </>
        )}
      </nav>

      {/* Mobile Menu */}
      {!hideLinks && (
        <div
          className={`md:hidden overflow-hidden bg-white border-t transition-all duration-500 ${
            open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-gray-700">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/sermons">Sermons</a>

            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full"
              >
                More <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="flex flex-col ml-4 mt-2 gap-2">
                  {token && <a href="/gallery">Gallery</a>}
                  {token && <a href="/events">Events</a>}
                  {/* <a href="/ministries">Ministries</a> */}
                  {!token && <a href="/signup">Sign Up</a>}
                  {!token && <a href="/login">Login</a>}

                  {!token && (
                    <a href="/admin-login" className="text-gray-400 text-xs">
                      Admin
                    </a>
                  )}
                  <div className="border-t border-gray-100 my-1" />

                  {token && (
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500 font-medium"
                    >
                      Log out
                    </button>
                  )}
                </div>
              )}
            </div>

            {token && role === "admin" && (
              <a href="/create-post">Create Post</a>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
