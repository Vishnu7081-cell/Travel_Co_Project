import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    tripName: {
      type: String,
      required: [true, 'Please provide a trip name'],
      trim: true
    },
    startState: {
      type: String,
      required: [true, 'Please provide starting state']
    },
    destinationDistrict: {
      type: String,
      required: [true, 'Please provide destination district']
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date']
    },
    maxDailyHours: {
      type: Number,
      default: 8
    },
    restFrequency: {
      type: Number,
      default: 2
    },
    numberOfTravelers: {
      type: Number,
      default: 1,
      min: 1
    },
    wheelchairAccessible: {
      type: Boolean,
      default: false
    },
    nearbyHospitals: {
      type: Boolean,
      default: false
    },
    nearbyPharmacies: {
      type: Boolean,
      default: false
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending'
    },
    totalBudget: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Planning', 'Booked', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Planning'
    },
    description: String,
    itinerary: [{
      day: Number,
      location: String,
      activities: [String],
      notes: String
    }],
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
tripSchema.index({ customerId: 1 });
tripSchema.index({ startDate: 1 });
tripSchema.index({ status: 1 });

export default mongoose.model('Trip', tripSchema);
