import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore, useBookingStore } from '../store/store.js';
import '../styles/pages.css';

function AccommodationBooking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createAccommodationBooking } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    roomType: 'Double',
    checkInDate: '',
    checkOutDate: '',
    nights: 1,
    pricePerNight: 0,
    amenities: [],
    starRating: 4,
    bookedRooms: 1,
    specialRequests: '',
  });

  const roomTypes = ['Single', 'Double', 'Twin', 'Suite', 'Deluxe'];
  const amenitiesList = ['WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service', 'Parking'];

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
      const totalPrice = formData.pricePerNight * formData.nights;
      await createAccommodationBooking({
        ...formData,
        tripId,
        customerId: user._id,
        totalPrice,
        bookingStatus: 'Pending',
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
        <h1>🏨 Book Accommodation</h1>
      </header>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label>Hotel Name *</label>
            <input
              type="text"
              name="hotelName"
              placeholder="e.g., Marriott Hotel"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Downtown"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Room Type *</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange}>
              {roomTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Number of Rooms *</label>
            <input
              type="number"
              name="bookedRooms"
              value={formData.bookedRooms}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check-In Date *</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-Out Date *</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price Per Night ($) *</label>
            <input
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Star Rating</label>
            <input
              type="number"
              name="starRating"
              value={formData.starRating}
              onChange={handleChange}
              min="1"
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
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            placeholder="e.g., High floor, near elevator..."
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Booking...' : 'Book Hotel'}
        </button>
      </form>
    </div>
  );
}

export default AccommodationBooking;
