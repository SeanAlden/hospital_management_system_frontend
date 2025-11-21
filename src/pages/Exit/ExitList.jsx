import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function ExitList() {
  const [exits, setExits] = useState([]);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return exits;
    const q = search.toLowerCase();
    return exits.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [exits, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/exits").then((res) => setExits(res.data));
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Delete this exit record and restore stock?")) return;
    await axios.delete(`https://hospital-management-system-backend-zic1.onrender.com/api/exits/${id}`);
    setExits(exits.filter((x) => x.id !== id));
  };

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Exits</h1>
        <Link
          to="/exit-stocks/create"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          + New Exit
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

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Medicine</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Exited At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((e) => (
              <tr key={e.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{e.id}</td>
                <td className="p-3">{e.medicine_name || "-"}</td>
                <td className="p-3">
                  {e.stock_expiry ||
                    (e.stock_expiry === null ? "No expiry" : "-")}
                </td>
                <td className="p-3 font-medium">{e.quantity}</td>
                <td className="p-3">{e.reason || "-"}</td>
                <td className="p-3">
                  {e.exited_at ? new Date(e.exited_at).toLocaleString() : "-"}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <Link
                    to={`/exit-stocks/${e.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    View
                  </Link>
                  <Link
                    to={`/exit-stocks/edit/${e.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {exits.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No exits recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Bottom: showing & pagination component */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            {`Showing ${
              totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
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
