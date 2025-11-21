import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/departments").then((res) => setDepartments(res.data));
  }, []);

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return departments;
    const q = search.toLowerCase();
    return departments.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [departments, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
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
      await axios.delete(`https://hospital-management-system-backend-zic1.onrender.com/api/delete_department/${selectedId}`);
      setDepartments(departments.filter((d) => d.id !== selectedId));
      closeModal();
    }
  };

  return (
    <div className="max-w-8xl mx-auto my-1 px-4">
      {/* <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"> */}
        {/* Header */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-6"> */}
        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 sm:mb-0">
            Daftar Departemen
          </h2>
          <Link
            to="/departments/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 shadow"
          >
            + Tambah Departemen
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

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-blue-500 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3 px-4 text-white">ID</th>
                <th className="py-3 px-4 text-white">Nama</th>
                <th className="py-3 px-4 text-white">Deskripsi</th>
                <th className="py-3 px-4 text-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((d) => (
                <tr
                  key={d.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{d.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {d.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{d.description}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/departments/${d.id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/departments/edit/${d.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(d.id)}
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
                  <td
                    colSpan="4"
                    className="py-6 text-gray-400 italic text-center"
                  >
                    Tidak ada data departemen.
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
        {/* </div> */}
      </div>

      {/* Modal Konfirmasi Delete */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-80 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Are you sure you want to delete this department?
            </p>
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

export default DepartmentList;
