import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function MedicineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    // stock: 0,
    unit_price: 0,
    supplier_id: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data obat dan supplier
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicineRes, supplierRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/medicines/${id}`),
          axios.get(`${BASE_URL}/api/suppliers`),
        ]);
        setForm({
          name: medicineRes.data.name,
          category: medicineRes.data.category || "",
          // stock: medicineRes.data.stock || 0,
          unit_price: medicineRes.data.unit_price || 0,
          supplier_id: medicineRes.data.supplier_id || "",
        });
        setSuppliers(supplierRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${BASE_URL}/api/medicines/${id}`, form);
    navigate("/medicines");
  };

  if (loading)
    return <p className="p-6 text-gray-500">Loading medicine data...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Medicine</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded-md"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label className="block font-medium">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 rounded-md"
          value={form.category}
          onChange={handleChange}
        />
        {/* <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full border p-2 rounded-md"
          value={form.stock}
          onChange={handleChange}
        /> */}
        <label className="block font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          name="unit_price"
          placeholder="Unit Price"
          className="w-full border p-2 rounded-md"
          value={form.unit_price}
          onChange={handleChange}
        />
        <label className="block font-medium">Select Supplier</label>
        <select
          name="supplier_id"
          className="w-full border p-2 rounded-md"
          value={form.supplier_id}
          onChange={handleChange}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/medicines")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
