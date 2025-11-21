import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function AppointmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    status: "",
    notes: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data appointment
    const fetchData = async () => {
      try {
        const [appointmentRes, patientsRes, doctorsRes] = await Promise.all([
          axios.get(`/api/get_appointment/${id}`),
          axios.get("/api/patients"),
          axios.get("/api/doctors"),
        ]);

        const data = appointmentRes.data[0];
        setForm({
          patient_id: data.patient_id,
          doctor_id: data.doctor_id,
          appointment_date: data.appointment_date.slice(0, 16), // format datetime-local
          status: data.status,
          notes: data.notes || "",
        });
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/edit_appointment/${id}`, form);
      setAlert({ type: "success", message: "Appointment updated successfully!" });
      setTimeout(() => navigate("/appointments"), 1500);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to update appointment!" });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

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
          Edit Appointment
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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition"
          >
            Update Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentEdit;
