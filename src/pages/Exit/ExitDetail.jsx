import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ExitDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/exits/${id}`).then(res => setItem(res.data));
  }, [id]);

  if (!item) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Exit Detail</h2>
      <ul className="space-y-3">
        <li><strong>ID:</strong> {item.id}</li>
        <li><strong>Medicine:</strong> {item.medicine_name || "-"}</li>
        <li><strong>Expiry (batch):</strong> {item.stock_expiry || "No expiry"}</li>
        <li><strong>Quantity:</strong> {item.quantity}</li>
        <li><strong>Reason:</strong> {item.reason || "-"}</li>
        <li><strong>Exited at:</strong> {item.exited_at ? new Date(item.exited_at).toLocaleString() : "-"}</li>
      </ul>

      <div className="mt-4">
        <Link to="/exit-stocks" className="px-4 py-2 bg-blue-600 text-white rounded">← Back</Link>
      </div>
    </div>
  );
}
