import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileAvatarOpen, setMobileAvatarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const avatarRef = useRef(null);
  const mobileAvatarRef = useRef(null);
  const moreRef = useRef(null);
  const location = useLocation();

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
    localStorage.clear();
    setToken(null);
    setRole("user");
    setUsername("User");
    setAvatarOpen(false);
    setMobileAvatarOpen(false);
    window.location.replace("/login");
  };

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("access_token"));
      setRole(localStorage.getItem("user_role") || "user");
      setUsername(localStorage.getItem("user_name") || "User");
    };
    window.addEventListener("storage", syncAuth);
    syncAuth();
    return () => window.removeEventListener("storage", syncAuth);
  }, [location]);

  // Close desktop avatar on outside click
  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile avatar on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        mobileAvatarRef.current &&
        !mobileAvatarRef.current.contains(e.target)
      ) {
        setMobileAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close More dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const authPages = ["/login", "/signup", "/verify-otp", "/admin-login"];
  const mainPages = [
    "/",
    "/about",
    "/contact",
    "/sermons",
    "/prayers",
    "/profile",
    "/settings",
    "/events",
  ];
  const hideLinks = authPages.includes(location.pathname);
  const hideLinks1 = mainPages.includes(location.pathname);

  return (
    <header className="lg:sticky fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => (window.location.href = "/")}
            className="lg:h-12 h-12 lg:rounded-full rounded-xl cursor-pointer"
            src="https://ik.imagekit.io/percival26/ChatGPT%20Image%20Dec%2017,%202025,%2012_45_59%20PM.png?updatedAt=1765971997238"
            alt=""
          />
          <span className="font-bold lg:text-2xl text-xl text-gray-800">
            Revival Network Commission
          </span>
        </div>
        {!hideLinks1 && (
          <Link
            to="/"
            style={{ color: location.pathname === "/" ? "#150f33" : "" }}
            className="hover:text-[#150f33]"
          >
            Home
          </Link>
        )}
        {!hideLinks && (
          <>
            {/* ── DESKTOP MENU ── */}
            <ul className="hidden md:flex items-center gap-8 text-md font-medium text-gray-500">
              <Link
                to="/"
                style={{ color: location.pathname === "/" ? "#150f33" : "" }}
                className="hover:text-[#150f33]"
              >
                Home
              </Link>

              <Link
                to="/about"
                style={{
                  color: location.pathname === "/about" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                About
              </Link>

              <Link
                to="/contact"
                style={{
                  color: location.pathname === "/contact" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                Contact
              </Link>

              <Link
                to="/sermons"
                style={{
                  color: location.pathname === "/sermons" ? "#150f33" : "",
                }}
                className="hover:text-[#150f33]"
              >
                Sermons
              </Link>

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
                    <Link
                      to={token ? "/prayers" : "/login"}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Prayers
                    </Link>

                    <Link
                      to="/gallery"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Gallery
                    </Link>

                    <Link
                      to="/events"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Events
                    </Link>
                    {!token && (
                      <Link
                        to="/signup"
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    )}
                    {!token && (
                      <Link
                        to="/login"
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {token && role === "admin" && (
                <Link to="/create-post" className="hover:text-[#150f33]">
                  Create Post
                </Link>
              )}

              {/* Desktop Avatar Dropdown */}
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
                      className={`transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""}`}
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
                      <Link
                        to="/profile"
                        onClick={() => setAvatarOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setAvatarOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      {role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setAvatarOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ul>

            {/* ── MOBILE RIGHT SIDE ── */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Avatar */}
              {token && (
                <div className="relative" ref={mobileAvatarRef}>
                  <button
                    onClick={() => setMobileAvatarOpen(!mobileAvatarOpen)}
                    className="flex items-center gap-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#150f33] text-white flex items-center justify-center text-xs font-semibold">
                      {initials}
                    </div>
                    <ChevronDown
                      size={13}
                      className={`text-gray-500 transition-transform duration-200 ${mobileAvatarOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobileAvatarOpen && (
                    <div className="absolute right-0 top-11 bg-white shadow-lg rounded-xl py-2 w-48 border border-gray-100 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          {username}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {role}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setMobileAvatarOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setMobileAvatarOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      {role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileAvatarOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger */}
              <button onClick={() => setOpen(!open)} className="text-gray-700">
                {open ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </>
        )}
      </nav>

      {/* ── MOBILE MENU ── */}
      {!hideLinks && (
        <div
          className={`md:hidden overflow-hidden bg-white border-t transition-all duration-500 ${
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-gray-700">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link to="/sermons" onClick={() => setOpen(false)}>
              Sermons
            </Link>
            {/* Mobile */}
            <Link to={token ? "/prayers" : "/login"}>Prayers</Link>
            <a href="/gallery">Gallery</a>
            <a href="/events">Events</a>
            {!token && (
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            )}
            {!token && (
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}

            {/* Mobile More dropdown */}
            {/* <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full"
              >
                More <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="flex flex-col ml-4 mt-2 gap-2">
                  {token && (
                    <Link to="/prayers" onClick={() => setOpen(false)}>
                      Prayers
                    </Link>
                  )}
                  {token && (
                    <Link to="/gallery" onClick={() => setOpen(false)}>
                      Gallery
                    </Link>
                  )}
                  {token && (
                    <Link to="/events" onClick={() => setOpen(false)}>
                      Events
                    </Link>
                  )}
                  {!token && (
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  )}
                  {!token && (
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  )} */}
            {/* {!token && (
                    <Link
                      to="/admin-login"
                      onClick={() => setOpen(false)}
                      className="text-gray-400 text-xs"
                    >
                      Admin
                    </Link>
                  )}
                  {token && (
                    <>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="text-left text-red-500 font-medium"
                      >
                        Log out
                      </button>
                    </>
                  )} */}
            {/* </div>
              )}
            </div> */}

            {token && role === "admin" && (
              <Link to="/create-post" onClick={() => setOpen(false)}>
                Create Post
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
