import mongoose from 'mongoose';

const transportBookingSchema = new mongoose.Schema(
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
    transportType: {
      type: String,
      enum: ['Bus', 'Train', 'Flight', 'Car', 'Bike'],
      required: true
    },
    transportName: {
      type: String,
      required: [true, 'Please provide transport name']
    },
    vendor: String,
    fromLocation: String,
    toLocation: String,
    departureTime: Date,
    arrivalTime: Date,
    duration: String,
    seats: Number,
    price: {
      type: Number,
      required: true
    },
    safetyScore: {
      type: Number,
      min: 0,
      max: 5,
      default: 4
    },
    amenities: [String],
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending'
    },
    bookingReference: String,
    notes: String,
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
transportBookingSchema.index({ tripId: 1 });
transportBookingSchema.index({ customerId: 1 });
transportBookingSchema.index({ transportType: 1 });

export default mongoose.model('TransportBooking', transportBookingSchema);
