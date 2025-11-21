// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// function Edit() {
//   const { id } = useParams();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     age: "",
//     gender: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`/get_patient/${id}`).then((res) => {
//       const data = res.data[0];
//       setForm(data);
//     });
//   }, [id]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:5000/edit_user/${id}`, form);
//     navigate("/");
//   };

//   return (
//     <div className="container my-5">
//       <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
//         <div className="card-body">
//           <h2 className="h4 mb-4 text-secondary text-center">Edit Pasien</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Nama
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={form.name}
//                 className="form-control"
//                 placeholder="Masukkan nama pasien"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={form.email}
//                 className="form-control"
//                 placeholder="Masukkan email pasien"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="age" className="form-label">
//                 Usia
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={form.age}
//                 className="form-control"
//                 placeholder="Masukkan usia pasien"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="gender" className="form-label">
//                 Gender
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={form.gender}
//                 className="form-select"
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Pilih Gender</option>
//                 <option value="Male">Laki-laki</option>
//                 <option value="Female">Perempuan</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-warning w-100 py-2 fw-semibold text-white"
//             >
//               Update
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Edit;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";

function PatientEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/get_patient/${id}`).then((res) => {
      const data = res.data[0];
      setForm(data);
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/edit_user/${id}`, form);
      setAlert({
        type: "success",
        message: "✅ Data pasien berhasil diperbarui!",
      });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "❌ Terjadi kesalahan saat memperbarui data pasien.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      {/* 🔔 Alert Notification */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="bg-white w-full max-w-md shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Edit Pasien
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              placeholder="Masukkan nama pasien"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              placeholder="Masukkan email pasien"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usia
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              placeholder="Masukkan usia pasien"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Gender</option>
              <option value="Male">Laki-laki</option>
              <option value="Female">Perempuan</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition-all duration-150"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientEdit;
