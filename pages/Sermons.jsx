import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 7;

const AllPosts = ({ isAdmin, token }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [page, debouncedSearch]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit: POSTS_PER_PAGE,
        search: debouncedSearch,
      }).toString();

      const res = await fetch(`http://localhost:8000/posts?${query}`);
      const data = await res.json();
      const fetched = data.posts ?? [];
      setPosts(fetched);

      if (data.total) {
        setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE));
      } else {
        // If backend doesn't return total, infer from results
        if (fetched.length < POSTS_PER_PAGE) setTotalPages(page);
        else setTotalPages(page + 1); // at least one more page exists
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (e, postId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this sermon?")) return;
    try {
      const res = await fetch(`http://localhost:8000/admin/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const openPost = (post) => {
    navigate(`/posts/${post._id}`, {
      state: {
        post: {
          _id: post._id,
          title: post.title,
          body: post.body,
          content: post.content,
          created_at: post.created_at,
          author: post.author,
          category: post.category,
        },
      },
    });
  };

  // Featured = first post, rest = remaining
  const [featured, ...rest] = posts;

  return (
    <div
      className="min-h-screen bg-[#0e0b24] px-4 sm:px-8 py-6 sm:py-6"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <div className="h-25 lg:hidden"></div>
      {/* Google Font inject */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-6"
        >
          <h1 className="font-display text-5xl sm:text-7xl font-black text-white text-center leading-none">
            Sermons
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6 max-w-xl mx-auto"
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search sermons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full font-body bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a58bff]/50 focus:border-transparent transition"
          />
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-8 h-8 border-2 border-[#a58bff] border-t-transparent rounded-full animate-spin" />
              <p className="font-body text-white/40 text-sm">
                Loading sermons...
              </p>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <BookOpen size={40} className="mx-auto text-white/20 mb-4" />
              <p className="font-body text-white/40">No sermons found.</p>
            </motion.div>
          ) : (
            <motion.div
              key={`page-${page}-${debouncedSearch}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Featured post — full width hero card */}
              {featured && (
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  onClick={() => openPost(featured)}
                  className="relative mb-8 rounded-2xl overflow-hidden cursor-pointer group bg-linear-to-br from-[#1e1645] to-[#2d1f6e] border border-white/10 hover:border-[#a58bff]/40 transition-all duration-300"
                >
                  <div className="p-8 sm:p-12 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
                    {/* Label */}
                    <div className="shrink-0">
                      <span className="font-body text-xs tracking-[0.25em] uppercase text-[#a58bff] bg-[#a58bff]/10 px-3 py-1.5 rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-[#c4aeff] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="font-body text-white/50 text-base leading-relaxed line-clamp-3 mb-6">
                        {featured.body ?? featured.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {featured.author && (
                            <span className="font-body text-xs text-white/40">
                              {featured.author}
                            </span>
                          )}
                          <span className="font-body text-xs text-white/30">
                            {featured.created_at
                              ? new Date(
                                  featured.created_at,
                                ).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}
                          </span>
                        </div>
                        <span className="font-body text-xs text-[#a58bff] group-hover:translate-x-1 transition-transform inline-block">
                          Read sermon →
                        </span>
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={(e) => handleDelete(e, featured._id)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Grid of remaining posts */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post, i) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -3 }}
                      onClick={() => openPost(post)}
                      className="relative group cursor-pointer bg-white/3 border border-white/8 hover:border-[#a58bff]/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/6"
                    >
                      {/* Top accent line */}
                      <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-[#a58bff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        <h3 className="font-display text-lg font-bold text-white leading-snug mb-3 group-hover:text-[#c4aeff] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="font-body text-white/40 text-sm leading-relaxed line-clamp-3">
                          {post.body ?? post.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8">
                        <span className="font-body text-xs text-white/25">
                          {post.created_at
                            ? new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </span>
                        <span className="font-body text-xs text-[#a58bff]/70 group-hover:text-[#a58bff] transition-colors">
                          Read →
                        </span>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={(e) => handleDelete(e, post._id)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {!loading && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center gap-4 mt-14"
          >
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <span className="font-body text-white/40 text-sm tabular-nums">
              {page} {totalPages > 1 ? `/ ${totalPages}` : ""}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
