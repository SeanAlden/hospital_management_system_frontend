import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios.get(`/api/staff/${id}`).then((res) => setStaff(res.data)).catch(() => {});
  }, [id]);

  if (!staff) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Staff Detail</h2>

        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{staff.name}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Role:</span>
            <span className="text-gray-800">{staff.role || "-"}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Department:</span>
            <span className="text-gray-800">{staff.department_name || "-"}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Phone:</span>
            <span className="text-gray-800">{staff.phone || "-"}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{staff.email || "-"}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <Link to="/staff" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium">← Back</Link>
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
