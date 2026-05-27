// // src/pages/Auth/RegisterPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "", password2: "" });
//   const [err, setErr] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);
//     if (form.password !== form.password2) {
//       setErr("Passwords do not match");
//       return;
//     }
//     try {
//       await axios.post("/api/auth/register", { username: form.username, password: form.password });
//       // redirect to login
//       navigate("/login");
//     } catch (e) {
//       setErr(e.response?.data?.message || "Register failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//       <div className="w-full max-w-md bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Register</h2>
//         {err && <div className="text-red-600 mb-3">{err}</div>}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             name="username"
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//             placeholder="Username"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             placeholder="Password"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password2"
//             value={form.password2}
//             onChange={(e) => setForm({ ...form, password2: e.target.value })}
//             placeholder="Confirm password"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <div className="flex justify-between items-center">
//             <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
//               Register
//             </button>
//             <Link to="/login" className="text-sm text-blue-600">Login</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/pages/Auth/RegisterPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// // import hospitalLogo from "../../assets/hospital.png"; // pastikan path sesuai

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "", password2: "" });
//   const [err, setErr] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);
//     if (form.password !== form.password2) {
//       setErr("Passwords do not match");
//       return;
//     }
//     try {
//       await axios.post("/api/auth/register", { username: form.username, password: form.password });
//       navigate("/login"); // redirect ke login
//     } catch (e) {
//       setErr(e.response?.data?.message || "Register failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105">
//         <div className="flex flex-col items-center mb-6">
//           <img src={"/icons/hospital.png"} alt="Hospital Logo" className="w-20 h-20 mb-4" />
//           <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
//           <p className="text-gray-500 text-sm mt-1">Register to get started</p>
//         </div>

//         {err && <div className="text-red-600 mb-4 text-center font-medium">{err}</div>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-gray-600 font-medium">Username</label>
//             <input
//               name="username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               placeholder="Enter your username"
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-gray-600 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               placeholder="Enter your password"
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-gray-600 font-medium">Confirm Password</label>
//             <input
//               type="password"
//               name="password2"
//               value={form.password2}
//               onChange={(e) => setForm({ ...form, password2: e.target.value })}
//               placeholder="Confirm your password"
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
//           >
//             Register
//           </button>

//           <p className="text-center text-gray-500 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "", password2: "" });
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (form.password !== form.password2) {
      setErr("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        username: form.username,
        email: form.email || undefined,
        phone: form.phone || undefined,
        password: form.password,
      });
      navigate("/login"); // redirect ke login
    } catch (e) {
      setErr(e.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105">
        <div className="flex flex-col items-center mb-6">
          <img src={"/icons/hospital.png"} alt="Hospital Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Register to get started</p>
        </div>

        {err && <div className="text-red-600 mb-4 text-center font-medium">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email (optional)</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Phone (optional)</label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+6281234567890"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={(e) => setForm({ ...form, password2: e.target.value })}
              placeholder="Confirm your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Register
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
