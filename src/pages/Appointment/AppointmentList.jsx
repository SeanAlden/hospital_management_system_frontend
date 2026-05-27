import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../config/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/api/appointments`).then((res) => setAppointments(res.data));
  }, []);

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return appointments;
    const q = search.toLowerCase();
    return appointments.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [appointments, search]);

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
    await axios.delete(`${BASE_URL}/api/delete_appointment/${selectedId}`);
    setAppointments(appointments.filter((a) => a.id !== selectedId));
    closeModal();
  };

  return (
    <div className="max-w-8xl mx-auto my-1 px-4">
      {/* <div className="bg-white shadow-lg rounded-2xl border border-gray-100"> */}
      <div className="flex justify-between items-center border-b p-5">
        <h2 className="text-2xl font-bold text-gray-700">Appointments</h2>
        <Link
          to="/appointments/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
        >
          + New Appointment
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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center bg-white">
          <thead className="bg-blue-500 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-white">ID</th>
              <th className="py-3 px-4 text-white">Patient</th>
              <th className="py-3 px-4 text-white">Doctor</th>
              <th className="py-3 px-4 text-white">Date</th>
              <th className="py-3 px-4 text-white">Status</th>
              <th className="py-3 px-4 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{a.id}</td>
                <td className="py-3 px-4 font-medium">{a.patient_name}</td>
                <td className="py-3 px-4">{a.doctor_name}</td>
                <td className="py-3 px-4">
                  {new Date(a.appointment_date).toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 font-medium ${a.status === "completed"
                      ? "text-green-600"
                      : a.status === "cancelled"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}
                >
                  {a.status}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/appointments/${a.id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                    >
                      View
                    </Link>
                    <Link
                      to={`/appointments/edit/${a.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => openModal(a.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-gray-400 italic">
                  No appointments yet.
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
        {/* </div> */}
      </div>

      {/* Modal Delete */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-2xl text-center">
            <h3 className="text-lg font-semibold mb-3">Delete Appointment?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this appointment?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
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

export default AppointmentList;
