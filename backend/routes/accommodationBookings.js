import express from 'express';
import AccommodationBooking from '../models/AccommodationBooking.js';

const router = express.Router();

// ============================================
// CREATE ACCOMMODATION BOOKING
// ============================================
router.post('/', async (req, res) => {
  try {
    const booking = new AccommodationBooking(req.body);
    const savedBooking = await booking.save();
    
    res.status(201).json({
      success: true,
      message: 'Accommodation booking created successfully',
      data: savedBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET ALL ACCOMMODATION BOOKINGS
// ============================================
router.get('/', async (req, res) => {
  try {
    const bookings = await AccommodationBooking.find()
      .populate('tripId', 'tripName')
      .populate('customerId', 'name email');
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET TRIP ACCOMMODATION BOOKINGS
// ============================================
router.get('/trip/:tripId', async (req, res) => {
  try {
    const bookings = await AccommodationBooking.find({ tripId: req.params.tripId });
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET BOOKING BY ID
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const booking = await AccommodationBooking.findById(req.params.id)
      .populate('tripId')
      .populate('customerId', 'name email');
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// UPDATE BOOKING
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const booking = await AccommodationBooking.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DELETE BOOKING
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const booking = await AccommodationBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
