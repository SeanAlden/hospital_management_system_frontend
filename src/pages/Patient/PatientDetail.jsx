// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";

// function Read() {
//   const { id } = useParams();
//   const [patient, setPatient] = useState(null);

//   useEffect(() => {
//     axios.get(`/get_patient/${id}`).then((res) => {
//       setPatient(res.data[0]);
//     });
//   }, [id]);

//   if (!patient)
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="text-muted fs-5">Loading...</div>
//       </div>
//     );

//   return (
//     <div className="container my-5">
//       <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
//         <div className="card-body">
//           <h2 className="h4 mb-4 text-secondary text-center">Detail Pasien</h2>

//           <ul className="list-group mb-4">
//             <li className="list-group-item">
//               <strong>Nama:</strong> {patient.name}
//             </li>
//             <li className="list-group-item">
//               <strong>Email:</strong> {patient.email}
//             </li>
//             <li className="list-group-item">
//               <strong>Usia:</strong> {patient.age}
//             </li>
//             <li className="list-group-item">
//               <strong>Gender:</strong> {patient.gender}
//             </li>
//           </ul>

//           <div className="d-flex justify-content-center">
//             <Link to="/" className="btn btn-primary px-4 fw-semibold">
//               Kembali
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Read;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/get_patient/${id}`).then((res) => {
      setPatient(res.data[0]);
    });
  }, [id]);

  if (!patient)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Detail Pasien
        </h2>

        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Nama:</span>
            <span className="text-gray-800">{patient.name}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{patient.email}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Usia:</span>
            <span className="text-gray-800">{patient.age}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-800">{patient.gender}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <Link
            to="/patients"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow"
          >
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;
