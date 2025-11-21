// src/pages/medicines/PurchaseCreate.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PurchaseCreate() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    medicine_id: "",
    supplier_id: "",
    quantity: 0,
    unit_price: 0,
    expiry_date: "",
  });

  useEffect(() => {
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/medicines").then((res) => setMedicines(res.data));
    axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/suppliers").then((res) => setSuppliers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/purchases", {
      medicine_id: form.medicine_id,
      supplier_id: form.supplier_id || null,
      quantity: parseInt(form.quantity, 10),
      unit_price: parseFloat(form.unit_price || 0),
      expiry_date: form.expiry_date || null,
    });
    navigate("/purchases");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Purchase</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Label: Select Medicine */}
        <label className="block font-medium">Select Medicine</label>
        <select
          required
          value={form.medicine_id}
          onChange={(e) => setForm({ ...form, medicine_id: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select medicine</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Label: Select Supplier */}
        <label className="block font-medium">Select Supplier</label>
        <select
          value={form.supplier_id}
          onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select supplier (optional)</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Label: Quantity */}
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          required
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Quantity"
        />

        {/* Label: Price */}
        <label className="block font-medium">Unit Price</label>
        <input
          type="number"
          step="0.01"
          value={form.unit_price}
          onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Unit price"
        />

        {/* Label: Expired Date */}
        <label className="block font-medium">Expired Date</label>
        <input
          type="date"
          value={form.expiry_date}
          onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Purchase
          </button>
        </div>
      </form>
    </div>
  );
}
