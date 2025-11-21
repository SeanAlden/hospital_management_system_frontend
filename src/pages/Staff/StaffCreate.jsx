import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function StaffCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", role: "", department_id: "", phone: "", email: "" });
  const [departments, setDepartments] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get("/api/departments").then((res) => setDepartments(res.data)).catch(() => setDepartments([]));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/staff", form);
      setAlert({ type: "success", message: "Staff created!" });
      setTimeout(() => navigate("/staff"), 900);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to create staff" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Staff</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select name="department_id" value={form.department_id} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">-- Select Department --</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Save</button>
        </form>
      </div>
    </div>
  );
}

export default StaffCreate;
