import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function EntryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    medicine_id: "",
    purchase_id: "",
    medicine_stock_id: "",
    quantity: 0,
    entered_by: ""
  });
  const [purchases, setPurchases] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, sRes, mRes, entryRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/purchases`),
          axios.get(`${BASE_URL}/api/medicine_stocks`),
          axios.get(`${BASE_URL}/api/medicines`),
          axios.get(`${BASE_URL}/api/entries/${id}`)
        ]);
        setPurchases(pRes.data || []);
        setStocks(sRes.data || []);
        setMedicines(mRes.data || []);
        const e = entryRes.data;
        setForm({
          medicine_id: e.medicine_id || "",
          purchase_id: e.purchase_id || "",
          medicine_stock_id: e.medicine_stock_id || "",
          quantity: e.quantity || 0,
          entered_by: e.entered_by || ""
        });
      } catch (err) {
        console.error(err);
        alert("Failed load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "No Expiry";
    return dateStr.split('T')[0];
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // Validate: if purchase chosen, ensure available (consider original entry had reduced available)
    try {
      const selectedPurchase = purchases.find(
        (p) => p.id === Number(form.purchase_id)
      );

      // get selected purchase info
      const payload = {
        purchase_id: form.purchase_id || null,
        medicine_stock_id: form.medicine_stock_id,
        quantity: parseInt(form.quantity, 10),
        entered_by: form.entered_by || null
      };
      await axios.put(`${BASE_URL}/api/entries/${id}`, payload);
      alert("Entry updated");
      navigate("/entries");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update entry");
    }
  };

  const selectedPurchase = purchases.find(
    (p) => p.id === Number(form.purchase_id)
  );

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Entry #{id}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="medicine_id" value={form.medicine_id} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select medicine</option>
          {medicines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>

        <div>
          <label className="block text-sm font-medium mb-1">
            Select Purchase Batch (will determine expiry)
          </label>
          {/* <select name="purchase_id" value={form.purchase_id} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Purchase (optional)</option>
            {purchases.filter(p => p.medicine_id === Number(form.medicine_id)).map(p => (
              <option key={p.id} value={p.id}>#{p.id} - avail:{p.available_qty} - expiry:{p.expiry_date || "-"}</option>
            ))}
          </select> */}
          <select
            name="purchase_id"
            value={form.purchase_id}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Purchase (optional)</option>
            {purchases
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
          <label className="block text-sm font-medium mb-1">
            Quantity to entry (max: {selectedPurchase?.available_qty || 0})
          </label>
          <input type="number" name="quantity" min="1"
            max={selectedPurchase?.available_qty || undefined} value={form.quantity} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
