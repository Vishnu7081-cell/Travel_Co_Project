import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

// ============================================
// CREATE CUSTOMER
// ============================================
router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone, age, emergencyContact, address } = req.body;

    // Check if customer exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const customer = new Customer({
      name,
      email,
      password,
      phone,
      age,
      emergencyContact,
      address
    });

    const savedCustomer = await customer.save();
    
    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: savedCustomer
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET ALL CUSTOMERS
// ============================================
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().select('-password');
    res.json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET CUSTOMER BY ID
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select('-password');
    
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// UPDATE CUSTOMER
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DELETE CUSTOMER
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    res.json({
      success: true,
      message: 'Customer deleted successfully',
      data: customer
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
