// import React, { useEffect, useState } from "react";

// const AdminPosts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/admin/posts", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setPosts(data.posts))
//       .catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">All Posts</h2>
//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Views</th>
//             <th>Featured</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post._id} className="border-t">
//               <td>{post.title}</td>
//               <td>{post.views}</td>
//               <td>{post.featured ? "Yes" : "No"}</td>
//               <td>{/* Add admin delete or toggle featured buttons here */}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPosts;
