// // src/pages/purchases/PurchaseList.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Pagination from "../../components/Pagination";

// export default function PurchaseList() {
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleteId, setDeleteId] = useState(null);
//   const navigate = useNavigate();

//   // pagination & search state
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");

//   // filter data by search (searching in all fields)
//   const filtered = useMemo(() => {
//     if (!search) return purchases;
//     const q = search.toLowerCase();
//     return purchases.filter((d) =>
//       Object.values(d || {})
//         .join(" ")
//         .toLowerCase()
//         .includes(q)
//     );
//   }, [purchases, search]);

//   // pagination slice
//   const totalItems = filtered.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filtered.slice(start, start + itemsPerPage);
//   }, [filtered, currentPage, itemsPerPage]);

//   useEffect(() => {
//     fetchPurchases();
//   }, []);

//   const fetchPurchases = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("${BASE_URL}/api/purchases");
//       setPurchases(res.data || []);
//     } catch (err) {
//       console.error("Failed to load purchases", err);
//       setPurchases([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//   };

//   const cancelDelete = () => setDeleteId(null);

//   const doDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/purchases/${deleteId}`);
//       setPurchases((prev) => prev.filter((p) => p.id !== deleteId));
//       setDeleteId(null);
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Gagal menghapus purchase. Cek console.");
//       setDeleteId(null);
//     }
//   };

//   const formatIndoDate = (dateStr) => {
//     if (!dateStr) return "-";
//     return new Intl.DateTimeFormat("id-ID", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     }).format(new Date(dateStr));
//   };

//   useEffect(() => {
//     // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
//     if (currentPage > totalPages) setCurrentPage(totalPages);
//   }, [totalPages, currentPage]);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Purchases</h1>
//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate("/purchases/create")}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             + Create Purchase
//           </button>
//           <button
//             onClick={fetchPurchases}
//             className="px-4 py-2 border rounded hover:bg-gray-50"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Controls: show items on left, search on right */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <label className="text-sm text-gray-600">Show</label>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(Number(e.target.value));
//               setCurrentPage(1); // reset to first page
//             }}
//             className="px-2 py-1 border rounded-md text-sm"
//           >
//             {[5, 10, 20, 50].map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//           <span className="text-sm text-gray-600">items</span>
//         </div>

//         <div className="flex items-center gap-2 w-full sm:w-auto">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm"
//           />
//         </div>
//       </div>

//       <div className="bg-white border rounded overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead className="bg-blue-500 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="py-3 px-4 text-left text-white">ID</th>
//               <th className="py-3 px-4 text-left text-white">Medicine</th>
//               <th className="py-3 px-4 text-left text-white">Supplier</th>
//               <th className="py-3 px-4 text-left text-white">Available</th>
//               <th className="py-3 px-4 text-left text-white">Unit Price</th>
//               <th className="py-3 px-4 text-left text-white">Expiry</th>
//               <th className="py-3 px-4 text-left text-white">Purchased At</th>
//               <th className="py-3 px-4 text-center text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="9" className="p-6 text-center text-gray-500">
//                   Loading...
//                 </td>
//               </tr>
//             ) : purchases.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="p-6 text-center text-gray-400">
//                   No purchases found.
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((p) => (
//                 <tr key={p.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 px-4">{p.id}</td>
//                   <td className="py-3 px-4 font-medium">
//                     {p.medicine_name || "-"}
//                   </td>
//                   <td className="py-3 px-4">{p.supplier_name || "-"}</td>
//                   <td className="py-3 px-4">{p.available_qty}</td>
//                   <td className="py-3 px-4">
//                     Rp {p.unit_price?.toLocaleString?.() ?? p.unit_price}
//                   </td>
//                   <td className="py-3 px-4">
//                     {p.expiry_date ? formatIndoDate(p.expiry_date) : "-"}
//                   </td>
//                   <td className="py-3 px-4">
//                     {p.purchased_at
//                       ? new Date(p.purchased_at).toLocaleString()
//                       : "-"}
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <Link
//                         to={`/purchases/${p.id}`}
//                         className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//                       >
//                         Detail
//                       </Link>
//                       <Link
//                         to={`/purchases/edit/${p.id}`}
//                         className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => confirmDelete(p.id)}
//                         className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Bottom: showing & pagination component */}
//       <div className="p-4">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//           <div className="text-sm text-gray-600">
//             {`Showing ${totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
//               } to ${Math.min(
//                 totalItems,
//                 currentPage * itemsPerPage
//               )} of ${totalItems} entries`}
//           </div>

//           <div className="w-full sm:w-auto">
//             <Pagination
//               totalItems={totalItems}
//               currentPage={currentPage}
//               onPageChange={(p) => setCurrentPage(p)}
//               itemsPerPage={itemsPerPage}
//               onItemsPerPageChange={(n) => {
//                 setItemsPerPage(n);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Delete confirmation modal */}
//       {deleteId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
//             <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to delete purchase #{deleteId}? This action
//               cannot be undone.
//             </p>
//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../config/api";

export default function PurchaseList() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/purchases`);
      setPurchases(res.data || []);
    } catch (err) {
      console.error("Failed to load purchases", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  // 1. Logic Filtering & Sorting (PENTING: Harus diurutkan berdasarkan nama agar bisa dikelompokkan)
  const filtered = useMemo(() => {
    let data = [...purchases];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((d) =>
        Object.values(d || {}).join(" ").toLowerCase().includes(q)
      );
    }
    // Urutkan berdasarkan nama medicine agar baris yang sama berdekatan
    return data.sort((a, b) => (a.medicine_name || "").localeCompare(b.medicine_name || ""));
  }, [purchases, search]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  // 2. Logic Grouping untuk RowSpan
  // Fungsi ini menghitung berapa banyak baris yang memiliki nama medicine yang sama
  const getGroupStats = (data) => {
    const stats = {};
    data.forEach((item) => {
      const name = item.medicine_name || "Unknown";
      if (!stats[name]) {
        stats[name] = { count: 0, totalAvailable: 0 };
      }
      stats[name].count += 1;
      stats[name].totalAvailable += (parseInt(item.available_qty, 10) || 0);
    });
    return stats;
  };

  const groupStats = useMemo(() => getGroupStats(paginated), [paginated]);
  const renderedGroups = {}; // Tracker untuk baris mana yang sudah menampilkan kolom "Medicine"

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${BASE_URL}/api/purchases/${deleteId}`);
      setPurchases((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed", err);
      setDeleteId(null);
    }
  };

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  return (
    <div className="p-6">
      {/* Header & Controls tetap sama */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Purchases Grouping</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate("/purchases/create")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Create Purchase</button>
          <button onClick={fetchPurchases} className="px-4 py-2 border rounded hover:bg-gray-50">Refresh</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Show</label>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-2 py-1 border rounded-md text-sm">
            {[5, 10, 20, 50].map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
          </select>
          <span className="text-sm text-gray-600">items</span>
        </div>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm" />
      </div>

      <div className="bg-white border rounded overflow-x-auto shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-blue-600 text-white uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-center border">Medicine</th>
              <th className="py-3 px-4 text-center border">Total Available</th>
              <th className="py-3 px-4 text-left border">Supplier</th>
              <th className="py-3 px-4 text-left border">Available (Batch)</th>
              <th className="py-3 px-4 text-left border">Unit Price</th>
              <th className="py-3 px-4 text-left border">Expiry</th>
              <th className="py-3 px-4 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-6 text-center text-gray-500">Loading...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan="7" className="p-6 text-center text-gray-400">No purchases found.</td></tr>
            ) : (
              paginated.map((p) => {
                const name = p.medicine_name || "Unknown";
                const isFirstInGroup = !renderedGroups[name];
                if (isFirstInGroup) renderedGroups[name] = true;

                return (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    {/* KOLOM MEDICINE (GROUPED) */}
                    {isFirstInGroup && (
                      <td
                        rowSpan={groupStats[name].count}
                        className="py-3 px-4 font-bold text-center border bg-gray-50 align-middle"
                      >
                        {name}
                      </td>
                    )}

                    {/* KOLOM TOTAL AVAILABLE (GROUPED) */}
                    {isFirstInGroup && (
                      <td
                        rowSpan={groupStats[name].count}
                        className="py-3 px-4 font-bold text-center border text-blue-600 bg-blue-50 align-middle"
                      >
                        <span className="text-lg">{groupStats[name].totalAvailable}</span>
                        <div className="text-[10px] text-gray-400 uppercase">Total Unit</div>
                      </td>
                    )}

                    <td className="py-3 px-4 border">{p.supplier_name || "-"}</td>
                    <td className="py-3 px-4 border font-medium text-orange-600">{p.available_qty}</td>
                    <td className="py-3 px-4 border">Rp {p.unit_price?.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 border">{formatIndoDate(p.expiry_date)}</td>
                    <td className="py-3 px-4 border text-center">
                      <div className="flex gap-1 justify-center">
                        <Link to={`/purchases/edit/${p.id}`} className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Edit</Link>
                        <button onClick={() => confirmDelete(p.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded">Del</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Modal tetap sama */}
      <div className="p-4 bg-white border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            {`Showing ${totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to ${Math.min(totalItems, currentPage * itemsPerPage)} of ${totalItems} entries`}
          </div>
          <Pagination totalItems={totalItems} currentPage={currentPage} onPageChange={(p) => setCurrentPage(p)} itemsPerPage={itemsPerPage} onItemsPerPageChange={(n) => { setItemsPerPage(n); setCurrentPage(1); }} />
        </div>
      </div>

      {/* Delete Modal Code... */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete purchase #{deleteId}? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}