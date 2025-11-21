import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function AppointmentCreate() {
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    status: "scheduled",
    notes: "",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/patients").then((res) => setPatients(res.data));
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://hospital-management-system-backend-zic1.onrender.com/api/add_appointment", form);
    setAlert({ type: "success", message: "Appointment created successfully!" });
    setTimeout(() => navigate("/appointments"), 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          New Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.specialization}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentCreate;
