import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExitCreate() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]); // stocks include medicine info
  const [form, setForm] = useState({
    medicine_stock_id: "",
    quantity: 0,
    reason: "",
  });

  useEffect(() => {
    const load = async () => {
      // we'll get medicine_stocks and medicines to show label
      const [stocksRes, medsRes] = await Promise.all([
        axios.get("/api/medicine_stocks"),
        axios.get("/api/medicines"),
      ]);
      // Build quick map of medicine names
      const meds = (medsRes.data || []).reduce((acc, m) => {
        acc[m.id] = m;
        return acc;
      }, {});
      // attach medicine name to stock entries
      const enriched = (stocksRes.data || []).map((s) => ({
        ...s,
        medicine_name: meds[s.medicine_id]
          ? meds[s.medicine_id].name
          : "Unknown",
      }));
      setStocks(enriched);
    };
    load();
  }, []);

  const selectedStock = stocks.find(
    (s) => s.id === Number(form.medicine_stock_id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.medicine_stock_id) return alert("Select stock batch");
    if (!form.quantity || Number(form.quantity) <= 0)
      return alert("Enter quantity > 0");
    if (
      selectedStock &&
      Number(form.quantity) > Number(selectedStock.current_stock)
    )
      return alert("Quantity exceeds available stock");

    const payload = {
      medicine_stock_id: form.medicine_stock_id,
      quantity: parseInt(form.quantity, 10),
      reason: form.reason || null,
    };

    await axios.post("/api/exits", payload);
    navigate("/exit-stocks");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Record Stock Exit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Select Batch (medicine - expiry - current)
          </label>
          <select
            // value={form.medicine_stock_id} onChange={(e) =>
            // setForm({...form, medicine_stock_id: e.target.value, quantity: 0})}
            value={form.medicine_stock_id}
            onChange={(e) =>
              setForm({
                ...form,
                medicine_stock_id: Number(e.target.value),
                quantity: 0,
              })
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select batch --</option>
            {stocks.map((s) => (
              <option key={s.id} value={s.id}>
                {s.medicine_name} — expiry: {s.expiry_date || "No expiry"} —
                current: {s.current_stock}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Quantity (max: {selectedStock ? selectedStock.current_stock : 0})
          </label>
          <input
            type="number"
            min="1"
            max={selectedStock ? selectedStock.current_stock : undefined}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reason (optional)</label>
          <input
            type="text"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="e.g. damaged, expired, return to supplier"
          />
        </div>

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
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Record Exit
          </button>
        </div>
      </form>
    </div>
  );
}
