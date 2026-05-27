import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/get_room/${id}`).then(res => setRoom(res.data[0]));
  }, [id]);

  if (!room) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-gray-500 text-lg animate-pulse">Loading...</div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Room Details</h2>
        <ul className="space-y-4 mb-6">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Room Number:</span>
            <span className="text-gray-800">{room.room_number}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Type:</span>
            <span className="text-gray-800">{room.type}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Status:</span>
            <span className="text-gray-800">{room.status}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Rate per Day:</span>
            <span className="text-gray-800">{room.rate_per_day}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <Link to="/rooms" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow">← Back</Link>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
