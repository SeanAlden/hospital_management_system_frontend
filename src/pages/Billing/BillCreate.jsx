import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

function BillCreate() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    admission_id: "",
    items: [{ description: "", amount: "" }],
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Ambil data pasien dan admissions (untuk pilihan admission jika ada)
    axios.get("/api/patients").then((res) => setPatients(res.data)).catch(()=>{/* ignore */});
    axios.get("/api/admissions").then((res) => setAdmissions(res.data)).catch(()=>{/* ignore */});
  }, []);

  // Hitung total
  const calcTotal = () => {
    return form.items.reduce((sum, it) => {
      const amt = parseFloat(it.amount);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, key, value) => {
    const items = [...form.items];
    items[index][key] = value;
    setForm((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, { description: "", amount: "" }] }));
  };

  const removeItem = (index) => {
    const items = form.items.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, items }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validasi minimal
      if (!form.patient_id) throw new Error("Choose a patient");
      const payload = {
        patient_id: form.patient_id,
        admission_id: form.admission_id || null,
        items: form.items.map(i => ({ description: i.description, amount: parseFloat(i.amount || 0).toFixed(2) }))
      };
      await axios.post("/api/bills", payload);
      setAlert({ type: "success", message: "✅ Bill created successfully" });
      setTimeout(() => navigate("/bills"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to create bill" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create Bill</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient</label>
            <select
              name="patient_id"
              value={form.patient_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1"
              required
            >
              <option value="">-- Select patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email || "-"})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Admission (optional)</label>
            <select
              name="admission_id"
              value={form.admission_id}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1"
            >
              <option value="">-- No admission --</option>
              {admissions.map(a => (
                <option key={a.id} value={a.id}>
                  #{a.id} — {a.patient_name} — {a.room_number || "No room"}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Items</h2>
            <div className="space-y-3">
              {form.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Description"
                    value={it.description}
                    onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                    className="col-span-7 border rounded-md p-2"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={it.amount}
                    onChange={(e) => handleItemChange(idx, "amount", e.target.value)}
                    className="col-span-3 border rounded-md p-2"
                    required
                  />
                  <div className="col-span-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                    {idx === form.items.length - 1 && (
                      <button type="button" onClick={addItem} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-2xl font-bold">Rp{calcTotal()}</div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => navigate("/bills")} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Bill</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillCreate;
