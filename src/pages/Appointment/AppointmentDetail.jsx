import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/get_appointment/${id}`).then((res) => setAppointment(res.data[0]));
  }, [id]);

  if (!appointment)
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Appointment Detail
        </h2>

        <ul className="space-y-3 mb-6">
          <li className="flex justify-between"><span className="font-medium">Patient:</span> {appointment.patient_name}</li>
          <li className="flex justify-between"><span className="font-medium">Doctor:</span> {appointment.doctor_name}</li>
          <li className="flex justify-between"><span className="font-medium">Date:</span> {new Date(appointment.appointment_date).toLocaleString()}</li>
          <li className="flex justify-between"><span className="font-medium">Status:</span> {appointment.status}</li>
          <li><span className="font-medium">Notes:</span><p className="text-gray-700">{appointment.notes || "-"}</p></li>
        </ul>

        <div className="flex justify-center">
          <Link
            to="/appointments"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail;
