// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Home() {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     axios
//     .get("/patients")
//     .then((res) => {
//       setPatients(res.data);
//     });
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Yakin ingin menghapus data pasien ini?")) {
//       await axios
//       .delete(`/delete/${id}`);
//       setPatients(patients.filter((p) => p.id !== id));
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">Daftar Pasien</h2>
//         <Link
//           to="/create"
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           + Tambah Pasien
//         </Link>
//       </div>

//       <table className="w-full border-collapse text-center">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Nama</th>
//             <th className="p-3 border">Email</th>
//             <th className="p-3 border">Usia</th>
//             <th className="p-3 border">Gender</th>
//             <th className="p-3 border">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((p) => (
//             <tr key={p.id} className="hover:bg-gray-50">
//               <td className="border p-2">{p.id}</td>
//               <td className="border p-2">{p.name}</td>
//               <td className="border p-2">{p.email}</td>
//               <td className="border p-2">{p.age}</td>
//               <td className="border p-2">{p.gender}</td>
//               <td className="border p-2 space-x-2">
//                 <Link
//                   to={`/read/${p.id}`}
//                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                 >
//                   View
//                 </Link>
//                 <Link
//                   to={`/edit/${p.id}`}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(p.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Home() {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     axios.get("/patients").then((res) => {
//       setPatients(res.data);
//     });
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Yakin ingin menghapus data pasien ini?")) {
//       await axios.delete(`/delete/${id}`);
//       setPatients(patients.filter((p) => p.id !== id));
//     }
//   };

//   return (
//     <div className="container my-5">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h2 className="h4 mb-0 text-secondary">Daftar Pasien</h2>
//             <Link to="/create" className="btn btn-primary">
//               + Tambah Pasien
//             </Link>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle text-center">
//               <thead className="table-light">
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">Nama</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Usia</th>
//                   <th scope="col">Gender</th>
//                   <th scope="col">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {patients.map((p) => (
//                   <tr key={p.id}>
//                     <td>{p.id}</td>
//                     <td>{p.name}</td>
//                     <td>{p.email}</td>
//                     <td>{p.age}</td>
//                     <td>{p.gender}</td>
//                     <td>
//                       <div className="btn-group" role="group">
//                         <Link
//                           to={`/read/${p.id}`}
//                           className="btn btn-success btn-sm"
//                         >
//                           View
//                         </Link>
//                         <Link
//                           to={`/edit/${p.id}`}
//                           className="btn btn-warning btn-sm text-white"
//                         >
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="btn btn-danger btn-sm"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {patients.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="text-muted">
//                       Tidak ada data pasien.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function PatientList() {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     axios.get("/patients").then((res) => {
//       setPatients(res.data);
//     });
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Yakin ingin menghapus data pasien ini?")) {
//       await axios.delete(`/delete/${id}`);
//       setPatients(patients.filter((p) => p.id !== id));
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto my-10 px-4">
//       <div className="bg-white shadow-md rounded-xl overflow-hidden">
//         <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">
//             Daftar Pasien
//           </h2>
//           <Link
//             to="/create"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
//           >
//             + Tambah Pasien
//           </Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-center">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
//               <tr>
//                 <th className="py-3 px-4">ID</th>
//                 <th className="py-3 px-4">Nama</th>
//                 <th className="py-3 px-4">Email</th>
//                 <th className="py-3 px-4">Usia</th>
//                 <th className="py-3 px-4">Gender</th>
//                 <th className="py-3 px-4">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="border-b hover:bg-gray-50 transition-all"
//                 >
//                   <td className="py-3 px-4">{p.id}</td>
//                   <td className="py-3 px-4 font-medium text-gray-800">
//                     {p.name}
//                   </td>
//                   <td className="py-3 px-4 text-gray-600">{p.email}</td>
//                   <td className="py-3 px-4">{p.age}</td>
//                   <td className="py-3 px-4">{p.gender}</td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center gap-2">
//                       <Link
//                         to={`/read/${p.id}`}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         View
//                       </Link>
//                       <Link
//                         to={`/edit/${p.id}`}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(p.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {patients.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-6 text-gray-400 italic text-center"
//                   >
//                     Tidak ada data pasien.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function PatientList() {
//   const [patients, setPatients] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   useEffect(() => {
//     axios.get("/api/patients").then((res) => {
//       setPatients(res.data);
//     });
//   }, []);

//   const openModal = (id) => {
//     setSelectedId(id);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedId(null);
//     setShowModal(false);
//   };

//   const handleDelete = async () => {
//     if (selectedId) {
//       await axios.delete(`/api/delete/${selectedId}`);
//       setPatients(patients.filter((p) => p.id !== selectedId));
//       closeModal();
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto my-10 px-4">
//       <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-700 mb-4 sm:mb-0">
//             Daftar Pasien
//           </h2>
//           <Link
//             to="/create"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 shadow"
//           >
//             + Tambah Pasien
//           </Link>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-center">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
//               <tr>
//                 <th className="py-3 px-4">ID</th>
//                 <th className="py-3 px-4">Nama</th>
//                 <th className="py-3 px-4">Email</th>
//                 <th className="py-3 px-4">Usia</th>
//                 <th className="py-3 px-4">Gender</th>
//                 <th className="py-3 px-4">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="border-b hover:bg-gray-50 transition-all"
//                 >
//                   <td className="py-3 px-4">{p.id}</td>
//                   <td className="py-3 px-4 font-medium text-gray-800">
//                     {p.name}
//                   </td>
//                   <td className="py-3 px-4 text-gray-600">{p.email}</td>
//                   <td className="py-3 px-4">{p.age}</td>
//                   <td className="py-3 px-4">{p.gender}</td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center gap-2">
//                       <Link
//                         to={`/read/${p.id}`}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         View
//                       </Link>
//                       <Link
//                         to={`/edit/${p.id}`}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => openModal(p.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {patients.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="py-6 text-gray-400 italic text-center"
//                   >
//                     Tidak ada data pasien.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal Konfirmasi Delete */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
//           <div className="bg-white rounded-xl shadow-2xl w-80 p-6 text-center transform transition-all scale-100">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Konfirmasi Hapus
//             </h3>
//             <p className="text-gray-500 mb-6 text-sm">
//               Are you sure you want to delete this data?
//             </p>
//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PatientList;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/patients").then((res) => {
      setPatients(res.data || []);
    });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return patients;
    const q = search.toLowerCase();
    return patients.filter((p) =>
      Object.values(p || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [patients, search]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await axios.delete(`https://hospital-management-system-backend-zic1.onrender.com/api/delete/${selectedId}`);
      setPatients((prev) => prev.filter((p) => p.id !== selectedId));
      closeModal();
    }
  };

  return (
    <div className="max-w-8xl mx-auto my-10 px-4">
      {/* <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"> */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-700">Daftar Pasien</h2>
          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 shadow"
          >
            + Tambah Pasien
          </Link>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border rounded-md text-sm"
            >
              {[5, 10, 20, 50].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">items</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center bg-white">
            <thead className="bg-blue-500 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3 px-4 text-white">ID</th>
                <th className="py-3 px-4 text-white">Nama</th>
                <th className="py-3 px-4 text-white">Email</th>
                <th className="py-3 px-4 text-white">Usia</th>
                <th className="py-3 px-4 text-white">Gender</th>
                <th className="py-3 px-4 text-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4">{p.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 px-4 text-gray-600">{p.email}</td>
                  <td className="py-3 px-4">{p.age}</td>
                  <td className="py-3 px-4">{p.gender}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/read/${p.id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${p.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-gray-400 italic text-center">
                    Tidak ada data pasien.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              {`Showing ${totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to ${Math.min(totalItems, currentPage * itemsPerPage)} of ${totalItems} entries`}
            </div>

            <div className="w-full sm:w-auto">
              <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={(p) => setCurrentPage(p)}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(n) => {
                  setItemsPerPage(n);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        {/* </div> */}
      </div>

      {/* Modal Konfirmasi Delete */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-80 p-6 text-center transform transition-all scale-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete this data?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;

