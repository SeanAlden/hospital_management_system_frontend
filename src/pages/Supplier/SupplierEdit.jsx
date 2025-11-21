import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function SupplierEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/suppliers/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/suppliers/${id}`, form);
    navigate("/suppliers");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md mt-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "contact_person", "phone", "email", "address"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field] || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
}
