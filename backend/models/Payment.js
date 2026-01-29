import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Please provide amount'],
      min: 0
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Wallet'],
      required: true
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    paymentGateway: {
      type: String,
      enum: ['Stripe', 'Razorpay', 'PayPal', 'Manual'],
      default: 'Razorpay'
    },
    breakdown: {
      transportCost: {
        type: Number,
        default: 0
      },
      accommodationCost: {
        type: Number,
        default: 0
      },
      activityCost: {
        type: Number,
        default: 0
      },
      tax: {
        type: Number,
        default: 0
      },
      discount: {
        type: Number,
        default: 0
      }
    },
    paidAt: Date,
    failureReason: String,
    invoiceUrl: String,
    receiptUrl: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Indexes
paymentSchema.index({ tripId: 1 });
paymentSchema.index({ customerId: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });

export default mongoose.model('Payment', paymentSchema);
