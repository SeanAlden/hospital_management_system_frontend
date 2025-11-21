import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function MedicalRecordEdit() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordRes, patientsRes, doctorsRes] = await Promise.all([
          axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/get_medical_record/${id}`),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/patients"),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/doctors"),
        ]);
        const data = recordRes.data[0];
        setForm({
          patient_id: data.patient_id,
          doctor_id: data.doctor_id || "",
          diagnosis: data.diagnosis,
          treatment: data.treatment,
          prescription: data.prescription,
          record_date: data.record_date.slice(0,16),
        });
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        setLoading(false);
      } catch(err) { console.error(err); }
    };
    fetchData();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`https://hospital-management-system-backend-zic1.onrender.com/api/edit_medical_record/${id}`, form);
      setAlert({ type: "success", message: "Medical record updated!" });
      setTimeout(() => navigate("/medical_records"), 1500);
    } catch(err) {
      setAlert({ type: "error", message: "Failed to update medical record!" });
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Edit Medical Record</h2>

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

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition">Update</button>
        </form>
      </div>
    </div>
  );
}

export default MedicalRecordEdit;
