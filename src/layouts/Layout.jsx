// import React, { useState } from "react";
// import { FaUserMd, FaUserInjured, FaBars, FaBell } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";

// function DashboardLayout({ children }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* SIDEBAR */}
//       <div
//         className={`${
//           isOpen ? "w-64" : "w-20"
//         } bg-blue-800 text-white flex flex-col transition-all duration-300 relative`}
//       >
//         {/* Logo + Toggle */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
//           {isOpen && (
//             <h1 className="font-bold text-lg whitespace-nowrap">
//               Hospital Management System
//             </h1>
//           )}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 hover:bg-blue-700 rounded absolute -right-3 top-5 bg-blue-800 border border-blue-700 shadow-md"
//           >
//             {isOpen ? <IoMdClose size={18} /> : <FaBars size={18} />}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 mt-4">
//           <Link
//             to="/doctors"
//             className="flex items-center px-4 py-2 text-gray-200 hover:bg-blue-700 transition"
//           >
//             <FaUserMd size={20} />
//             {isOpen && <span className="ml-3">Doctors</span>}
//           </Link>
//           <Link
//             to="/"
//             className="flex items-center px-4 py-2 text-gray-200 hover:bg-blue-700 transition"
//           >
//             <FaUserInjured size={20} />
//             {isOpen && <span className="ml-3">Patients</span>}
//           </Link>
//         </nav>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col">
//         {/* HEADER */}
//         <header className="flex justify-end items-center bg-white p-4 shadow">
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <FaBell size={20} className="text-gray-700" />
//           </button>
//           <div className="ml-4 flex items-center space-x-2">
//             <img
//               src="/logo512.png"
//               alt="profile"
//               className="w-8 h-8 rounded-full object-cover"
//             />
//             <span className="text-gray-700 font-medium">Admin</span>
//           </div>
//         </header>

//         {/* CONTENT */}
//         <main className="p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;

// import React, { useState } from "react";
// import { FaBars, FaBell } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";

// function Layout({ children }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* SIDEBAR */}
//       <aside
//         className={`flex flex-col bg-blue-800 text-white transition-all duration-300 ${
//           isOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <div className="px-3 py-3 border-b border-blue-700 flex items-start gap-2">
//           {/* Judul: gunakan w-full agar membungkus dalam area sidebar;
//       whitespace-normal + break-words memastikan teks turun baris jika melebihi lebar */}
//           {isOpen && (
//             <div className="w-full flex items-center gap-2">
//               <img
//                 src="/icons/hospital.png"
//                 alt="Hospital Icon"
//                 className="w-10 h-10 object-contain"
//               />
//               <h1 className="font-bold text-3xl leading-tight whitespace-normal break-words">
//                 Hospital
//               </h1>
//             </div>
//           )}

//           {/* Toggle button: selalu berada di dalam area sidebar (tidak keluar)
//       saat isOpen=false tombol tetap terlihat karena kita menampilkannya
//       walau judul disembunyikan */}
//           <button
//             aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
//             onClick={() => setIsOpen((v) => !v)}
//             className="ml-auto flex-none p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             style={{ transform: isOpen ? "none" : "none" }}
//           >
//             {isOpen ? <IoMdClose size={18} /> : <FaBars size={18} />}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 mt-3 overflow-auto">
//           <Link
//             to="/"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/dashboard.png"
//               alt="Dashboard Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Dashboard</span>
//             )}
//           </Link>

//           <Link
//             to="/doctors"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/doctor.png"
//               alt="Doctors Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Doctors</span>
//             )}
//           </Link>

//           <Link
//             to="/patients"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/patient.png"
//               alt="Patients Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Patients</span>
//             )}
//           </Link>
//           <Link
//             to="/departments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/department.png"
//               alt="Departments Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Department</span>
//             )}
//           </Link>
//           <Link
//             to="/appointments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/appointment.png"
//               alt="Appointments Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Appointment</span>
//             )}
//           </Link>
//           <Link
//             to="/medical_records"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/medical-record.png"
//               alt="Medical Records Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">
//                 Medical Records
//               </span>
//             )}
//           </Link>
//           <Link
//             to="/rooms"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/room.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Rooms</span>
//             )}
//           </Link>
//           <Link
//             to="/admissions"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/admission.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Admissions</span>
//             )}
//           </Link>
//           <Link
//             to="/bills"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/bill.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Billings</span>
//             )}
//           </Link>
//           <Link
//             to="/medicines"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/drug.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Medicines</span>
//             )}
//           </Link>
//           <Link
//             to="/staff"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/staff.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Staff</span>
//             )}
//           </Link>

//           <Link
//             to="/labtests"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/labtest.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Lab Tests</span>
//             )}
//           </Link>
//           <Link
//             to="/suppliers"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/supplier.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && (
//               <span className="ml-1 text-mb-2 font-medium">Suppliers</span>
//             )}
//           </Link>
//         </nav>

//         {/* Footer area sidebar (opsional) */}
//         <div className="px-3 py-3 border-t border-blue-700">
//           {isOpen ? (
//             <p className="text-sm text-blue-200">v1.0 • Hospital</p>
//           ) : (
//             <div className="text-xs text-blue-200 text-center">v1</div>
//           )}
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col">
//         {/* HEADER */}
//         <header className="flex items-center justify-between bg-white p-4 shadow">
//           {/* Jika ingin menaruh sesuatu di kiri header (misal breadcrumbs),
//               bisa ditambahkan di sini */}
//           <div className="flex items-center space-x-4">
//             {/* Optional: tombol kecil untuk membuka sidebar juga di area header kiri
//                 (berguna saat layout mobile). Kita tampilkan hanya ketika sidebar tertutup */}
//             {!isOpen && (
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="p-2 rounded-md hover:bg-gray-100"
//                 aria-label="Open sidebar"
//               >
//                 <FaBars />
//               </button>
//             )}
//             <div className="text-lg font-medium text-gray-700">FAQ</div>
//           </div>

//           {/* Right side (notifikasi + profile) */}
//           <div className="flex items-center space-x-4">
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <FaBell size={18} className="text-gray-700" />
//             </button>

//             <div className="flex items-center gap-2">
//               <img
//                 src="/profile.png"
//                 alt="profile"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             </div>
//           </div>
//         </header>

//         {/* CONTENT */}
//         <main className="p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default Layout;

// import axios from "axios";
// import React, { useState } from "react";
// import { FaBars, FaBell, FaChevronDown, FaChevronRight } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";

// function Layout({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMedicinesOpen, setIsMedicinesOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const navigate = useNavigate();

//   // Handler untuk klik menu "Medicines"
//   const handleMedicinesClick = () => {
//     if (!isOpen) {
//       // Jika sidebar tertutup, buka sidebar + buka submenu
//       setIsOpen(true);
//       setIsMedicinesOpen(true);
//     } else {
//       // Jika sidebar terbuka, toggle submenu
//       setIsMedicinesOpen((prev) => !prev);
//     }
//   };

//   // const logout = () => {
//   //   alert("Logged out!");
//   // };

//   const logout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       localStorage.removeItem("auth_token"); // kalau ada token
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//       alert("Logout gagal!");
//     }
//   };

//   // Tutup submenu otomatis jika sidebar ditutup
//   React.useEffect(() => {
//     if (!isOpen) setIsMedicinesOpen(false);

//     const handleClick = (e) => {
//       if (
//         !e.target.closest(".profile-dropdown") &&
//         !e.target.closest(".profile-btn")
//       ) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [isOpen]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* SIDEBAR */}
//       <aside
//         className={`flex flex-col bg-blue-800 text-white transition-all duration-300 ${
//           isOpen ? "w-64" : "w-20"
//         }`}
//       >
//         {/* HEADER SIDEBAR */}
//         <div className="px-3 py-3 border-b border-blue-700 flex items-start gap-2">
//           {isOpen && (
//             <div className="w-full flex items-center gap-2">
//               <img
//                 src="/icons/hospital.png"
//                 alt="Hospital Icon"
//                 className="w-10 h-10 object-contain"
//               />
//               <h1 className="font-bold text-3xl leading-tight whitespace-normal break-words">
//                 Hospital
//               </h1>
//             </div>
//           )}

//           <button
//             aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
//             onClick={() => setIsOpen((v) => !v)}
//             className="px-3 py-3 ml-auto flex-none rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 items-center"
//           >
//             {isOpen ? <IoMdClose size={18} /> : <FaBars size={18} />}
//           </button>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 overflow-auto">
//           <Link
//             to="/"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/dashboard.png"
//               alt="Dashboard Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Dashboard</span>}
//           </Link>

//           <Link
//             to="/doctors"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/doctor.png"
//               alt="Doctors Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Doctors</span>}
//           </Link>

//           <Link
//             to="/patients"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/patient.png"
//               alt="Patients Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Patients</span>}
//           </Link>

//           <Link
//             to="/departments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/department.png"
//               alt="Departments Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Department</span>}
//           </Link>

//           <Link
//             to="/appointments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/appointment.png"
//               alt="Appointments Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Appointment</span>}
//           </Link>

//           <Link
//             to="/medical_records"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/medical-record.png"
//               alt="Medical Records Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && (
//               <span className="ml-1 font-medium">Medical Records</span>
//             )}
//           </Link>

//           <Link
//             to="/rooms"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/room.png" alt="Rooms Icon" className="w-7 h-7" />
//             {isOpen && <span className="ml-1 font-medium">Rooms</span>}
//           </Link>

//           <Link
//             to="/admissions"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/admission.png"
//               alt="Admissions Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Admissions</span>}
//           </Link>

//           <Link
//             to="/bills"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/bill.png"
//               alt="Billings Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Billings</span>}
//           </Link>

//           {/* ======= MEDICINES WITH SUBMENU ======= */}
//           <div>
//             <button
//               onClick={handleMedicinesClick}
//               className="flex items-center justify-between w-full gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src="/icons/drug.png"
//                   alt="Medicines Icon"
//                   className="w-7 h-7"
//                 />
//                 {isOpen && <span className="ml-1 font-medium">Medicines</span>}
//               </div>
//               {isOpen && (
//                 <span>
//                   {isMedicinesOpen ? (
//                     <FaChevronDown size={14} />
//                   ) : (
//                     <FaChevronRight size={14} />
//                   )}
//                 </span>
//               )}
//             </button>

//             {/* SUBMENU */}
//             {isOpen && isMedicinesOpen && (
//               <div className="ml-12 mt-1 flex flex-col space-y-1">
//                 <Link
//                   to="/medicines"
//                   className="text-gray-200 hover:text-white hover:underline text-sm"
//                 >
//                   Medicines
//                 </Link>
//                 <Link
//                   to="/purchases"
//                   className="text-gray-200 hover:text-white hover:underline text-sm"
//                 >
//                   Purchases
//                 </Link>
//                 <Link
//                   to="/entry-stocks"
//                   className="text-gray-200 hover:text-white hover:underline text-sm"
//                 >
//                   Entry Stocks
//                 </Link>
//                 <Link
//                   to="/exit-stocks"
//                   className="text-gray-200 hover:text-white hover:underline text-sm"
//                 >
//                   Exit Stocks
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* ======= END OF MEDICINES ======= */}

//           <Link
//             to="/staff"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/staff.png" alt="Staff Icon" className="w-7 h-7" />
//             {isOpen && <span className="ml-1 font-medium">Staff</span>}
//           </Link>

//           <Link
//             to="/labtests"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/labtest.png"
//               alt="Lab Tests Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Lab Tests</span>}
//           </Link>

//           <Link
//             to="/suppliers"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img
//               src="/icons/supplier.png"
//               alt="Suppliers Icon"
//               className="w-7 h-7"
//             />
//             {isOpen && <span className="ml-1 font-medium">Suppliers</span>}
//           </Link>
//         </nav>

//         {/* FOOTER */}
//         <div className="px-3 py-3 border-t border-blue-700">
//           {isOpen ? (
//             <p className="text-sm text-blue-200">v1.0 • Hospital</p>
//           ) : (
//             <div className="text-xs text-blue-200 text-center">v1</div>
//           )}
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between bg-white p-4 shadow">
//           <div className="text-lg font-medium text-gray-700">FAQ</div>
//           <div className="relative flex items-center space-x-4">
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <FaBell size={18} className="text-gray-700" />
//             </button>
//             {/* PROFILE BUTTON */}
//             <div
//               className="profile-btn cursor-pointer"
//               onClick={() => setIsProfileOpen((v) => !v)}
//             >
//               <img
//                 src="/profile.png"
//                 alt="profile"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             </div>

//             {/* DROPDOWN */}
//             {isProfileOpen && (
//               <div className="profile-dropdown absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md py-3 z-50">
//                 <div className="flex flex-col items-center border-b pb-3">
//                   <img
//                     src="/profile.png"
//                     alt="profile"
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <p className="text-sm mt-2 font-medium text-gray-700">User</p>
//                 </div>

//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
//                   onClick={() => alert("Edit Profile clicked")}
//                 >
//                   Edit Profile
//                 </button>

//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
//                   onClick={() => alert("Edit Password clicked")}
//                 >
//                   Edit Password
//                 </button>

//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 font-medium"
//                   onClick={logout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default Layout;

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaBars, FaBell, FaChevronDown, FaChevronRight } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";

// function Layout({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMedicinesOpen, setIsMedicinesOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   // tambahan state khusus mobile / portrait
//   const [isMobile, setIsMobile] = useState(false);

//   const navigate = useNavigate();

//   // Detect mode mobile (portrait = tinggi > lebar)
//   // const checkMobile = () => {
//   //   setIsMobile(window.innerHeight > window.innerWidth);
//   // };

//   const checkMobile = () => {
//     const nowMobile = window.innerHeight > window.innerWidth;

//     // Jika baru saja berubah menjadi mobile → auto close sidebar
//     if (nowMobile && !isMobile) {
//       setIsOpen(false);
//     }

//     setIsMobile(nowMobile);
//   };

//   useEffect(() => {
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleMedicinesClick = () => {
//     if (!isOpen) {
//       setIsOpen(true);
//       setIsMedicinesOpen(true);
//     } else {
//       setIsMedicinesOpen((prev) => !prev);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       localStorage.removeItem("auth_token");
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//       alert("Logout gagal!");
//     }
//   };

//   useEffect(() => {
//     if (!isOpen) setIsMedicinesOpen(false);

//     const handleClick = (e) => {
//       if (
//         !e.target.closest(".profile-dropdown") &&
//         !e.target.closest(".profile-btn")
//       ) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [isOpen]);

//   return (
//     <div className="flex h-screen bg-gray-100 relative">
//       {/* ======== OVERLAY (muncul ketika mobile + sidebar terbuka) ======== */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* ======== SIDEBAR ======== */}
//       <aside
//         className={`flex flex-col bg-blue-800 text-white z-40 transform transition-all duration-300
//           ${
//             isMobile
//               ? `fixed top-0 left-0 h-full ${
//                   isOpen ? "translate-x-0" : "-translate-x-full"
//                 } w-64`
//               : `${isOpen ? "w-64" : "w-20"}`
//           }`}
//       >
//         {/* HEADER */}
//         <div className="px-3 py-3 border-b border-blue-700 flex items-start gap-2">
//           {isOpen && (
//             <div className="w-full flex items-center gap-2">
//               <img src="/icons/hospital.png" className="w-10 h-10" />
//               <h1 className="font-bold text-3xl">Hospital</h1>
//             </div>
//           )}

//           <button
//             aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
//             onClick={() => setIsOpen((v) => !v)}
//             className="px-3 py-3 ml-auto flex-none rounded-md hover:bg-blue-700"
//           >
//             {isOpen ? <IoMdClose size={18} /> : <FaBars size={18} />}
//           </button>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 overflow-auto">
//           <Link
//             to="/"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/dashboard.png" className="w-7 h-7" />
//             {isOpen && <span>Dashboard</span>}
//           </Link>

//           <Link
//             to="/doctors"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/doctor.png" className="w-7 h-7" />
//             {isOpen && <span>Doctors</span>}
//           </Link>

//           <Link
//             to="/patients"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/patient.png" className="w-7 h-7" />
//             {isOpen && <span>Patients</span>}
//           </Link>

//           <Link
//             to="/departments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/department.png" className="w-7 h-7" />
//             {isOpen && <span>Department</span>}
//           </Link>

//           <Link
//             to="/appointments"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/appointment.png" className="w-7 h-7" />
//             {isOpen && <span>Appointment</span>}
//           </Link>

//           <Link
//             to="/medical_records"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/medical-record.png" className="w-7 h-7" />
//             {isOpen && <span>Medical Records</span>}
//           </Link>

//           <Link
//             to="/rooms"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/room.png" className="w-7 h-7" />
//             {isOpen && <span>Rooms</span>}
//           </Link>

//           <Link
//             to="/admissions"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/admission.png" className="w-7 h-7" />
//             {isOpen && <span>Admissions</span>}
//           </Link>

//           <Link
//             to="/bills"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/bill.png" className="w-7 h-7" />
//             {isOpen && <span>Billings</span>}
//           </Link>

//           {/* MEDICINES WITH SUBMENU */}
//           <div>
//             <button
//               onClick={handleMedicinesClick}
//               className="flex items-center justify-between w-full px-3 py-2 hover:bg-blue-700"
//             >
//               <div className="flex items-center gap-3">
//                 <img src="/icons/drug.png" className="w-7 h-7" />
//                 {isOpen && <span>Medicines</span>}
//               </div>
//               {isOpen && (
//                 <span>
//                   {isMedicinesOpen ? <FaChevronDown /> : <FaChevronRight />}
//                 </span>
//               )}
//             </button>

//             {isOpen && isMedicinesOpen && (
//               <div className="ml-16 mt-1 flex flex-col space-y-1">
//                 <Link
//                   to="/medicines"
//                   className="text-sm text-white no-underline hover:no-underline text-gray-200"
//                 >
//                   Medicines
//                 </Link>
//                 <Link
//                   to="/purchases"
//                   className="text-sm text-white no-underline hover:no-underline text-gray-200"
//                 >
//                   Purchases
//                 </Link>
//                 <Link
//                   to="/entry-stocks"
//                   className="text-sm text-white no-underline hover:no-underline text-gray-200"
//                 >
//                   Entry Stocks
//                 </Link>
//                 <Link
//                   to="/exit-stocks"
//                   className="text-sm text-white no-underline hover:no-underline text-gray-200"
//                 >
//                   Exit Stocks
//                 </Link>
//               </div>
//             )}
//           </div>

//           <Link
//             to="/staff"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/staff.png" className="w-7 h-7" />
//             {isOpen && <span>Staff</span>}
//           </Link>

//           <Link
//             to="/labtests"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/labtest.png" className="w-7 h-7" />
//             {isOpen && <span>Lab Tests</span>}
//           </Link>

//           <Link
//             to="/suppliers"
//             className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
//           >
//             <img src="/icons/supplier.png" className="w-7 h-7" />
//             {isOpen && <span>Suppliers</span>}
//           </Link>
//         </nav>

//         {/* FOOTER */}
//         <div className="px-3 py-3 border-t border-blue-700">
//           {isOpen ? (
//             <p className="text-sm text-blue-200">v1.0 • Hospital</p>
//           ) : (
//             <div className="text-xs text-blue-200 text-center">v1</div>
//           )}
//         </div>
//       </aside>

//       {/* ======== MAIN CONTENT ======== */}
//       <div className="flex-1 flex flex-col">
//         {/* HEADER */}
//         <header className="flex items-center justify-between bg-white p-4 shadow relative">
//           {/* Burger icon khusus mobile */}
//           {isMobile && (
//             <button
//               className="p-2 mr-3 rounded-md hover:bg-gray-100"
//               onClick={() => setIsOpen(true)}
//             >
//               <FaBars size={20} className="text-gray-700" />
//             </button>
//           )}

//           <div className="text-lg font-medium text-gray-700">FAQ</div>

//           <div className="relative flex items-center space-x-4">
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <FaBell size={18} className="text-gray-700" />
//             </button>

//             <div
//               className="profile-btn cursor-pointer"
//               onClick={() => setIsProfileOpen((v) => !v)}
//             >
//               <img src="/profile.png" className="w-8 h-8 rounded-full" />
//             </div>

//             {isProfileOpen && (
//               <div className="profile-dropdown absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md py-3 z-50">
//                 <div className="flex flex-col items-center border-b pb-3">
//                   <img src="/profile.png" className="w-12 h-12 rounded-full" />
//                   <p className="text-sm mt-2 font-medium text-gray-700">User</p>
//                 </div>

//                 <button className="w-full px-4 py-2 hover:bg-gray-100 text-sm">
//                   Edit Profile
//                 </button>

//                 <button className="w-full px-4 py-2 hover:bg-gray-100 text-sm">
//                   Edit Password
//                 </button>

//                 <button
//                   className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
//                   onClick={logout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         <main className="p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default Layout;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaBars, FaBell, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMedicinesOpen, setIsMedicinesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // tambahan state khusus mobile / portrait
  const [isMobile, setIsMobile] = useState(false);

  // AUTH / USER
  const [user, setUser] = useState(null); // { id, username, email, phone }
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();

  const checkMobile = () => {
    const nowMobile = window.innerHeight > window.innerWidth;

    // Jika baru saja berubah menjadi mobile → auto close sidebar
    if (nowMobile && !isMobile) {
      setIsOpen(false);
    }

    setIsMobile(nowMobile);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMedicinesClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMedicinesOpen(true);
    } else {
      setIsMedicinesOpen((prev) => !prev);
    }
  };

  // ---------- Auth helpers ----------
  // Set default header from localStorage token (if any)
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  const fetchUser = async () => {
    setLoadingUser(true);

    try {
      const token = localStorage.getItem("auth_token");

      // Jika tidak ada token → user dianggap tidak login
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      // Panggil endpoint memakai Authorization header
      const resp = await axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(resp.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);

      // Jika token invalid, hapus biar konsisten
      if (err?.response?.status === 401) {
        localStorage.removeItem("auth_token");
      }

      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("https://hospital-management-system-backend-zic1.onrender.com/api/auth/logout");
      localStorage.removeItem("auth_token");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout gagal!");
    }
  };

  useEffect(() => {
    if (!isOpen) setIsMedicinesOpen(false);

    const handleClick = (e) => {
      if (
        !e.target.closest(".profile-dropdown") &&
        !e.target.closest(".profile-btn")
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  // ---------- Profile modal ----------
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  const openProfileModal = () => {
    // autofill from user
    setProfileForm({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setShowProfileModal(true);
    setIsProfileOpen(false);
  };

  const handleProfileChange = (e) => {
    setProfileForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const resp = await axios.post("https://hospital-management-system-backend-zic1.onrender.com/api/users/profile", profileForm);
      // optimistic: update local user
      setUser((u) => ({
        ...u,
        username: profileForm.username,
        email: profileForm.email,
        phone: profileForm.phone,
      }));
      const updatedUser = {
        ...user,
        username: profileForm.username,
        email: profileForm.email,
        phone: profileForm.phone,
      };

      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));

      await fetchUser();

      setShowProfileModal(false);
      alert(resp.data?.message || "Profile updated");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Gagal update profile";
      alert(msg);
    } finally {
      setProfileLoading(false);
    }
  };

  // ---------- Password modal ----------
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const openPasswordModal = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(true);
    setIsProfileOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password tidak cocok");
      return;
    }

    setPasswordLoading(true);
    try {
      const payload = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      };
      const resp = await axios.post("https://hospital-management-system-backend-zic1.onrender.com/api/users/password", payload);
      setShowPasswordModal(false);
      alert(resp.data?.message || "Password updated");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Gagal update password";
      alert(msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* ======== OVERLAY (muncul ketika mobile + sidebar terbuka) ======== */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ======== SIDEBAR ======== */}
      <aside
        className={`flex flex-col bg-blue-800 text-white z-40 transform transition-all duration-300
          ${
            isMobile
              ? `fixed top-0 left-0 h-full ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } w-64`
              : `${isOpen ? "w-64" : "w-20"}`
          }`}
      >
        {/* HEADER */}
        <div className="px-3 py-3 border-b border-blue-700 flex items-start gap-2">
          {isOpen && (
            <div className="w-full flex items-center gap-2">
              <img src="/icons/hospital.png" alt="hospital" className="w-10 h-10" />
              <h1 className="font-bold text-3xl">Hospital</h1>
            </div>
          )}

          <button
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => setIsOpen((v) => !v)}
            className="px-3 py-3 ml-auto flex-none rounded-md hover:bg-blue-700"
          >
            {isOpen ? <IoMdClose size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/dashboard.png" alt="dashboard" className="w-7 h-7" />
            {isOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/doctors"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/doctor.png" alt="doctor" className="w-7 h-7" />
            {isOpen && <span>Doctors</span>}
          </Link>

          <Link
            to="/patients"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/patient.png" alt="patient" className="w-7 h-7" />
            {isOpen && <span>Patients</span>}
          </Link>

          <Link
            to="/departments"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/department.png" alt="department" className="w-7 h-7" />
            {isOpen && <span>Department</span>}
          </Link>

          <Link
            to="/appointments"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/appointment.png" alt="appointment" className="w-7 h-7" />
            {isOpen && <span>Appointment</span>}
          </Link>

          <Link
            to="/medical_records"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/medical-record.png" alt="medical-record" className="w-7 h-7" />
            {isOpen && <span>Medical Records</span>}
          </Link>

          <Link
            to="/rooms"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/room.png" alt="medical-record" className="w-7 h-7" />
            {isOpen && <span>Rooms</span>}
          </Link>

          <Link
            to="/admissions"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/admission.png" alt="admission" className="w-7 h-7" />
            {isOpen && <span>Admissions</span>}
          </Link>

          <Link
            to="/bills"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/bill.png" alt="bill" className="w-7 h-7" />
            {isOpen && <span>Billings</span>}
          </Link>

          {/* MEDICINES WITH SUBMENU */}
          <div>
            <button
              onClick={handleMedicinesClick}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-blue-700"
            >
              <div className="flex items-center gap-3">
                <img src="/icons/drug.png" alt="drug" className="w-7 h-7" />
                {isOpen && <span>Medicines</span>}
              </div>
              {isOpen && (
                <span>
                  {isMedicinesOpen ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}
            </button>

            {isOpen && isMedicinesOpen && (
              <div className="ml-16 mt-1 flex flex-col space-y-1">
                <Link
                  to="/medicines"
                  className="text-sm text-white no-underline hover:no-underline text-gray-200"
                >
                  Medicines
                </Link>
                <Link
                  to="/purchases"
                  className="text-sm text-white no-underline hover:no-underline text-gray-200"
                >
                  Purchases
                </Link>
                <Link
                  to="/entry-stocks"
                  className="text-sm text-white no-underline hover:no-underline text-gray-200"
                >
                  Entry Stocks
                </Link>
                <Link
                  to="/exit-stocks"
                  className="text-sm text-white no-underline hover:no-underline text-gray-200"
                >
                  Exit Stocks
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/staff"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/staff.png" alt="staff" className="w-7 h-7" />
            {isOpen && <span>Staff</span>}
          </Link>

          <Link
            to="/labtests"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/labtest.png" alt="labtest" className="w-7 h-7" />
            {isOpen && <span>Lab Tests</span>}
          </Link>

          <Link
            to="/suppliers"
            className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-blue-700 transition no-underline"
          >
            <img src="/icons/supplier.png" alt="supplier" className="w-7 h-7" />
            {isOpen && <span>Suppliers</span>}
          </Link>
        </nav>

        {/* FOOTER */}
        <div className="px-3 py-3 border-t border-blue-700">
          {isOpen ? (
            <p className="text-sm text-blue-200">v1.0 • Hospital</p>
          ) : (
            <div className="text-xs text-blue-200 text-center">v1</div>
          )}
        </div>
      </aside>

      {/* ======== MAIN CONTENT ======== */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between bg-white p-4 shadow relative">
          {/* Burger icon khusus mobile */}
          {isMobile && (
            <button
              className="p-2 mr-3 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={20} className="text-gray-700" />
            </button>
          )}

          <div className="text-lg font-medium text-gray-700">FAQ</div>

          <div className="relative flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaBell size={18} className="text-gray-700" />
            </button>

            <div
              className="profile-btn cursor-pointer"
              onClick={() => setIsProfileOpen((v) => !v)}
            >
              <img src="/profile.png" alt="profile" className="w-8 h-8 rounded-full" />
            </div>

            {isProfileOpen && (
              <div className="profile-dropdown absolute top-12 right-0 w-56 bg-white shadow-lg rounded-md py-3 z-50">
                <div className="flex flex-col items-center border-b pb-3 px-3">
                  <img src="/profile.png" alt="profile" className="w-12 h-12 rounded-full" />
                  <p className="text-sm mt-2 font-medium text-gray-700 break-all">
                    {/* show email when available, otherwise username or 'User' */}
                    {loadingUser
                      ? "Loading..."
                      : user?.email || user?.username || "User"}
                  </p>
                </div>

                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-left"
                  onClick={openProfileModal}
                >
                  Edit Profile
                </button>

                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-left"
                  onClick={openPasswordModal}
                >
                  Edit Password
                </button>

                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-6 overflow-auto">{children}</main>
      </div>

      {/* ======= PROFILE MODAL ======= */}
      {showProfileModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowProfileModal(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={submitProfile} className="space-y-3">
              <div>
                <label className="text-sm">Username</label>
                <input
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="text-sm">Phone</label>
                <input
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-md border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  {profileLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======= PASSWORD MODAL ======= */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowPasswordModal(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={submitPassword} className="space-y-3">
              <div>
                <label className="text-sm">Current Password</label>
                <input
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="text-sm">New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="text-sm">Confirm New Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-md border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
