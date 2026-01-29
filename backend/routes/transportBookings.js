import express from 'express';
import TransportBooking from '../models/TransportBooking.js';

const router = express.Router();

// ============================================
// CREATE TRANSPORT BOOKING
// ============================================
router.post('/', async (req, res) => {
  try {
    const booking = new TransportBooking(req.body);
    const savedBooking = await booking.save();
    
    res.status(201).json({
      success: true,
      message: 'Transport booking created successfully',
      data: savedBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET ALL TRANSPORT BOOKINGS
// ============================================
router.get('/', async (req, res) => {
  try {
    const bookings = await TransportBooking.find()
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
// GET TRIP TRANSPORT BOOKINGS
// ============================================
router.get('/trip/:tripId', async (req, res) => {
  try {
    const bookings = await TransportBooking.find({ tripId: req.params.tripId });
    
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
    const booking = await TransportBooking.findById(req.params.id)
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
    const booking = await TransportBooking.findByIdAndUpdate(
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
    const booking = await TransportBooking.findByIdAndDelete(req.params.id);

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
