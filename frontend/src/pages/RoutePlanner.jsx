import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useTripStore } from '../store/store.js';
import '../styles/pages.css';

function RoutePlanner() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createTrip, error: tripError, clearError } = useTripStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tripName: '',
    startState: '',
    destinationDistrict: '',
    startDate: '',
    endDate: '',
    numberOfTravelers: 1,
    maxDailyHours: 6,
    restFrequency: 2,
    wheelchairAccessible: false,
    nearbyHospitals: false,
    nearbyPharmacies: false,
    totalBudget: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      const trip = await createTrip({
        ...formData,
        customerId: user._id,
        status: 'Planning',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Trip creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="route-planner-container">
      <header className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <h1>✈️ Plan Your Trip</h1>
      </header>

      <form onSubmit={handleSubmit} className="planner-form">
        {tripError && <div className="error-message">{tripError}</div>}

        <div className="form-group">
          <label>Trip Name *</label>
          <input
            type="text"
            name="tripName"
            placeholder="e.g., Summer Vacation 2024"
            value={formData.tripName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Starting State *</label>
            <input
              type="text"
              name="startState"
              placeholder="e.g., California"
              value={formData.startState}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Destination District *</label>
            <input
              type="text"
              name="destinationDistrict"
              placeholder="e.g., San Francisco"
              value={formData.destinationDistrict}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Number of Travelers</label>
            <input
              type="number"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Total Budget ($)</label>
            <input
              type="number"
              name="totalBudget"
              value={formData.totalBudget}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Max Daily Travel Hours</label>
            <input
              type="number"
              name="maxDailyHours"
              value={formData.maxDailyHours}
              onChange={handleChange}
              min="1"
              max="24"
            />
          </div>
          <div className="form-group">
            <label>Rest Frequency (days)</label>
            <input
              type="number"
              name="restFrequency"
              value={formData.restFrequency}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="wheelchairAccessible"
              checked={formData.wheelchairAccessible}
              onChange={handleChange}
            />
            Wheelchair Accessible Required
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="nearbyHospitals"
              checked={formData.nearbyHospitals}
              onChange={handleChange}
            />
            Nearby Hospitals Required
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="nearbyPharmacies"
              checked={formData.nearbyPharmacies}
              onChange={handleChange}
            />
            Nearby Pharmacies Required
          </label>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating Trip...' : 'Create Trip'}
        </button>
      </form>
    </div>
  );
}

export default RoutePlanner;
