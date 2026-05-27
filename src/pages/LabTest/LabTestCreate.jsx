import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

function LabTestCreate() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    test_name: "",
    test_date: "",
    result: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/patients`).then((res) => setPatients(res.data));
    axios.get(`${BASE_URL}/api/doctors`).then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/labtests`, form).then(() => navigate("/labtests"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Lab Test</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Patient</label>
          <select
            name="patient_id"
            value={form.patient_id}
            onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
            className="border w-full p-2 rounded"
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
          <label className="block mb-1">Doctor</label>
          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
            className="border w-full p-2 rounded"
          >
            <option value="">Select Doctor (optional)</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Test Name</label>
          <input
            type="text"
            value={form.test_name}
            onChange={(e) => setForm({ ...form, test_name: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Test Date</label>
          <input
            type="datetime-local"
            value={form.test_date}
            onChange={(e) => setForm({ ...form, test_date: e.target.value })}
            className="border w-full p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Result</label>
          <textarea
            value={form.result}
            onChange={(e) => setForm({ ...form, result: e.target.value })}
            className="border w-full p-2 rounded"
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
}

export default LabTestCreate;
