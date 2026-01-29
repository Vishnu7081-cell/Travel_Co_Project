import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/store.js';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RoutePlanner from './pages/RoutePlanner.jsx';
import TransportBooking from './pages/TransportBooking.jsx';
import AccommodationBooking from './pages/AccommodationBooking.jsx';
import ReviewBooking from './pages/ReviewBooking.jsx';
import PaymentGateway from './pages/PaymentGateway.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import './App.css';

function App() {
  const { user, token } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/plan-trip"
          element={token ? <RoutePlanner /> : <Navigate to="/login" />}
        />
        <Route
          path="/transport-booking/:tripId"
          element={token ? <TransportBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/accommodation-booking/:tripId"
          element={token ? <AccommodationBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/review-booking/:tripId"
          element={token ? <ReviewBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment/:tripId"
          element={token ? <PaymentGateway /> : <Navigate to="/login" />}
        />
        <Route
          path="/confirmation/:tripId"
          element={token ? <BookingConfirmation /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
