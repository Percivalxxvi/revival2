import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";

const PostDetails = ({ token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!post) {
      const postId = window.location.pathname.split("/").pop();
      fetchPost(postId);
    }
  }, []);

  const fetchPost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${postId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) setPost(data.post ?? data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e0b24]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#a58bff] border-t-transparent rounded-full animate-spin" />
          <p
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-white/40 text-sm"
          >
            Loading sermon...
          </p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0e0b24] gap-4">
        <p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-white/40"
        >
          Sermon not found.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-[#a58bff] text-sm hover:underline"
        >
          ← Go back
        </button>
      </div>
    );

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#0e0b24]">
      <div className="h-25 lg:hidden"></div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Top nav bar */}
      <div className="sticky top-0 z-10 bg-[#0e0b24]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="font-body flex items-center gap-2 text-white/50 hover:text-white transition text-sm group cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            All Sermons
          </button>
        </div>
      </div>

      {/* Article */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-6"
      >
        {/* Category / label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-[#a58bff]" />
          <span
            className="font-body text-xs tracking-[0.25em] uppercase text-[#a58bff]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {post.category ?? "Sermon"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl md:text-5xl font-black text-white leading-[1.1] mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-5 mb-10 pb-10 border-b border-white/10"
        >
          {post.author && (
            <div
              className="flex items-center gap-2 text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <User size={14} />
              <span className="text-sm">{post.author}</span>
            </div>
          )}
          {formattedDate && (
            <div
              className="flex items-center gap-2 text-white/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Calendar size={14} />
              <span className="text-sm">{formattedDate}</span>
            </div>
          )}
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div
            className="text-white/70 text-lg sm:text-xl leading-[1.85] whitespace-pre-line"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {/* Drop cap on first paragraph */}
            {(post.body ?? post.content ?? "")
              .split("\n\n")
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition text-sm group cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to all sermons
          </button>

          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-[#a58bff]/40" />
            <span
              className="text-[#a58bff]/40 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Revival Network Commission
            </span>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

export default PostDetails;
