import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SupplierForm() {
  const [form, setForm] = useState({
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:5000/api/suppliers", form);
    await axios.post("/api/suppliers", form);
    navigate("/suppliers");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md mt-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Tambah Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "contact_person", "phone", "email", "address"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Simpan
        </button>
      </form>
    </div>
  );
}
