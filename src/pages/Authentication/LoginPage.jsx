// // src/pages/Auth/LoginPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [err, setErr] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);
//     try {
//       const res = await axios.post("/api/auth/login", form);
//       const { token, user } = res.data;
//       // simpan token & user
//       localStorage.setItem("auth_token", token);
//       localStorage.setItem("auth_user", JSON.stringify(user));
//       // set default header axios
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       navigate("/"); // ke dashboard atau route lain
//     } catch (e) {
//       setErr(e.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//       <div className="w-full max-w-md bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
//           <div className="flex justify-between items-center">
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//               Login
//             </button>
//             <Link to="/register" className="text-sm text-blue-600">Register</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/pages/Auth/LoginPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// // import hospitalLogo from "../icons/hospital.png"; // pastikan path ini sesuai

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [err, setErr] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);
//     try {
//       const res = await axios.post("/api/auth/login", form);
//       const { token, user } = res.data;
//       localStorage.setItem("auth_token", token);
//       localStorage.setItem("auth_user", JSON.stringify(user));
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       navigate("/"); // ke dashboard
//     } catch (e) {
//       setErr(e.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105">
//         <div className="flex flex-col items-center mb-6">
//           <img src={"/icons/hospital.png"} alt="Hospital Logo" className="w-20 h-20 mb-4" />
//           <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//           <p className="text-gray-500 text-sm mt-1">Login to your account</p>
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

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             Login
//           </button>

//           <p className="text-center text-gray-500 text-sm">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-blue-600 font-medium hover:underline">
//               Register
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await axios.post("/api/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/"); // ke dashboard
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105">
        <div className="flex flex-col items-center mb-6">
          <img src={"/icons/hospital.png"} alt="Hospital Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>

        {err && <div className="text-red-600 mb-4 text-center font-medium">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 font-medium">Username / Email / Phone</label>
            <input
              name="identifier"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              placeholder="username or email or phone"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
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

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
