import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ExitEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ medicine_stock_id: "", quantity: 0, reason: "" });
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [stockRes, exitRes] = await Promise.all([
        axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/medicine_stocks"),
        axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/exits/${id}`)
      ]);
      setStocks(stockRes.data || []);
      setForm({
        medicine_stock_id: exitRes.data.medicine_stock_id,
        quantity: exitRes.data.quantity,
        reason: exitRes.data.reason || ""
      });
    };
    load();
  }, [id]);

  const selectedStock = stocks.find(s => s.id === Number(form.medicine_stock_id));

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "No Expiry";
    return dateStr.split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.medicine_stock_id) return alert("Select batch");
    if (!form.quantity || Number(form.quantity) <= 0) return alert("Quantity > 0");
    // Note: server will validate availability
    await axios.put(`https://hospital-management-system-backend-zic1.onrender.com/api/exits/${id}`, { ...form, quantity: Number(form.quantity) });
    navigate("/exit-stocks");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Edit Exit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="medicine_id" value={form.medicine_id} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select medicine</option>
          {medicines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        
        <div>
          <label className="block text-sm font-medium">Select Batch</label>
          {/* <select value={form.medicine_stock_id} onChange={(e)=>setForm({...form, medicine_stock_id: e.target.value})} className="w-full border p-2 rounded" required>
            <option value="">-- select --</option>
            {stocks.map(s => (
              <option key={s.id} value={s.id}>
                #{s.id} - expiry: {s.expiry_date || "No expiry"} - current: {s.current_stock}
              </option>
            ))}
          </select> */}

          <select
            name="medicine_stock_id"
            value={form.medicine_stock_id}
            onChange={(e) => setForm({ ...form, medicine_stock_id: e.target.value })}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Purchase (optional)</option>
            {stocks
              .filter(p => p.medicine_id === Number(form.medicine_id))
              .map(p => (
                <option key={p.id} value={p.id}>
                  Purchase {p.id} — {formatIndoDate(p.expiry_date)} — {p.available_qty} Items
                </option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity (max depends on batch)</label>
          <input type="number" min="1" max={selectedStock ? selectedStock.current_stock + form.quantity : undefined} value={form.quantity} onChange={(e)=>setForm({...form, quantity: e.target.value})} className="w-full border p-2 rounded" required/>
          <p className="text-xs text-gray-500 mt-1">When updating, server will check availability (old quantity will be reverted before applying new).</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Reason</label>
          <input type="text" value={form.reason} onChange={(e)=>setForm({...form, reason: e.target.value})} className="w-full border p-2 rounded"/>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update Exit</button>
        </div>
      </form>
    </div>
  );
}
