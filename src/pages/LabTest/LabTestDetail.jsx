import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function LabTestDetail() {
  const { id } = useParams();
  const [labTest, setLabTest] = useState(null);

  useEffect(() => {
    axios.get(`/api/labtests/${id}`).then((res) => setLabTest(res.data));
  }, [id]);

  if (!labTest) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Lab Test Detail</h2>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Patient:</span> {labTest.patient_name}
        </div>
        <div>
          <span className="font-semibold">Doctor:</span> {labTest.doctor_name || "-"}
        </div>
        <div>
          <span className="font-semibold">Test Name:</span> {labTest.test_name}
        </div>
        <div>
          <span className="font-semibold">Test Date:</span>{" "}
          {new Date(labTest.test_date).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Result:</span>
          <div className="whitespace-pre-line border p-2 rounded mt-1 bg-gray-50">
            {labTest.result || "-"}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Link
          to={`/labtests/edit/${labTest.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </Link>
        <Link
          to="/labtests"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default LabTestDetail;
