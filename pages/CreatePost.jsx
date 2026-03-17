import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, FileText, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "admin") {
      navigate("/");
    }
  }, []);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const charCount = body.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Please fill in both the title and body.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://revival-api-rzf5.onrender.com/admin/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Failed to create post. Please try again.");
        setLoading(false);
        return;
      }

      // Success — navigate to sermons page
      navigate("/sermons");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .prose-textarea::placeholder { color: #d1d5db; }
      `}</style>

      <div className="lg:hidden flex h-20" />

      {/* Top banner */}
      <div className="bg-linear-to-b from-[#150f33] to-[#221a50] pt-24 pb-28" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 pb-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="font-body flex items-center gap-2 text-white/60 hover:text-white transition text-sm group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Top color strip */}
          <div className="h-1.5]" />

          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#150f33]/5 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-[#150f33]" />
              </div>
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase text-[#553fc4] mb-1">
                  Admin
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#150f33] leading-tight">
                  New Sermon
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <label className="font-body text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter sermon title..."
                  className="font-display text-2xl sm:text-3xl font-bold text-[#150f33] w-full border-0 border-b-2 border-gray-100 focus:border-[#553fc4] focus:outline-none pb-3 bg-transparent placeholder-gray-200 transition-colors"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="font-body text-xs text-gray-300 uppercase tracking-widest">
                  Body
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Body */}
              <div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your sermon here..."
                  rows={16}
                  className="prose-textarea font-body text-gray-700 text-base leading-relaxed w-full border border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#553fc4]/20 focus:border-[#553fc4]/30 resize-none bg-gray-50/50 transition"
                />
                {/* Word / char count */}
                <div className="flex items-center justify-end gap-4 mt-2">
                  <span className="font-body text-xs text-gray-300">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                  <span className="font-body text-xs text-gray-300">
                    {charCount} {charCount === 1 ? "character" : "characters"}
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-body"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="font-body text-sm text-gray-400 hover:text-gray-600 transition w-full sm:w-auto text-center"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  disabled={loading || !title.trim() || !body.trim()}
                  className="font-body flex items-center justify-center gap-2 bg-[#150f33] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#221a50] transition disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={15} /> Publish Sermon
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        <p className="font-body text-center text-gray-300 text-xs mt-8">
          © {new Date().getFullYear()} Revival Network Commission
        </p>
      </div>
    </div>
  );
};

export default CreatePost;
