import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore, useBookingStore } from '../store/store.js';
import '../styles/pages.css';

function TransportBooking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createTransportBooking } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transportType: 'Bus',
    transportName: '',
    vendor: '',
    fromLocation: '',
    toLocation: '',
    departureTime: '',
    arrivalTime: '',
    seats: 1,
    price: 0,
    safetyScore: 5,
    amenities: [],
    notes: '',
  });

  const transportTypes = ['Bus', 'Train', 'Flight', 'Car', 'Bike'];
  const amenitiesList = ['WiFi', 'AC', 'Meals', 'USB Charging', 'Bathroom', 'Entertainment'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTransportBooking({
        ...formData,
        tripId,
        customerId: user._id,
        bookingStatus: 'Pending',
        duration: '0',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <header className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <h1>🚌 Book Transportation</h1>
      </header>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label>Transport Type *</label>
            <select name="transportType" value={formData.transportType} onChange={handleChange}>
              {transportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Vendor Name *</label>
            <input
              type="text"
              name="vendor"
              placeholder="e.g., Air India"
              value={formData.vendor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Transport Name *</label>
            <input
              type="text"
              name="transportName"
              placeholder="e.g., Delhi Express"
              value={formData.transportName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Seats *</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>From Location *</label>
            <input
              type="text"
              name="fromLocation"
              placeholder="e.g., New York"
              value={formData.fromLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>To Location *</label>
            <input
              type="text"
              name="toLocation"
              placeholder="e.g., Boston"
              value={formData.toLocation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Departure Time *</label>
            <input
              type="datetime-local"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Arrival Time *</label>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Safety Score (0-5)</label>
            <input
              type="number"
              name="safetyScore"
              value={formData.safetyScore}
              onChange={handleChange}
              min="0"
              max="5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Amenities</label>
          <div className="amenities-list">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            placeholder="Any special requests or notes..."
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Booking...' : 'Book Transport'}
        </button>
      </form>
    </div>
  );
}

export default TransportBooking;
