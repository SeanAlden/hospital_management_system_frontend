import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function MedicalRecordDetail() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/get_medical_record/${id}`).then(res => setRecord(res.data[0]));
  }, [id]);

  if (!record) return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Medical Record Detail</h2>

        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Patient:</span> <span className="text-gray-800">{record.patient_name}</span></li>
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Doctor:</span> <span className="text-gray-800">{record.doctor_name || "-"}</span></li>
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Diagnosis:</span> <span className="text-gray-800">{record.diagnosis}</span></li>
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Treatment:</span> <span className="text-gray-800">{record.treatment}</span></li>
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Prescription:</span> <span className="text-gray-800">{record.prescription || "-"}</span></li>
          <li className="flex justify-between border-b pb-2"><span className="font-medium text-gray-600">Date:</span> <span className="text-gray-800">{new Date(record.record_date).toLocaleString()}</span></li>
        </ul>

        <div className="flex justify-center">
          <Link to="/medical_records" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow">← Back</Link>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecordDetail;
