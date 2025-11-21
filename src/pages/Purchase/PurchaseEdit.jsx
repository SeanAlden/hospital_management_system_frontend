// // src/pages/purchases/PurchaseEdit.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function PurchaseEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     supplier_id: "",
//     medicine_id: "",
//     quantity: 0,
//     available_qty: 0,
//     unit_price: 0,
//     expiry_date: "",
//     purchased_at: ""
//   });
//   const [orig, setOrig] = useState(null); // original purchase for delta calculations
//   const [medicines, setMedicines] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const [medRes, supRes, pRes] = await Promise.all([
//         axios.get("/api/medicines"),
//         axios.get("/api/suppliers"),
//         axios.get(`/api/purchases/${id}`),
//       ]);
//       setMedicines(medRes.data || []);
//       setSuppliers(supRes.data || []);
//       const p = pRes.data;
//       // Normalize date input values
//       setOrig(p);
//       setForm({
//         supplier_id: p.supplier_id || "",
//         medicine_id: p.medicine_id || "",
//         quantity: p.quantity || 0,
//         available_qty: p.available_qty || 0,
//         unit_price: p.unit_price || 0,
//         expiry_date: p.expiry_date ? p.expiry_date : "",
//         purchased_at: p.purchased_at ? p.purchased_at.slice(0, 19) : ""
//       });
//     } catch (err) {
//       console.error("Failed to load data", err);
//       alert("Gagal memuat data. Cek console.");
//     }
//   };

//   // clamp helper
//   const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!orig) return;

//     setSaving(true);
//     try {
//       const newQty = parseInt(form.quantity, 10) || 0;
//       const oldQty = parseInt(orig.quantity, 10) || 0;
//       const oldAvailable = parseInt(orig.available_qty, 10) || 0;

//       // Calculate available_qty adjustment:
//       // available_new = clamp(oldAvailable + (newQty - oldQty), 0, newQty)
//       const delta = newQty - oldQty;
//       const computedAvailable = clamp(oldAvailable + delta, 0, newQty);

//       const payload = {
//         supplier_id: form.supplier_id || null,
//         medicine_id: form.medicine_id,
//         quantity: newQty,
//         available_qty: computedAvailable,
//         unit_price: parseFloat(form.unit_price) || 0,
//         expiry_date: form.expiry_date || null,
//         purchased_at: form.purchased_at || null
//       };

//       // send PUT to backend (assumes route exists)
//       await axios.put(`/api/purchases/${id}`, payload);

//       navigate("/purchases");
//     } catch (err) {
//       console.error("Update failed", err);
//       alert("Gagal memperbarui purchase. Cek console.");
//       setSaving(false);
//     }
//   };

//   if (!orig) {
//     return <div className="p-6 text-gray-500">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Edit Purchase #{id}</h2>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Medicine</label>
//           <select name="medicine_id" value={form.medicine_id} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">Select medicine</option>
//             {medicines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Supplier (optional)</label>
//           <select name="supplier_id" value={form.supplier_id} onChange={handleChange} className="w-full border p-2 rounded">
//             <option value="">Select supplier</option>
//             {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm font-medium mb-1">Quantity (total purchased)</label>
//             <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" className="w-full border p-2 rounded" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Available (computed)</label>
//             <input type="number" name="available_qty" value={form.available_qty} onChange={handleChange} min="0" max={form.quantity} className="w-full border p-2 rounded" />
//             <p className="text-xs text-gray-500 mt-1">Available akan dihitung otomatis pada submit; kamu juga dapat set manual (tidak direkomendasikan).</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm font-medium mb-1">Unit Price</label>
//             <input type="number" step="0.01" name="unit_price" value={form.unit_price} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Expiry Date</label>
//             <input type="date" name="expiry_date" value={form.expiry_date || ""} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Purchased At</label>
//           <input type="datetime-local" name="purchased_at" value={form.purchased_at ? form.purchased_at.slice(0,19) : ""} onChange={handleChange} className="w-full border p-2 rounded" />
//         </div>

//         <div className="flex justify-between">
//           <button type="button" onClick={() => navigate("/purchases")} className="px-4 py-2 border rounded">Cancel</button>
//           <button type="submit" disabled={saving} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
//             {saving ? "Saving..." : "Update Purchase"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PurchaseEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    medicine_id: "",
    supplier_id: "",
    quantity: 0,
    available_qty: 0,
    unit_price: 0,
    expiry_date: "",
    purchased_at: "",
  });

  // Fetch data awal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, supRes, purchaseRes] = await Promise.all([
          axios.get("/api/medicines"),
          axios.get("/api/suppliers"),
          axios.get(`/api/purchases/${id}`),
        ]);
        setMedicines(medRes.data);
        setSuppliers(supRes.data);

        const purchase = purchaseRes.data;
        setForm({
          medicine_id: purchase.medicine_id || "",
          supplier_id: purchase.supplier_id || "",
          quantity: purchase.quantity || 0,
          available_qty: purchase.available_qty || 0,
          unit_price: purchase.unit_price || 0,
          expiry_date: purchase.expiry_date
            ? purchase.expiry_date.split("T")[0]
            : "",
          purchased_at: purchase.purchased_at
            ? purchase.purchased_at.split("T")[0]
            : "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load purchase data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(form.available_qty) > parseInt(form.quantity)) {
      alert("Available quantity cannot exceed total quantity!");
      return;
    }

    try {
      await axios.put(`/api/purchases/${id}`, {
        medicine_id: form.medicine_id,
        supplier_id: form.supplier_id || null,
        quantity: parseInt(form.quantity, 10),
        available_qty: parseInt(form.available_qty, 10),
        unit_price: parseFloat(form.unit_price || 0),
        expiry_date: form.expiry_date || null,
        purchased_at: form.purchased_at || null,
      });
      alert("Purchase updated successfully!");
      navigate("/purchases");
    } catch (err) {
      console.error(err);
      alert("Failed to update purchase.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this purchase?"))
      return;
    try {
      await axios.delete(`/api/purchases/${id}`);
      alert("Purchase deleted successfully.");
      navigate("/purchases");
    } catch (err) {
      console.error(err);
      alert("Failed to delete purchase.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Purchase</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <select
          name="medicine_id"
          required
          value={form.medicine_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select medicine</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select
          name="supplier_id"
          value={form.supplier_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select supplier (optional)</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          required
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Quantity"
        />

        <input
          type="number"
          name="available_qty"
          value={form.available_qty}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Available quantity"
        />

        <input
          type="number"
          step="0.01"
          name="unit_price"
          value={form.unit_price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Unit price"
        />

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="purchased_at"
          value={form.purchased_at}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
