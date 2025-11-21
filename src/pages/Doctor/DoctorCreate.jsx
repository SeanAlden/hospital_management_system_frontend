import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function DoctorCreate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil daftar departemen untuk select dropdown
    axios.get("/api/departments").then((res) => setDepartments(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/add_doctor", form);
      setAlert({ type: "success", message: "✅ Dokter berhasil ditambahkan!" });
      setTimeout(() => navigate("/doctors"), 2000);
    } catch (error) {
      setAlert({
        type: "error",
        message: "❌ Terjadi kesalahan saat menambahkan dokter!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Tambah Dokter
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
              placeholder="Masukkan nama dokter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email dokter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
              Spesialisasi
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              placeholder="Masukkan spesialisasi dokter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-1">
              Departemen
            </label>
            <select
              id="department_id"
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Pilih Departemen</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
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

export default DoctorCreate;
