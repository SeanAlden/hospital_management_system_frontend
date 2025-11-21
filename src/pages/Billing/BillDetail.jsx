import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function BillDetail() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    axios.get(`/api/bills/${id}`).then((res) => {
      setBill(res.data);
    }).catch(err => console.error(err));
  }, [id]);

  if (!bill) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  const total = (bill.items || []).reduce((s, it) => s + (isNaN(parseFloat(it.amount)) ? 0 : parseFloat(it.amount)), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bill #{bill.id}</h1>
            <p className="text-sm text-gray-600">Patient: {bill.patient_name}</p>
            {bill.admission_id && <p className="text-sm text-gray-600">Admission: #{bill.admission_id}</p>}
            <p className="text-sm text-gray-600">Issued: {new Date(bill.issued_at).toLocaleString()}</p>
            <p className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${bill.status === "paid" ? "bg-green-100 text-green-800" : bill.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{bill.status}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/bills/edit/${bill.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Edit</Link>
            <Link to="/bills" className="px-4 py-2 border rounded-md">Back</Link>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(bill.items || []).map((it, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{i+1}</td>
                  <td className="p-3">{it.description}</td>
                  <td className="p-3 text-right">Rp{parseFloat(it.amount).toFixed(2)}</td>
                </tr>
              ))}
              {(!bill.items || bill.items.length === 0) && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">No items.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="2" className="p-3 font-semibold text-right">Total</td>
                <td className="p-3 text-right font-bold">Rp{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillDetail;
