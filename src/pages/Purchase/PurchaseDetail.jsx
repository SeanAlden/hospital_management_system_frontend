// src/pages/purchases/PurchaseDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function PurchaseDetail() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${BASE_URL}/api/purchases/${id}`);
        setPurchase(res.data);
      } catch (err) {
        console.error("Failed to load purchase", err);
        alert("Gagal memuat purchase. Kembali ke list.");
        navigate("/purchases");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!purchase) return <div className="p-6 text-gray-500">Purchase not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Purchase #{purchase.id}</h1>
          <p className="text-sm text-gray-600">Medicine: {purchase.medicine_name || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/purchases/edit/${purchase.id}`} className="px-3 py-2 bg-yellow-500 text-white rounded">Edit</Link>
          <Link to="/purchases" className="px-3 py-2 border rounded">Back</Link>
        </div>
      </div>

      <div className="bg-white rounded shadow p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Supplier</div>
            <div>{purchase.supplier_name || "-"}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Purchased At</div>
            <div>{purchase.purchased_at ? new Date(purchase.purchased_at).toLocaleString() : "-"}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-gray-500">Available</div>
            <div className="font-medium">{purchase.available_qty}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Unit Price</div>
            <div className="font-medium">Rp {purchase.unit_price}</div>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Expiry Date</div>
          <div>{formatIndoDate(purchase.expiry_date) || "-"}</div>
        </div>

        {/* <div>
          <div className="text-xs text-gray-500">Raw Data</div>
          <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">{JSON.stringify(purchase, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  );
}
