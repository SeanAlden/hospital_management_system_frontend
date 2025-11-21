import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`/api/get_doctor/${id}`).then((res) => setDoctor(res.data[0]));
  }, [id]);

  if (!doctor)
    return <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Detail Dokter</h2>

        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Nama:</span>
            <span className="text-gray-800">{doctor.name}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{doctor.email}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Phone:</span>
            <span className="text-gray-800">{doctor.phone}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Spesialisasi:</span>
            <span className="text-gray-800">{doctor.specialization}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Departemen:</span>
            <span className="text-gray-800">{doctor.department_id || "-"}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <Link to="/doctors" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow">
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
