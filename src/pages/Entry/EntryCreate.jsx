// src/pages/medicines/EntryCreate.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function EntryCreate() {
//   const navigate = useNavigate();
//   const [medicines, setMedicines] = useState([]);
//   const [purchases, setPurchases] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [form, setForm] = useState({
//     medicine_id: "",
//     purchase_id: "",
//     medicine_stock_id: "",
//     expiry_date: "",
//     quantity: 0,
//   });

//   useEffect(() => {
//     axios.get("/api/medicines").then((r) => setMedicines(r.data));
//     axios.get("/api/purchases").then((r) => setPurchases(r.data));
//     axios.get("/api/medicine_stocks").then((r) => setStocks(r.data));
//   }, []);

//   // derive filtered purchases & expiry options after medicine selected
//   const availablePurchases = purchases.filter(
//     (p) => p.medicine_id === Number(form.medicine_id) && p.available_qty > 0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Compose payload:
//     // Option A: if user selected purchase_id -> pass purchase_id and optionally medicine_stock_id (if target exists)
//     // Option B: if no purchase_id but expiry_date -> create new stock (backend handles create)
//     const payload = {
//       purchase_id: form.purchase_id || null,
//       medicine_id: form.medicine_id,
//       medicine_stock_id: form.medicine_stock_id || null,
//       //   expiry_date: form.expiry_date || null,
//       expiry: form.expiry_date || null, // ✅ ubah dari expiry_date -> expiry
//       quantity: parseInt(form.quantity, 10),
//     };
//     console.log("ENTRY payload", payload);
//     await axios.post("/api/entries", payload);
//     navigate("/medicine_stocks");
//   };

//   const maxQtyAvailable = () => {
//     if (form.purchase_id) {
//       const p = purchases.find((x) => x.id === Number(form.purchase_id));
//       return p ? p.available_qty : 0;
//     }
//     return 0;
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
//       <h2 className="text-2xl mb-4">Entry Stock (receive)</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <select
//           value={form.medicine_id}
//           onChange={(e) => setForm({ ...form, medicine_id: e.target.value })}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select medicine</option>
//           {medicines.map((m) => (
//             <option key={m.id} value={m.id}>
//               {m.name}
//             </option>
//           ))}
//         </select>

//         <div>
//           <label className="block text-sm">
//             Choose purchase (use this if entry corresponds to an existing
//             purchase lot)
//           </label>
//           <select
//             value={form.purchase_id}
//             onChange={(e) => setForm({ ...form, purchase_id: e.target.value })}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">-- Select purchase (optional) --</option>
//             {availablePurchases.map((p) => (
//               <option key={p.id} value={p.id}>
//                 #{p.id} - {p.medicine_name} - expiry: {p.expiry_date || "-"} -
//                 available: {p.available_qty}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm">
//             Or select target batch (existing stock) / or set expiry for new
//             batch
//           </label>
//           <select
//             value={form.medicine_stock_id}
//             onChange={(e) =>
//               setForm({ ...form, medicine_stock_id: e.target.value })
//             }
//             className="w-full border p-2 rounded mb-2"
//           >
//             <option value="">-- target existing stock (optional) --</option>
//             {stocks
//               .filter((s) => s.medicine_id === Number(form.medicine_id))
//               .map((s) => (
//                 <option key={s.id} value={s.id}>
//                   Batch #{s.id} - expiry:{s.expiry_date || "-"} - current:
//                   {s.current_stock}
//                 </option>
//               ))}
//           </select>
//           <input
//             type="date"
//             value={form.expiry_date}
//             onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
//             className="w-full border p-2 rounded"
//             placeholder="Expiry date for new batch (if any)"
//           />
//         </div>

//         <div>
//           <label className="block text-sm">
//             Quantity to entry (max: {maxQtyAvailable()})
//           </label>
//           <input
//             type="number"
//             min="1"
//             max={maxQtyAvailable() || undefined}
//             value={form.quantity}
//             onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 border rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Do Entry
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EntryCreate() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    medicine_id: "",
    purchase_id: "",
    quantity: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [medRes, purRes] = await Promise.all([
        axios.get("/api/medicines"),
        axios.get("/api/purchases"),
      ]);
      setMedicines(medRes.data || []);
      setPurchases(purRes.data || []);
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPurchase = purchases.find(
      (p) => p.id === Number(form.purchase_id)
    );

    if (!selectedPurchase) {
      alert("Please select a purchase batch.");
      return;
    }

    const payload = {
      purchase_id: form.purchase_id,
      medicine_id: form.medicine_id,
      expiry: selectedPurchase.expiry_date, // 🔥 pakai expiry dari purchase
      quantity: parseInt(form.quantity, 10),
    };

    console.log("ENTRY payload:", payload);

    await axios.post("/api/entries", payload);
    navigate("/entry-stocks");
  };

  const availablePurchases = purchases.filter(
    (p) =>
      p.medicine_id === Number(form.medicine_id) && (p.available_qty || 0) > 0
  );

  const selectedPurchase = purchases.find(
    (p) => p.id === Number(form.purchase_id)
  );

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Entry Stock</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Pilih Obat */}
        <select
          value={form.medicine_id}
          onChange={(e) =>
            setForm({ ...form, medicine_id: e.target.value, purchase_id: "" })
          }
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select medicine</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Pilih batch purchase (menentukan expiry) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Purchase Batch (will determine expiry)
          </label>
          <select
            value={form.purchase_id}
            onChange={(e) =>
              setForm({ ...form, purchase_id: e.target.value, quantity: 0 })
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select purchase batch --</option>
            {availablePurchases.map((p) => (
              <option key={p.id} value={p.id}>
                #{p.id} — expiry: {p.expiry_date || "No expiry"} — available:{" "}
                {p.available_qty}
              </option>
            ))}
          </select>
        </div>

        {/* Input quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Quantity to entry (max: {selectedPurchase?.available_qty || 0})
          </label>
          <input
            type="number"
            min="1"
            max={selectedPurchase?.available_qty || undefined}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Tombol aksi */}
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}
