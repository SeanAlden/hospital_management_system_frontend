import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";

function BillEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [form, setForm] = useState({ patient_id: "", admission_id: "", status: "unpaid", items: [] });
  const [alert, setAlert] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [billRes, admissionsRes, patientsRes] = await Promise.all([
          axios.get(`https://hospital-management-system-backend-zic1.onrender.com/api/bills/${id}`),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/admissions"),
          axios.get("https://hospital-management-system-backend-zic1.onrender.com/api/patients"),
        ]);
        const data = billRes.data;
        setBill(data);
        setForm({
          patient_id: data.patient_id,
          admission_id: data.admission_id || "",
          status: data.status,
          items: (data.items || []).map(i => ({ id: i.id, description: i.description, amount: parseFloat(i.amount).toFixed(2) })),
        });
        setAdmissions(admissionsRes.data);
        setPatients(patientsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const calcTotal = () => {
    return form.items.reduce((s, it) => s + (isNaN(parseFloat(it.amount)) ? 0 : parseFloat(it.amount)), 0).toFixed(2);
  };

  const handleItemChange = (index, key, value) => {
    const items = [...form.items];
    items[index][key] = value;
    setForm(prev => ({ ...prev, items }));
  };

  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, { description: "", amount: "" }] }));
  const removeItem = (index) => {
    const items = form.items.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, items }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        status: form.status,
        items: form.items.map(i => ({ description: i.description, amount: parseFloat(i.amount || 0).toFixed(2) }))
      };
      await axios.put(`https://hospital-management-system-backend-zic1.onrender.com/api/bills/${id}`, payload);
      setAlert({ type: "success", message: "✅ Bill updated" });
      setTimeout(() => navigate("/bills"), 1000);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update bill" });
    }
  };

  if (!bill) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Bill #{bill.id}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Patient</label>
            <select value={form.patient_id} onChange={(e)=>setForm(prev=>({...prev, patient_id: e.target.value}))} className="w-full border rounded-md p-2">
              <option value="">-- Choose patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Admission (optional)</label>
            <select value={form.admission_id} onChange={(e)=>setForm(prev=>({...prev, admission_id: e.target.value}))} className="w-full border rounded-md p-2">
              <option value="">-- No admission --</option>
              {admissions.map(a => <option key={a.id} value={a.id}>#{a.id} — {a.patient_name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select value={form.status} onChange={(e)=>setForm(prev=>({...prev, status: e.target.value}))} className="w-full border rounded-md p-2">
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Items</h2>
            <div className="space-y-3">
              {form.items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input type="text" value={it.description} onChange={(e)=>handleItemChange(idx, "description", e.target.value)} placeholder="Description" className="col-span-7 border rounded-md p-2" required />
                  <input type="number" step="0.01" value={it.amount} onChange={(e)=>handleItemChange(idx, "amount", e.target.value)} placeholder="Amount" className="col-span-3 border rounded-md p-2" required />
                  <div className="col-span-2 flex gap-2">
                    <button type="button" onClick={()=>removeItem(idx)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">Remove</button>
                    {idx === form.items.length - 1 && <button type="button" onClick={addItem} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">+ Add</button>}
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
              <button type="button" onClick={()=>navigate("/bills")} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-md">Update Bill</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillEdit;
