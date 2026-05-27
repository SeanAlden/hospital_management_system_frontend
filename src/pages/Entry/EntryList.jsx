// src/pages/entries/EntryList.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../config/api";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  // const navigate = useNavigate();

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return entries;
    const q = search.toLowerCase();
    return entries.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [entries, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/entries`);
      setEntries(res.data || []);
    } catch (err) {
      console.error(err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const doDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/entries/${deleteId}`);
      setEntries((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
    }
  };

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Entries (Stock In)</h1>
        <div className="flex gap-2">
          <Link
            to="/entry-stocks/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + New Entry
          </Link>
        </div>
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

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Medicine</th>
              <th className="px-3 py-2">Purchase</th>
              <th className="px-3 py-2">Batch Expiry</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Entered At</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No entries
                </td>
              </tr>
            ) : (
              paginated.map((e) => (
                <tr key={e.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{e.id}</td>
                  <td className="px-3 py-2">{e.medicine_name || "-"}</td>
                  <td className="px-3 py-2">
                    {e.purchase_id ? `#${e.purchase_id}` : "-"}
                  </td>
                  <td className="px-3 py-2">{formatIndoDate(e.stock_expiry) || "-"}</td>
                  <td className="px-3 py-2">{e.quantity}</td>
                  <td className="px-3 py-2">
                    {e.entered_at
                      ? new Date(e.entered_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/entry-stocks/edit/${e.id}`}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(e.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow w-80 text-center">
            <h3 className="text-lg font-semibold mb-2">Confirm delete</h3>
            <p className="text-sm text-gray-600 mb-4">
              Delete entry #{deleteId}? This will revert stock & purchase
              available.
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
