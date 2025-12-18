import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookAppointment from './pages/BookAppointment';
import FindDoctors from './pages/FindDoctors';
import VideoConsultation from './pages/VideoConsultation';
import Emergency from './pages/Emergency';
import Pharmacy from './pages/Pharmacy';
import MedicalRecords from './pages/MedicalRecords';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/video-consultation" element={<VideoConsultation />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          
          {/* Protected Routes */}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;