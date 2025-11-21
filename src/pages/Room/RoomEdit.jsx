import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function RoomEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ room_number: "", type: "general", status: "available", rate_per_day: "" });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/get_room/${id}`).then(res => setForm(res.data[0]));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`https://hospital-management-system-backend-zic1.onrender.com/api/edit_room/${id}`, form);
      setAlert({ type: "success", message: "Room updated successfully!" });
      setTimeout(() => navigate("/rooms"), 1500);
    } catch(err) {
      setAlert({ type: "error", message: "Failed to update room!" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Edit Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="room_number" value={form.room_number} onChange={handleChange} placeholder="Room Number" className="w-full border p-2 rounded-lg" required />
          <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded-lg">
            <option value="general">General</option>
            <option value="icu">ICU</option>
            <option value="vip">VIP</option>
            <option value="surgery">Surgery</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded-lg">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input type="number" step="0.01" name="rate_per_day" value={form.rate_per_day} onChange={handleChange} placeholder="Rate per Day" className="w-full border p-2 rounded-lg" />
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition">Update</button>
        </form>
      </div>
    </div>
  );
}

export default RoomEdit;
