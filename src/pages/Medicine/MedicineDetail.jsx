// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// export default function MedicineDetail() {
//   const { id } = useParams();
//   const [medicine, setMedicine] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/medicines/${id}`).then((res) => setMedicine(res.data));
//   }, [id]);

//   if (!medicine)
//     return <p className="p-6 text-gray-500">Loading medicine details...</p>;

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>
//       <p><strong>Category:</strong> {medicine.category || "-"}</p>
//       <p><strong>Stock:</strong> {medicine.stock}</p>
//       <p><strong>Price:</strong> Rp {medicine.unit_price}</p>
//       <p><strong>Supplier:</strong> {medicine.supplier_name || "-"}</p>
//       <div className="mt-6">
//         <Link
//           to="/medicines"
//           className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//         >
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// export default function MedicineDetail() {
//   const { id } = useParams();
//   const [medicine, setMedicine] = useState(null);
//   const [stocks, setStocks] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const medRes = await axios.get(`/api/medicines/${id}`);
//       const stockRes = await axios.get(`/api/medicine_stocks?medicine_id=${id}`);
//       setMedicine(medRes.data);
//       setStocks(stockRes.data || []);
//     };
//     fetchData();
//   }, [id]);

//   if (!medicine)
//     return <p className="p-6 text-gray-500">Loading medicine details...</p>;

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>
//       <p><strong>Category:</strong> {medicine.category || "-"}</p>
//       <p><strong>Price:</strong> Rp {medicine.unit_price}</p>
//       <p><strong>Supplier:</strong> {medicine.supplier_name || "-"}</p>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-2">Stock per Batch</h2>
//         {stocks.length ? (
//           <table className="w-full border border-gray-300 rounded-md">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-2 py-1 text-left">Expiry Date</th>
//                 <th className="border px-2 py-1 text-left">Current Stock</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stocks.map((s) => (
//                 <tr key={s.id}>
//                   <td className="border px-2 py-1">{s.expiry_date || "-"}</td>
//                   <td className="border px-2 py-1">{s.current_stock}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No stock available</p>
//         )}
//       </div>

//       <div className="mt-6">
//         <Link
//           to="/medicines"
//           className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//         >
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data medicine
        const medRes = await axios.get(`/api/medicines/${id}`);
        setMedicine(medRes.data);

        // fetch stock terkait medicine ini saja
        const stockRes = await axios.get(`/api/medicine_stocks?medicine_id=${id}`);
        setStocks(stockRes.data || []);
      } catch (err) {
        console.error("Error fetching medicine details:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!medicine)
    return <p className="p-6 text-gray-500">Loading medicine details...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>
      <p><strong>Category:</strong> {medicine.category || "-"}</p>
      <p><strong>Price:</strong> Rp {medicine.unit_price}</p>
      <p><strong>Supplier:</strong> {medicine.supplier_name || "-"}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Stock per Batch</h2>
        {stocks.length ? (
          <table className="w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Expiry Date</th>
                <th className="border px-2 py-1 text-left">Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr key={s.id}>
                  <td className="border px-2 py-1">
                    {s.expiry_date ? new Date(s.expiry_date).toLocaleDateString() : "-"}
                  </td>
                  <td className="border px-2 py-1">{s.current_stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No stock available</p>
        )}
      </div>

      <div className="mt-6">
        <Link
          to="/medicines"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
