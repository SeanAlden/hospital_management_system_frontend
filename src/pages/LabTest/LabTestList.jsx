import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function LabTestList() {
  const [labTests, setLabTests] = useState([]);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return labTests;
    const q = search.toLowerCase();
    return labTests.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [labTests, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    axios.get("/api/labtests").then((res) => setLabTests(res.data));
  }, []);

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Lab Test Management</h2>
        <Link
          to="/labtests/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Lab Test
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

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Doctor</th>
            <th className="px-4 py-2">Test Name</th>
            <th className="px-4 py-2">Test Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{t.id}</td>
              <td className="px-4 py-2">{t.patient_name}</td>
              <td className="px-4 py-2">{t.doctor_name || "-"}</td>
              <td className="px-4 py-2">{t.test_name}</td>
              <td className="px-4 py-2">
                {new Date(t.test_date).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/labtests/edit/${t.id}`}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </Link>
                <Link
                  to={`/labtests/detail/${t.id}`}
                  className="text-green-600 hover:underline mr-3"
                >
                  Detail
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      axios.delete(`/api/labtests/${t.id}`).then(() => {
                        setLabTests((prev) =>
                          prev.filter((x) => x.id !== t.id)
                        );
                      });
                    }
                  }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default LabTestList;
