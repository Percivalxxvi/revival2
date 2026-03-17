import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Shield,
  HeartHandshake,
  ChevronDown,
  Calendar,
  Settings,
  BookMarked,
  BookOpen,
  CalendarDays,
  Trash,
  Trash2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://revival-api-rzf5.onrender.com";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const username = localStorage.getItem("user_name") || "User";
  const email = localStorage.getItem("user_email") || "";
  const role = localStorage.getItem("user_role") || "user";

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // User profile (join date)
  const [userProfile, setUserProfile] = useState(null);

  // Prayer requests
  const [prayers, setPrayers] = useState([]);
  const [prayersLoading, setPrayersLoading] = useState(true);
  const [expandedPrayer, setExpandedPrayer] = useState(null);

  // Favourites
  const [favourites, setFavourites] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState(true);

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  // Fetch user profile for join date
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUserProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchProfile();
  }, []);

  // Fetch prayer requests
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/prayer-requests/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setPrayers(data.prayer_requests ?? data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setPrayersLoading(false);
      }
    };
    if (token) fetchPrayers();
  }, []);

  // Fetch favourites
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch(`${BASE_URL}/favourites/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setFavourites(data.favourites ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setFavouritesLoading(false);
      }
    };
    if (token) fetchFavourites();
  }, []);

  const removeFavourite = async (postId) => {
    try {
      await fetch(`${BASE_URL}/posts/${postId}/favourite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavourites((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* <div className="lg:hidden flex h-20" /> */}
      <div className="bg-linear-to-b from-[#150f33] to-[#221a50] pt-24 pb-28" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6"
        >
          {/* ── USER INFO CARD ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-1.5" />

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-[#150f33] text-white flex items-center justify-center text-2xl font-bold font-display shadow-lg">
                  {initials}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h1 className="font-display text-3xl font-bold text-[#150f33]">
                    {username}
                  </h1>
                  <span
                    className={`font-body text-xs px-3 py-1 rounded-full font-semibold self-center ${
                      role === "admin"
                        ? "bg-[#150f33] text-white"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {role}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-3">
                  {email && (
                    <div className="flex items-center gap-2 text-gray-400 justify-center sm:justify-start">
                      <Mail size={14} />
                      <span className="font-body text-sm">{email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400 justify-center sm:justify-start">
                    <Shield size={14} />
                    <span className="font-body text-sm capitalize">
                      {role} account
                    </span>
                  </div>
                  {/* Join date */}
                  {userProfile?.created_at && (
                    <div className="flex items-center gap-2 text-gray-400 justify-center sm:justify-start">
                      <CalendarDays size={14} />
                      <span className="font-body text-sm">
                        Joined{" "}
                        {new Date(userProfile.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Link
                    to="/settings"
                    className="font-body inline-flex items-center gap-2 text-xs text-[#553fc4] hover:underline"
                  >
                    <Settings size={13} /> Account Settings
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── FAVOURITE SERMONS ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-1.5 bg-linear-to-r from-[#150f33] to-[#553fc4]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                  <BookMarked size={18} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#150f33]">
                    Favourite Sermons
                  </h2>
                  {!favouritesLoading && (
                    <p className="font-body text-xs text-gray-400 mt-0.5">
                      {favourites.length} saved
                    </p>
                  )}
                </div>
              </div>

              {favouritesLoading ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="font-body text-gray-400 text-sm">
                    Loading...
                  </span>
                </div>
              ) : favourites.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="font-body text-gray-400 text-sm">
                    No favourites yet.
                  </p>
                  <Link
                    to="/sermons"
                    className="font-body text-[#553fc4] text-xs hover:underline mt-2 inline-block"
                  >
                    Browse sermons →
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {favourites.map((post, i) => (
                    <motion.div
                      key={post._id ?? i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between gap-3 border border-gray-100 rounded-2xl px-4 py-3 hover:bg-gray-50 transition group"
                    >
                      <Link
                        to={`/posts/${post._id}`}
                        state={{ post }}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-body text-sm text-gray-700 truncate font-medium">
                            {post.title}
                          </p>
                          {post.created_at && (
                            <p className="font-body text-xs text-gray-300 mt-0.5">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={() => removeFavourite(post._id)}
                        className="shrink-0 text-gray-300 hidden lg:flex hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-xs font-body"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => removeFavourite(post._id)}
                        className="shrink-0 lg:hidden text-red-400 hover:text-red-400 transition group-hover:opacity-100 text-xs font-body"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── PRAYER REQUESTS CARD ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-1.5 bg-linear-to-r from-[#553fc4] to-[#150f33]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                  <HeartHandshake size={18} className="text-[#553fc4]" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#150f33]">
                  Prayer Requests
                </h2>
              </div>

              {prayersLoading ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-[#553fc4] border-t-transparent rounded-full animate-spin" />
                  <span className="font-body text-gray-400 text-sm">
                    Loading...
                  </span>
                </div>
              ) : prayers.length === 0 ? (
                <div className="text-center py-8">
                  <HeartHandshake
                    size={32}
                    className="mx-auto text-gray-200 mb-3"
                  />
                  <p className="font-body text-gray-400 text-sm">
                    No prayer requests yet.
                  </p>
                  <a
                    href="/prayers"
                    className="font-body text-[#553fc4] text-xs hover:underline mt-2 inline-block"
                  >
                    Submit a prayer request →
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {prayers.map((prayer, i) => (
                    <motion.div
                      key={prayer._id ?? i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="border border-gray-100 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedPrayer(expandedPrayer === i ? null : i)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-[#553fc4]/40 shrink-0" />
                          <p className="font-body text-sm text-gray-700 truncate">
                            {prayer.request?.slice(0, 60) ?? "Prayer request"}
                            {prayer.request?.length > 60 ? "..." : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span
                            className={`font-body text-xs px-2 py-0.5 rounded-full font-semibold ${
                              prayer.status === "prayed"
                                ? "bg-green-100 text-green-600"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {prayer.status === "prayed"
                              ? "🙏 Prayed"
                              : "⏳ Pending"}
                          </span>
                          {prayer.created_at && (
                            <span className="font-body text-xs text-gray-300 hidden sm:block">
                              {new Date(prayer.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          )}
                          <ChevronDown
                            size={15}
                            className={`text-gray-400 transition-transform ${expandedPrayer === i ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedPrayer === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1 border-t border-gray-50">
                              <p className="font-body text-sm text-gray-600 leading-relaxed">
                                {prayer.request}
                              </p>
                              {prayer.created_at && (
                                <div className="flex items-center gap-1.5 mt-3 text-gray-300">
                                  <Calendar size={12} />
                                  <span className="font-body text-xs">
                                    {new Date(
                                      prayer.created_at,
                                    ).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
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

export default Profile;
