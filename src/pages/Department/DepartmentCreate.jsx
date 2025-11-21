import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function DepartmentCreate() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/add_department", form);
      setAlert({ type: "success", message: "✅ Departemen berhasil ditambahkan!" });
      setTimeout(() => navigate("/departments"), 2000);
    } catch (error) {
      setAlert({ type: "error", message: "❌ Terjadi kesalahan saat menambahkan departemen!" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Tambah Departemen
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama departemen"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi departemen"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-150"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default DepartmentCreate;
