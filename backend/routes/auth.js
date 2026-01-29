import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Customer from '../models/Customer.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            customerId: user.customerId
        },
        process.env.JWT_SECRET || 'your-secret-key-change-this',
        {
            expiresIn: process.env.JWT_EXPIRE || '7d'
        }
    );
};

// ============================================
// SIGNUP - Register new user
// ============================================
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone, age, emergencyContact } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide name, email, and password'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }

        // Create customer profile
        const customer = await Customer.create({
            name,
            email: email.toLowerCase(),
            phone: phone || '',
            age: age ? parseInt(age) : undefined,
            emergencyContact: emergencyContact || '',
            password: password // This will be stored in Customer model too for now
        });

        // Create user with authentication
        const user = await User.create({
            email: email.toLowerCase(),
            password,
            customerId: customer._id
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                customerId: customer._id,
                name: customer.name
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Error creating account'
        });
    }
});

// ============================================
// LOGIN - Authenticate user
// ============================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password'
            });
        }

        // Find user (include password for comparison)
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Get customer details
        const customer = await Customer.findById(user.customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer profile not found'
            });
        }

        // Generate token
        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                customerId: customer._id,
                name: customer.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Error logging in'
        });
    }
});

// ============================================
// GET CURRENT USER - Protected route
// ============================================
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const customer = await Customer.findById(req.user.customerId);

        if (!user || !customer) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                customerId: customer._id,
                name: customer.name
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching user data'
        });
    }
});

// ============================================
// LOGOUT - Client-side token removal
// ============================================
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;
