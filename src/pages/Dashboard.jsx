// import React from 'react'

// function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

// import React from "react";
// // import Layout from "../layouts/Layout";

// function Dashboard() {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
//       <p>Selamat datang di Hospital Management System.</p>
//     </div>
//   );
// }

// export default Dashboard;

// src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function StatCard({ icon, title, subtitle, value, bgColor }) {
//   return (
//     <div
//       className={`flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md text-white ${bgColor}`}
//     >
//       <div className="flex items-center gap-4">
//         <img
//           src={icon}
//           alt={subtitle}
//           className="w-12 h-12 rounded-md bg-white/20 p-2"
//         />
//         <div>
//           <p className="text-sm opacity-90">{subtitle}</p>
//           <p className="text-lg font-semibold">{title}</p>
//         </div>
//       </div>
//       {/* <div className="text-4xl font-bold tabular-nums">{value ?? "-"}</div> */}
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [counts, setCounts] = useState({
//     appointments: null,
//     patients: null,
//     doctors: null,
//     departments: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(null);

//   const tryFetch = async (paths) => {
//     for (const p of paths) {
//       try {
//         const res = await axios.get(p);
//         if (Array.isArray(res.data)) return res.data;
//         if (res.data && Array.isArray(res.data.data)) return res.data.data;
//         return [];
//       } catch (err) {}
//     }
//     return [];
//   };

//   useEffect(() => {
//     async function loadCounts() {
//       setLoading(true);
//       const [appointmentsRes, patientsRes, doctorsRes, departmentsRes] =
//         await Promise.all([
//           tryFetch(["/api/appointments", "/appointments"]),
//           tryFetch(["/api/patients", "/patients"]),
//           tryFetch(["/api/doctors", "/doctors"]),
//           tryFetch(["/api/departments", "/departments"]),
//         ]);

//       setCounts({
//         appointments: appointmentsRes.length,
//         patients: patientsRes.length,
//         doctors: doctorsRes.length,
//         departments: departmentsRes.length,
//       });
//       setLoading(false);
//     }

//     // get username from localStorage (set after login)
//     const user = localStorage.getItem("auth_user");
//     if (user) {
//       try {
//         setUsername(JSON.parse(user).username);
//       } catch (e) {
//         setUsername(null);
//       }
//     }

//     loadCounts();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h2>
//       {/* <p className="text-sm text-gray-600 mb-6">
//         Selamat datang di Hospital Management System.
//       </p> */}
//       <p className="text-sm text-gray-600 mb-6">
//         {/* bold username */}
//         {username ? (
//           <>
//             Selamat Datang, <strong>{username}</strong>
//           </>
//         ) : (
//           "Selamat datang di Hospital Management System."
//         )}
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           title={loading ? "..." : counts.appointments}
//           subtitle="Total Appointments"
//           icon="/icons/appointment.png"
//           bgColor="bg-blue-600"
//         />
//         <StatCard
//           title={loading ? "..." : counts.patients}
//           subtitle="Total Patients"
//           icon="/icons/patient.png"
//           bgColor="bg-green-600"
//         />
//         <StatCard
//           title={loading ? "..." : counts.doctors}
//           subtitle="Total Doctors"
//           icon="/icons/doctor.png"
//           bgColor="bg-indigo-600"
//         />
//         <StatCard
//           title={loading ? "..." : counts.departments}
//           subtitle="Total Departments"
//           icon="/icons/department.png"
//           bgColor="bg-yellow-500"
//         />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

function StatCard({ icon, title, subtitle, value, bgColor }) {
  return (
    <div
      className={`flex items-center justify-between gap-6 p-6 rounded-2xl text-white ${bgColor} transition-transform hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-5">
        <img
          src={icon}
          alt={subtitle}
          className="w-14 h-14 rounded-xl bg-white/20 p-3 shadow-md"
        />
        <div>
          <p className="text-base opacity-90">{subtitle}</p>
          <p className="text-2xl font-bold leading-tight">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [counts, setCounts] = useState({
    appointments: null,
    patients: null,
    doctors: null,
    departments: null,
  });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  const tryFetch = async (paths) => {
    for (const p of paths) {
      try {
        const res = await axios.get(p);
        if (Array.isArray(res.data)) return res.data;
        if (res.data && Array.isArray(res.data.data)) return res.data.data;
        return [];
      } catch (err) {}
    }
    return [];
  };

  useEffect(() => {
    async function loadCounts() {
      setLoading(true);
      const [appointmentsRes, patientsRes, doctorsRes, departmentsRes] =
        await Promise.all([
          tryFetch(["https://hospital-management-system-backend-zic1.onrender.com/api/appointments", "https://hospital-management-system-backend-zic1.onrender.com/appointments"]),
          tryFetch(["https://hospital-management-system-backend-zic1.onrender.com/api/patients", "https://hospital-management-system-backend-zic1.onrender.com/patients"]),
          tryFetch(["https://hospital-management-system-backend-zic1.onrender.com/api/doctors", "https://hospital-management-system-backend-zic1.onrender.com/doctors"]),
          tryFetch(["https://hospital-management-system-backend-zic1.onrender.com/api/departments", "https://hospital-management-system-backend-zic1.onrender.com/departments"]),
        ]);

      setCounts({
        appointments: appointmentsRes.length,
        patients: patientsRes.length,
        doctors: doctorsRes.length,
        departments: departmentsRes.length,
      });
      setLoading(false);
    }

    const user = localStorage.getItem("auth_user");
    if (user) {
      try {
        setUsername(JSON.parse(user).username);
      } catch (e) {
        setUsername(null);
      }
    }

    loadCounts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-3 text-gray-800 tracking-tight">Dashboard</h2>

      <p className="text-lg text-gray-700 mb-8">
        {username ? (
          <>
            Selamat Datang, <strong className="text-gray-900">{username}</strong>
          </>
        ) : (
          "Selamat datang di Hospital Management System."
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={loading ? "..." : counts.appointments}
          subtitle="Total Appointments"
          icon="/icons/appointment.png"
          bgColor="bg-blue-600"
        />
        <StatCard
          title={loading ? "..." : counts.patients}
          subtitle="Total Patients"
          icon="/icons/patient.png"
          bgColor="bg-green-600"
        />
        <StatCard
          title={loading ? "..." : counts.doctors}
          subtitle="Total Doctors"
          icon="/icons/doctor.png"
          bgColor="bg-indigo-600"
        />
        <StatCard
          title={loading ? "..." : counts.departments}
          subtitle="Total Departments"
          icon="/icons/department.png"
          bgColor="bg-yellow-500"
        />
      </div>
    </div>
  );
}
