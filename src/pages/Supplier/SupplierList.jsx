import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { BASE_URL } from "../../config/api";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination & search state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter data by search (searching in all fields)
  const filtered = useMemo(() => {
    if (!search) return suppliers;
    const q = search.toLowerCase();
    return suppliers.filter((d) =>
      Object.values(d || {})
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [suppliers, search]);

  // pagination slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/suppliers`);
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Yakin ingin menghapus supplier ini?")) return;
    await axios.delete(`${BASE_URL}/api/suppliers/${id}`);
    fetchSuppliers();
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    // if current page exceeds total pages after filtering or itemsPerPage change, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Supplier</h1>
      <a
        href="/suppliers/add"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-3 inline-block"
      >
        + Tambah Supplier
      </a>

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

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3 border">Nama</th>
            <th className="py-2 px-3 border">Kontak</th>
            <th className="py-2 px-3 border">Telepon</th>
            <th className="py-2 px-3 border">Email</th>
            <th className="py-2 px-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2">{s.name}</td>
              <td className="px-3 py-2">{s.contact_person}</td>
              <td className="px-3 py-2">{s.phone}</td>
              <td className="px-3 py-2">{s.email}</td>
              <td className="px-3 py-2">
                <a
                  href={`/suppliers/edit/${s.id}`}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteSupplier(s.id)}
                  className="text-red-600"
                >
                  Hapus
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
