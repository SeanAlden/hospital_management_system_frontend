// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import PatientList from "./pages/Patient/PatientList";
// import PatientCreate from "./pages/Patient/PatientCreate";
// import PatientEdit from "./pages/Patient/PatientEdit";
// import PatientDetail from "./pages/Patient/PatientDetail";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<PatientList />} />
//         <Route path='/create' element={<PatientCreate />} />
//         <Route path='/edit/:id' element={<PatientEdit />} />
//         <Route path='/read/:id' element={<PatientDetail />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientList from "./pages/Patient/PatientList";
import PatientCreate from "./pages/Patient/PatientCreate";
import PatientEdit from "./pages/Patient/PatientEdit";
import PatientDetail from "./pages/Patient/PatientDetail";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import DoctorList from "./pages/Doctor/DoctorList";
import DepartmentList from "./pages/Department/DepartmentList";
import DepartmentCreate from "./pages/Department/DepartmentCreate";
import DepartmentDetail from "./pages/Department/DepartmentDetail";
import DepartmentEdit from "./pages/Department/DepartmentEdit";
import DoctorCreate from "./pages/Doctor/DoctorCreate";
import DoctorEdit from "./pages/Doctor/DoctorEdit";
import DoctorDetail from "./pages/Doctor/DoctorDetai";
import AppointmentList from "./pages/Appointment/AppointmentList";
import AppointmentEdit from "./pages/Appointment/AppointmentEdit";
import AppointmentDetail from "./pages/Appointment/AppointmentDetail";
import AppointmentCreate from "./pages/Appointment/AppointmentCreate";
import MedicalRecordList from "./pages/MedicalRecord/MedicalRecordList";
import MedicalRecordCreate from "./pages/MedicalRecord/MedicalRecordCreate";
import MedicalRecordEdit from "./pages/MedicalRecord/MedicalRecordEdit";
import MedicalRecordDetail from "./pages/MedicalRecord/MedicalRecordDetail";
import RoomList from "./pages/Room/RoomList";
import RoomCreate from "./pages/Room/RoomCreate";
import RoomEdit from "./pages/Room/RoomEdit";
import RoomDetail from "./pages/Room/RoomDetail";
import AdmissionCreate from "./pages/Admission/AdmissionCreate";
import AdmissionEdit from "./pages/Admission/AdmissionEdit";
import AdmissionDetail from "./pages/Admission/AdmissionDetail";
import AdmissionList from "./pages/Admission/AdmissionList";
import BillList from "./pages/Billing/BillList";
import BillCreate from "./pages/Billing/BillCreate";
import StaffList from "./pages/Staff/StaffList";
import StaffCreate from "./pages/Staff/StaffCreate";
import StaffDetail from "./pages/Staff/StaffDetail";
import StaffEdit from "./pages/Staff/StaffEdit";
import LabTestList from "./pages/LabTest/LabTestList";
import LabTestCreate from "./pages/LabTest/LabTestCreate";
import LabTestEdit from "./pages/LabTest/LabTestEdit";
import LabTestDetail from "./pages/LabTest/LabTestDetail";
import BillEdit from "./pages/Billing/BillEdit";
import BillDetail from "./pages/Billing/BillDetail";
import SupplierList from "./pages/Supplier/SupplierList";
import SupplierForm from "./pages/Supplier/SupplierForm";
import SupplierEdit from "./pages/Supplier/SupplierEdit";
import MedicineList from "./pages/Medicine/MedicineList";
import MedicineCreate from "./pages/Medicine/MedicineCreate";
import MedicineEdit from "./pages/Medicine/MedicineEdit";
import MedicineDetail from "./pages/Medicine/MedicineDetail";
import PurchaseEdit from "./pages/Purchase/PurchaseEdit";
import PurchaseList from "./pages/Purchase/PurchaseList";
import PurchaseDetail from "./pages/Purchase/PurchaseDetail";
import PurchaseCreate from "./pages/Purchase/PurchaseCreate";
import EntryCreate from "./pages/Entry/EntryCreate";
import ExitCreate from "./pages/Exit/ExitCreate";
import EntryList from "./pages/Entry/EntryList";
import EntryEdit from "./pages/Entry/EntryEdit";
import ExitList from "./pages/Exit/ExitList";
import ExitEdit from "./pages/Exit/ExitEdit";
import ExitDetail from "./pages/Exit/ExitDetail";
import LoginPage from "./pages/Authentication/LoginPage";
import RegisterPage from "./pages/Authentication/RegisterPage";
import RequireAuth from "./components/RequireAuth";
import GuestOnly from "./components/GuestOnly";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* auth */}
        <Route path="/login" element={<GuestOnly><LoginPage /></GuestOnly>} />
        <Route path="/register" element={<GuestOnly><RegisterPage /></GuestOnly>} />

        {/* Semua halaman dalam layout */}
        <Route
          path="/"
          element={
            // <Layout>
            //   <Dashboard />
            // </Layout>
            <RequireAuth>
              <Layout>
                <Dashboard />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/patients"
          element={
            <RequireAuth>
              <Layout>
                <PatientList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Layout>
                <PatientCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <PatientEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/read/:id"
          element={
            <RequireAuth>
              <Layout>
                <PatientDetail />
              </Layout>
            </RequireAuth>
          }
        />
        {/* <Route
          path="/doctors"
          element={
            <Layout>
              <DoctorList />
            </Layout>
          }
        /> */}
        <Route
          path="/departments"
          element={
            <RequireAuth>
              <Layout>
                <DepartmentList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/departments/create"
          element={
            <RequireAuth>
              <Layout>
                <DepartmentCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/departments/:id"
          element={
            <RequireAuth>
              <Layout>
                <DepartmentDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/departments/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <DepartmentEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/doctors"
          element={
            <RequireAuth>
              <Layout>
                <DoctorList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/doctors/create"
          element={
            <RequireAuth>
              <Layout>
                <DoctorCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/doctors/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <DoctorEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/doctors/:id"
          element={
            <RequireAuth>
              <Layout>
                <DoctorDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <Layout>
                <AppointmentList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments/create"
          element={
            <RequireAuth>
              <Layout>
                <AppointmentCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <AppointmentEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <RequireAuth>
              <Layout>
                <AppointmentDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medical_records"
          element={
            <RequireAuth>
              <Layout>
                <MedicalRecordList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medical_records/create"
          element={
            <RequireAuth>
              <Layout>
                <MedicalRecordCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medical_records/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <MedicalRecordEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medical_records/:id"
          element={
            <RequireAuth>
              <Layout>
                <MedicalRecordDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/rooms"
          element={
            <RequireAuth>
              <Layout>
                <RoomList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/create_room"
          element={
            <RequireAuth>
              <Layout>
                <RoomCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/edit_room/:id"
          element={
            <RequireAuth>
              <Layout>
                <RoomEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/room/:id"
          element={
            <RequireAuth>
              <Layout>
                <RoomDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/admissions"
          element={
            <RequireAuth>
              <Layout>
                <AdmissionList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/admissions/create"
          element={
            <RequireAuth>
              <Layout>
                <AdmissionCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/admissions/:id/edit"
          element={
            <RequireAuth>
              <Layout>
                <AdmissionEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/admission/:id"
          element={
            <RequireAuth>
              <Layout>
                <AdmissionDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/bills"
          element={
            <RequireAuth>
              <Layout>
                <BillList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/bills/create"
          element={
            <RequireAuth>
              <Layout>
                <BillCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/bills/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <BillEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/bills/:id"
          element={
            <RequireAuth>
              <Layout>
                <BillDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/staff"
          element={
            <RequireAuth>
              <Layout>
                <StaffList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/staff/create"
          element={
            <RequireAuth>
              <Layout>
                <StaffCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/staff/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <StaffEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/staff/:id"
          element={
            <RequireAuth>
              <Layout>
                <StaffDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/labtests"
          element={
            <RequireAuth>
              <Layout>
                <LabTestList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/labtests/create"
          element={
            <RequireAuth>
              <Layout>
                <LabTestCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/labtests/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <LabTestEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/labtests/detail/:id"
          element={
            <RequireAuth>
              <Layout>
                <LabTestDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/suppliers"
          element={
            <RequireAuth>
              <Layout>
                <SupplierList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/suppliers/add"
          element={
            <RequireAuth>
              <Layout>
                <SupplierForm />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/suppliers/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <SupplierEdit />
              </Layout>
            </RequireAuth>
          }
        />
        {/* <Route path="/labtests/detail/:id" element={<Layout><LabTestDetail /></Layout>} /> */}

        <Route
          path="/medicines"
          element={
            <RequireAuth>
              <Layout>
                <MedicineList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medicines/create"
          element={
            <RequireAuth>
              <Layout>
                <MedicineCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medicines/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <MedicineEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/medicines/:id"
          element={
            <RequireAuth>
              <Layout>
                <MedicineDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/purchases"
          element={
            <RequireAuth>
              <Layout>
                <PurchaseList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/purchases/create"
          element={
            <RequireAuth>
              <Layout>
                <PurchaseCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/purchases/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <PurchaseEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/purchases/:id"
          element={
            <RequireAuth>
              <Layout>
                <PurchaseDetail />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/entry-stocks"
          element={
            <RequireAuth>
              <Layout>
                <EntryList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/entry-stocks/create"
          element={
            <Layout>
              <EntryCreate />
            </Layout>
          }
        />
        <Route
          path="/entry-stocks/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <EntryEdit />
              </Layout>
            </RequireAuth>
          }
        />
        {/* <Route path="/entry-stocks/:id" element={<Layout><EntryDetail /></Layout>} /> */}

        <Route
          path="/exit-stocks"
          element={
            <RequireAuth>
              <Layout>
                <ExitList />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/exit-stocks/create"
          element={
            <RequireAuth>
              <Layout>
                <ExitCreate />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/exit-stocks/edit/:id"
          element={
            <RequireAuth>
              <Layout>
                <ExitEdit />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/exit-stocks/:id"
          element={
            <RequireAuth>
              <Layout>
                <ExitDetail />
              </Layout>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
