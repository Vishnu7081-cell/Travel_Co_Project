import express from 'express';
import Trip from '../models/Trip.js';

const router = express.Router();

// ============================================
// CREATE TRIP
// ============================================
router.post('/', async (req, res) => {
  try {
    const { customerId, tripName, startState, destinationDistrict, startDate, endDate } = req.body;

    const trip = new Trip({
      customerId,
      tripName,
      startState,
      destinationDistrict,
      startDate,
      endDate,
      ...req.body
    });

    const savedTrip = await trip.save();
    
    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: savedTrip
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET ALL TRIPS
// ============================================
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('customerId', 'name email');
    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET CUSTOMER TRIPS
// ============================================
router.get('/customer/:customerId', async (req, res) => {
  try {
    const trips = await Trip.find({ customerId: req.params.customerId });
    
    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET TRIP BY ID
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('customerId', 'name email');
    
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// UPDATE TRIP
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({
      success: true,
      message: 'Trip updated successfully',
      data: trip
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DELETE TRIP
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully',
      data: trip
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
