import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Trash2,
  Pencil,
  Plus,
  X,
  Check,
  Search,
  Menu,
  HeartHandshake,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://revival-api-rzf5.onrender.com";

/* ─────────────────────────────────────────────
   MANAGE POSTS VIEW
───────────────────────────────────────────── */
const ManagePosts = () => {
  const token = localStorage.getItem("access_token");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPosts(data.posts ?? data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await fetch(`${BASE_URL}/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((p) => p.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/posts/${editingPost._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      if (res.ok) {
        setPosts((p) =>
          p.map((post) =>
            post._id === editingPost._id
              ? { ...post, title: editTitle, content: editContent }
              : post,
          ),
        );
        setEditingPost(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosts((p) => [data, ...p]);
        setNewTitle("");
        setNewContent("");
        setShowCreate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading posts...
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Posts</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#150f33] text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-[#1e175a] transition text-sm cursor-pointer"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Post</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a58bff] text-sm"
        />
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl p-6 w-full sm:max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create Post</h2>
                <button onClick={() => setShowCreate(false)}>
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <textarea
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Post title"
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#a58bff] text-sm"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Post content"
                rows={5}
                className="w-full h-70 border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#a58bff] resize-none text-sm"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-lg bg-[#150f33] text-white hover:bg-[#1e175a] transition text-sm cursor-pointer"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl p-6 w-full sm:max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Post</h2>
                <button onClick={() => setEditingPost(null)}>
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#a58bff] text-sm"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={5}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#a58bff] resize-none text-sm"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#150f33] text-white hover:bg-[#1e175a] transition text-sm"
                >
                  <Check size={16} /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-gray-500 p-6 text-sm">No posts found.</p>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Title
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setEditingPost(post);
                              setEditTitle(post.title);
                              setEditContent(post.content ?? "");
                            }}
                            className="text-blue-500 hover:text-blue-700 transition"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y">
              {filtered.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setEditTitle(post.title);
                        setEditContent(post.content ?? "");
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MANAGE USERS VIEW
───────────────────────────────────────────── */
const ManageUsers = () => {
  const token = localStorage.getItem("access_token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(data.users ?? data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((u) => u.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      const res = await fetch(`${BASE_URL}/admin/users/${user._id}/role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok)
        setUsers((u) =>
          u.map((u) => (u._id === user._id ? { ...u, role: newRole } : u)),
        );
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading users...
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {users.length} Users
        </span>
      </div>
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a58bff] text-sm"
        />
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-gray-500 p-6 text-sm">No users found.</p>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Role
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {user.name ?? user.username ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleRole(user)}
                          className={`text-xs px-2 py-1 rounded-full font-semibold transition cursor-pointer ${user.role === "admin" ? "bg-[#150f33] text-white hover:bg-[#1e175a]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                          {user.role ?? "user"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-400 hover:text-red-600 transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y">
              {filtered.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">
                        {user.name ?? user.username ?? "—"}
                      </p>
                      <button
                        onClick={() => handleToggleRole(user)}
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold transition cursor-pointer ${user.role === "admin" ? "bg-[#150f33] text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {user.role ?? "user"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-600 transition shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MANAGE PRAYER REQUESTS VIEW
───────────────────────────────────────────── */
const ManagePrayers = () => {
  const token = localStorage.getItem("access_token");
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | prayed
  const [expandedPrayer, setExpandedPrayer] = useState(null);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/prayer-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPrayers(data.prayer_requests ?? data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prayer request?")) return;
    try {
      await fetch(`${BASE_URL}/admin/prayer-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrayers((p) => p.filter((pr) => pr._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (prayer) => {
    const newStatus = prayer.status === "prayed" ? "pending" : "prayed";
    try {
      const res = await fetch(
        `${BASE_URL}/admin/prayer-requests/${prayer._id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) {
        setPrayers((p) =>
          p.map((pr) =>
            pr._id === prayer._id ? { ...pr, status: newStatus } : pr,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = prayers
    .filter((p) => filter === "all" || p.status === filter)
    .filter(
      (p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.request?.toLowerCase().includes(search.toLowerCase()),
    );

  const pendingCount = prayers.filter((p) => p.status === "pending").length;
  const prayedCount = prayers.filter((p) => p.status === "prayed").length;

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading prayer requests...
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Prayer Requests</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-semibold">
            {pendingCount} pending
          </span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
            {prayedCount} prayed
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or request..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a58bff] text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "prayed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition capitalize ${filter === f ? "bg-[#150f33] text-white" : "bg-white border text-gray-500 hover:bg-gray-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <HeartHandshake size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No prayer requests found.</p>
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((prayer, i) => (
              <motion.div
                key={prayer._id ?? i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left — name + preview */}
                  <button
                    onClick={() =>
                      setExpandedPrayer(
                        expandedPrayer === prayer._id ? null : prayer._id,
                      )
                    }
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-sm text-gray-800">
                        {prayer.name ?? "Anonymous"}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${prayer.status === "prayed" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}
                      >
                        {prayer.status === "prayed"
                          ? "🙏 Prayed"
                          : "⏳ Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {prayer.request?.slice(0, 80)}
                      {prayer.request?.length > 80 ? "..." : ""}
                    </p>
                    {prayer.created_at && (
                      <p className="text-xs text-gray-300 mt-1">
                        {new Date(prayer.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </p>
                    )}
                  </button>

                  {/* Right — actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleStatus(prayer)}
                      title={
                        prayer.status === "prayed"
                          ? "Mark as pending"
                          : "Mark as prayed"
                      }
                      className={`p-1.5 rounded-lg transition ${prayer.status === "prayed" ? "bg-green-50 text-green-500 hover:bg-green-100" : "bg-amber-50 text-amber-500 hover:bg-amber-100"}`}
                    >
                      {prayer.status === "prayed" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(prayer._id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Expanded body */}
                <AnimatePresence>
                  {expandedPrayer === prayer._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-gray-50">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {prayer.request}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DASHBOARD OVERVIEW VIEW
───────────────────────────────────────────── */
const DashboardOverview = ({ onNavigate }) => {
  const token = localStorage.getItem("access_token");
  const [stats, setStats] = useState({ posts: 0, users: 0 });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setStats({ posts: data.total_posts, users: data.total_users });
          setRecentPosts(data.recent_posts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading...
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => onNavigate("posts")}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 cursor-pointer"
        >
          <h3 className="text-gray-500 text-xs sm:text-base">Total Posts</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stats.posts}</p>
          <p className="text-xs sm:text-sm text-[#a58bff] mt-2">
            Manage posts →
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => onNavigate("users")}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 cursor-pointer"
        >
          <h3 className="text-gray-500 text-xs sm:text-base">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stats.users}</p>
          <p className="text-xs sm:text-sm text-[#a58bff] mt-2">
            Manage users →
          </p>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Recent Posts
        </h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent posts found.</p>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-sm font-semibold text-gray-500">
                      Title
                    </th>
                    <th className="py-3 text-sm font-semibold text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3 text-sm">{post.title}</td>
                      <td className="py-3 text-sm text-gray-500">
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y">
              {recentPosts.map((post) => (
                <div key={post._id} className="py-3">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT ADMIN DASHBOARD
───────────────────────────────────────────── */
const AdminDashboard = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "posts", label: "Manage Posts", icon: <FileText size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    {
      id: "prayers",
      label: "Prayer Requests",
      icon: <HeartHandshake size={20} />,
    },
  ];

  const handleNavClick = (id) => {
    setView(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#150f33] text-white flex flex-col p-6 shrink-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-left ${view === item.id ? "bg-white/10 text-[#a58bff]" : "hover:text-[#a58bff] cursor-pointer"}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition px-3 py-2 mt-4 cursor-pointer"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between bg-[#150f33] text-white px-4 py-3 sticky top-0 z-10 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu size={22} />
          </button>
          <h2 className="font-bold text-lg">
            {navItems.find((i) => i.id === view)?.label ?? "Admin Panel"}
          </h2>
          <button
            onClick={handleLogout}
            className="text-red-400 p-1 cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {view === "dashboard" && (
                <DashboardOverview onNavigate={setView} />
              )}
              {view === "posts" && <ManagePosts />}
              {view === "users" && <ManageUsers />}
              {view === "prayers" && <ManagePrayers />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
