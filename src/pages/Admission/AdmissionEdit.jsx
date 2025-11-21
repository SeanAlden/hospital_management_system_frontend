import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AdmissionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    room_id: "",
    admitted_at: "",
    discharged_at: "",
    reason: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`/api/admissions/${id}`).then((res) => setForm(res.data));
    axios.get("/api/patients").then((res) => setPatients(res.data));
    axios.get("/api/doctors").then((res) => setDoctors(res.data));
    axios.get("/api/rooms").then((res) => setRooms(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await axios.put(`/api/admissions/${id}`, form);
  //     navigate("/admissions");
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      discharged_at: form.discharged_at || null,
      room_id: form.room_id || null,
      doctor_id: form.doctor_id || null,
    };
    await axios.put(`/api/admissions/${id}`, payload);
    navigate("/admissions");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Admission</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Patient</label>
          <select
            name="patient_id"
            className="w-full border p-2 rounded-md"
            value={form.patient_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Doctor</label>
          <select
            name="doctor_id"
            className="w-full border p-2 rounded-md"
            value={form.doctor_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Room</label>
          <select
            name="room_id"
            className="w-full border p-2 rounded-md"
            value={form.room_id}
            onChange={handleChange}
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.room_number} ({r.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Admitted At</label>
          <input
            type="datetime-local"
            name="admitted_at"
            className="w-full border p-2 rounded-md"
            value={form.admitted_at ? form.admitted_at.slice(0, 16) : ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discharged At</label>
          <input
            type="datetime-local"
            name="discharged_at"
            className="w-full border p-2 rounded-md"
            value={form.discharged_at ? form.discharged_at.slice(0, 16) : ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Reason</label>
          <textarea
            name="reason"
            className="w-full border p-2 rounded-md"
            rows="3"
            value={form.reason}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default AdmissionEdit;
