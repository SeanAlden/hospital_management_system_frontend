import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function MedicalRecordCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    record_date: "",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/patients"),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/doctors"),
        ]);
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hospital-management-system-backend-zic1.onrender.com/api/add_medical_record", form);
      setAlert({ type: "success", message: "Medical record added!" });
      setTimeout(() => navigate("/medical_records"), 1500);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to add medical record!" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Medical Record</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="patient_id" value={form.patient_id} onChange={handleChange} className="w-full border p-2 rounded-lg" required>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <select name="doctor_id" value={form.doctor_id} onChange={handleChange} className="w-full border p-2 rounded-lg">
            <option value="">Select Doctor (optional)</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
          </select>

          <textarea name="diagnosis" placeholder="Diagnosis" value={form.diagnosis} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
          <textarea name="treatment" placeholder="Treatment" value={form.treatment} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
          <textarea name="prescription" placeholder="Prescription" value={form.prescription} onChange={handleChange} className="w-full border p-2 rounded-lg" />

          <input type="datetime-local" name="record_date" value={form.record_date} onChange={handleChange} className="w-full border p-2 rounded-lg" />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">Save</button>
        </form>
      </div>
    </div>
  );
}

export default MedicalRecordCreate;
