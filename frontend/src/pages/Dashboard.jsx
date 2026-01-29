import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useTripStore } from '../store/store.js';
import '../styles/pages.css';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { trips, fetchCustomerTrips, deleteTrip } = useTripStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchCustomerTrips(user._id).then(() => setLoading(false));
    }
  }, [user, fetchCustomerTrips]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🌍 Travel Co Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="actions-section">
          <button
            onClick={() => navigate('/plan-trip')}
            className="action-btn primary"
          >
            ✈️ Plan New Trip
          </button>
        </section>

        <section className="trips-section">
          <h2>Your Trips</h2>
          {loading ? (
            <p>Loading trips...</p>
          ) : trips && trips.length > 0 ? (
            <div className="trips-grid">
              {trips.map((trip) => (
                <div key={trip._id} className="trip-card">
                  <h3>{trip.tripName}</h3>
                  <p><strong>From:</strong> {trip.startState}</p>
                  <p><strong>To:</strong> {trip.destinationDistrict}</p>
                  <p><strong>Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> <span className={`status ${trip.status.toLowerCase()}`}>{trip.status}</span></p>
                  <div className="trip-actions">
                    <button
                      onClick={() => navigate(`/transport-booking/${trip._id}`)}
                      className="btn-secondary"
                    >
                      Book Transport
                    </button>
                    <button
                      onClick={() => navigate(`/accommodation-booking/${trip._id}`)}
                      className="btn-secondary"
                    >
                      Book Hotel
                    </button>
                    <button
                      onClick={() => navigate(`/review-booking/${trip._id}`)}
                      className="btn-secondary"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => deleteTrip(trip._id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-trips">No trips yet. <button onClick={() => navigate('/plan-trip')}>Create one!</button></p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
