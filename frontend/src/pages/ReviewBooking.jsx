import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingStore, useTripStore } from '../store/store.js';
import { tripService } from '../services/apiServices.js';
import '../styles/pages.css';

function ReviewBooking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const { transportBookings, accommodationBookings, fetchTripTransportBookings, fetchTripAccommodationBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const tripData = await tripService.getTripById(tripId);
        setTrip(tripData);
        await fetchTripTransportBookings(tripId);
        await fetchTripAccommodationBookings(tripId);
      } catch (err) {
        console.error('Error loading bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBookingData();
  }, [tripId]);

  if (loading) return <div className="loading">Loading booking details...</div>;

  const totalCost = (
    (transportBookings?.reduce((sum, b) => sum + (b.price || 0), 0) || 0) +
    (accommodationBookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0)
  );

  return (
    <div className="review-container">
      <header className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <h1>📋 Review Your Bookings</h1>
      </header>

      {trip && (
        <div className="review-content">
          <section className="trip-summary">
            <h2>Trip Summary</h2>
            <div className="summary-details">
              <p><strong>Trip:</strong> {trip.tripName}</p>
              <p><strong>Route:</strong> {trip.startState} → {trip.destinationDistrict}</p>
              <p><strong>Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}</p>
              <p><strong>Travelers:</strong> {trip.numberOfTravelers}</p>
              <p><strong>Budget:</strong> ${trip.totalBudget}</p>
            </div>
          </section>

          <section className="bookings-section">
            <h3>Transport Bookings ({transportBookings?.length || 0})</h3>
            {transportBookings && transportBookings.length > 0 ? (
              <div className="bookings-list">
                {transportBookings.map((booking) => (
                  <div key={booking._id} className="booking-item">
                    <h4>{booking.transportType} - {booking.vendor}</h4>
                    <p><strong>Route:</strong> {booking.fromLocation} → {booking.toLocation}</p>
                    <p><strong>Departure:</strong> {new Date(booking.departureTime).toLocaleString()}</p>
                    <p><strong>Price:</strong> ${booking.price}</p>
                    <p><strong>Safety:</strong> {'⭐'.repeat(Math.round(booking.safetyScore))}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bookings">No transport bookings yet</p>
            )}
          </section>

          <section className="bookings-section">
            <h3>Accommodation Bookings ({accommodationBookings?.length || 0})</h3>
            {accommodationBookings && accommodationBookings.length > 0 ? (
              <div className="bookings-list">
                {accommodationBookings.map((booking) => (
                  <div key={booking._id} className="booking-item">
                    <h4>{booking.hotelName} - {booking.roomType}</h4>
                    <p><strong>Location:</strong> {booking.location}</p>
                    <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    <p><strong>Nights:</strong> {booking.nights} | <strong>Total:</strong> ${booking.totalPrice}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bookings">No accommodation bookings yet</p>
            )}
          </section>

          <section className="cost-summary">
            <h3>Cost Summary</h3>
            <div className="cost-breakdown">
              <p><strong>Transport:</strong> ${transportBookings?.reduce((sum, b) => sum + (b.price || 0), 0) || 0}</p>
              <p><strong>Accommodation:</strong> ${accommodationBookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0}</p>
              <p className="total"><strong>Total Cost:</strong> ${totalCost}</p>
            </div>
          </section>

          <div className="action-buttons">
            <button
              onClick={() => navigate(`/payment/${tripId}`)}
              className="btn-primary"
            >
              💳 Proceed to Payment
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewBooking;
