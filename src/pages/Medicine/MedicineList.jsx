import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [stocks, setStocks] = useState([]);


  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");


  const filtered = useMemo(() => {
    if (!search) return medicines;
    const q = search.toLowerCase();
    return medicines.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [medicines, search]);


  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    const load = async () => {
      try {
        const [medRes, stockRes] = await Promise.all([
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/medicines"),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/medicine_stocks"),
        ]);
        setMedicines(medRes.data || []);
        setStocks(stockRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    await axios.delete(`https://hospital-management-system-backend-zic1.onrender.com/api/medicines/${id}`);
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const batchesFor = (medicineId) =>
    stocks.filter((s) => s.medicine_id === medicineId);

  // const formatBatches = (medicineId) => {
  //   const b = batchesFor(medicineId);
  //   if (!b || b.length === 0) return <span className="text-gray-400">-</span>;


  //   b.sort((a, b2) =>
  //     (a.expiry_date || "").localeCompare(b2.expiry_date || "")
  //   );

  //   return (
  //     <ul className="text-sm space-y-1">
  //       {b.map((x) => (
  //         <li key={x.id} className="flex justify-between">
  //           <span className="mr-2">{x.expiry_date || "No expiry"}</span>
  //           <span className="font-semibold">{x.current_stock}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  const formatBatches = (medicineId) => {
    const b = batchesFor(medicineId);
    if (!b || b.length === 0) return <span className="text-gray-400">-</span>;

    // Fungsi helper untuk memformat tanggal ke Bahasa Indonesia
    const formatIndoDate = (dateString) => {
      if (!dateString) return "Tanpa Eksiprasi";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    };

    b.sort((a, b2) =>
      (a.expiry_date || "").localeCompare(b2.expiry_date || "")
    );

    return (
      <ul className="text-sm space-y-2">
        {b.map((x) => (
          <li key={x.id} className="flex justify-between items-center bg-gray-50 p-1 rounded border border-gray-100">
            <span className="text-gray-700 mr-4">
              {formatIndoDate(x.expiry_date)}
            </span>
            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">
              {x.current_stock} pcs
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const totalStockFor = (medicineId) =>
    batchesFor(medicineId).reduce(
      (sum, x) => sum + (parseInt(x.current_stock, 10) || 0),
      0
    );

  useEffect(() => {

    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medicines</h1>
        <Link
          to="/medicines/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Medicine
        </Link>
      </div>

      {/* Controls: show items on left, search on right */}
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

      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Expiry / Batch (stock)</th>
              <th className="p-3 text-left">Total Stock</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((m) => (
              <tr key={m.id} className="border-t hover:bg-gray-50 align-top">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.category}</td>
                <td className="p-3">{formatBatches(m.id)}</td>
                <td className="p-3 font-medium">{totalStockFor(m.id)}</td>
                {/* <td className="p-3">Rp {m.unit_price}</td> */}
                <td className="p-3">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(m.unit_price)}
                </td>
                <td className="p-3">{m.supplier_name || "-"}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <Link
                    to={`/medicines/${m.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    View
                  </Link>
                  <Link
                    to={`/medicines/edit/${m.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMedicine(m.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {medicines.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Bottom: showing & pagination component */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              {`Showing ${totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
                } to ${Math.min(
                  totalItems,
                  currentPage * itemsPerPage
                )} of ${totalItems} entries`}
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
        </div>
      </div>
    </div>
  );
}
