import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tripService } from '../services/apiServices.js';
import '../styles/pages.css';

function BookingConfirmation() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const tripData = await tripService.getTripById(tripId);
        setTrip(tripData);
      } catch (err) {
        console.error('Error loading trip:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [tripId]);

  if (loading) return <div className="loading">Loading confirmation...</div>;

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="success-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Your trip has been successfully booked. Get ready for an amazing journey!
        </p>

        {trip && (
          <section className="confirmation-details">
            <h2>Trip Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Trip Name</label>
                <p>{trip.tripName}</p>
              </div>
              <div className="detail-item">
                <label>Route</label>
                <p>{trip.startState} → {trip.destinationDistrict}</p>
              </div>
              <div className="detail-item">
                <label>Travel Dates</label>
                <p>{new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}</p>
              </div>
              <div className="detail-item">
                <label>Travelers</label>
                <p>{trip.numberOfTravelers}</p>
              </div>
              <div className="detail-item">
                <label>Budget</label>
                <p>${trip.totalBudget}</p>
              </div>
              <div className="detail-item">
                <label>Status</label>
                <p className="status-badge">{trip.status}</p>
              </div>
            </div>
          </section>
        )}

        <section className="confirmation-info">
          <h3>What's Next?</h3>
          <ul>
            <li>✈️ Check your email for booking confirmations</li>
            <li>📱 Download our mobile app for easy trip management</li>
            <li>🗺️ View detailed itinerary in your dashboard</li>
            <li>📞 Contact support if you need assistance</li>
          </ul>
        </section>

        <div className="confirmation-actions">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
