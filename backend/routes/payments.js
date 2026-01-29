import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// ============================================
// CREATE PAYMENT
// ============================================
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    
    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: savedPayment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET ALL PAYMENTS
// ============================================
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('tripId', 'tripName')
      .populate('customerId', 'name email');
    
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET TRIP PAYMENTS
// ============================================
router.get('/trip/:tripId', async (req, res) => {
  try {
    const payments = await Payment.find({ tripId: req.params.tripId });
    
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET PAYMENT BY ID
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('tripId')
      .populate('customerId', 'name email');
    
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET PAYMENT BY TRANSACTION ID
// ============================================
router.get('/transaction/:transactionId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ transactionId: req.params.transactionId })
      .populate('tripId')
      .populate('customerId', 'name email');
    
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// UPDATE PAYMENT
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({
      success: true,
      message: 'Payment updated successfully',
      data: payment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DELETE PAYMENT
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({
      success: true,
      message: 'Payment deleted successfully',
      data: payment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
