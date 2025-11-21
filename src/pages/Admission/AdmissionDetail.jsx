import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function AdmissionDetail() {
  const { id } = useParams();
  const [admission, setAdmission] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/admissions/${id}`).then((res) => setAdmission(res.data));
  }, [id]);

  if (!admission) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Admission Details</h1>
        <Link
          to="/admissions"
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Back
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-md p-6 space-y-3">
        <p><strong>ID:</strong> {admission.id}</p>
        <p><strong>Patient:</strong> {admission.patient_name}</p>
        <p><strong>Doctor:</strong> {admission.doctor_name}</p>
        <p><strong>Room:</strong> {admission.room_number || "-"}</p>
        <p><strong>Admitted At:</strong> {new Date(admission.admitted_at).toLocaleString()}</p>
        <p><strong>Discharged At:</strong> {admission.discharged_at ? new Date(admission.discharged_at).toLocaleString() : "-"}</p>
        <p><strong>Reason:</strong> {admission.reason}</p>
      </div>
    </div>
  );
}

export default AdmissionDetail;
