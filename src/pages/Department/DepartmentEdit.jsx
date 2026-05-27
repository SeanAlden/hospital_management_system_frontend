import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { BASE_URL } from "../../config/api";

function DepartmentEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/get_department/${id}`).then((res) => {
      setForm(res.data[0]);
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/edit_department/${id}`, form);
      setAlert({ type: "success", message: "✅ Departemen berhasil diperbarui!" });
      setTimeout(() => navigate("/departments"), 2000);
    } catch (error) {
      setAlert({ type: "error", message: "❌ Terjadi kesalahan saat memperbarui departemen!" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Departemen
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition-all duration-150"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default DepartmentEdit;
