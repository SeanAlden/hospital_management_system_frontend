import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/get_department/${id}`).then((res) => {
      setDepartment(res.data[0]);
    });
  }, [id]);

  if (!department)
    return <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Detail Departemen</h2>

        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Nama:</span>
            <span className="text-gray-800">{department.name}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Deskripsi:</span>
            <span className="text-gray-800">{department.description}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <Link to="/departments" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow">
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetail;
