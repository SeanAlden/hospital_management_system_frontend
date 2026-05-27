import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../config/api";

function BillList() {
  const [bills, setBills] = useState([]);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return bills;
    const q = search.toLowerCase();
    return bills.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [bills, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/bills`).then((res) => setBills(res.data));
  }, []);

  const deleteBill = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${BASE_URL}/api/bills/${id}`);
      setBills(bills.filter((b) => b.id !== id));
    }
  };

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Billing Management</h1>
        <Link
          to="/bills/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Bill
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
              setCurrentPage(1); // reset to first page
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

      <table className="min-w-full bg-white border rounded-md shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Patient</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Issued</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3 border">{b.id}</td>
              <td className="p-3 border">{b.patient_name}</td>
              <td className="p-3 border">Rp{b.total_amount}</td>
              <td className="p-3 border capitalize">{b.status}</td>
              <td className="p-3 border">
                {new Date(b.issued_at).toLocaleString()}
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  to={`/bills/${b.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  View
                </Link>
                <Link
                  to={`/bills/edit/${b.id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBill(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {bills.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No bills found.
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
  );
}

export default BillList;
