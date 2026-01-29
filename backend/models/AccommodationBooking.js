import mongoose from 'mongoose';

const accommodationBookingSchema = new mongoose.Schema(
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
    hotelName: {
      type: String,
      required: [true, 'Please provide hotel name']
    },
    location: String,
    roomType: {
      type: String,
      enum: ['Single', 'Double', 'Twin', 'Suite', 'Deluxe'],
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    nights: {
      type: Number,
      default: 1
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    amenities: [String],
    starRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    bookedRooms: {
      type: Number,
      default: 1
    },
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending'
    },
    bookingReference: String,
    specialRequests: String,
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
accommodationBookingSchema.index({ tripId: 1 });
accommodationBookingSchema.index({ customerId: 1 });
accommodationBookingSchema.index({ hotelName: 1 });

export default mongoose.model('AccommodationBooking', accommodationBookingSchema);
