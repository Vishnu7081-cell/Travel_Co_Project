import { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Shield,
  ArrowLeft,
  Edit,
  CheckCircle,
} from "lucide-react";

interface BookingSummaryProps {
  route: any;
  transport: any;
  accommodation: any;
  onConfirm: (details: any) => void;
  onBack: () => void;
}

export function BookingSummary({
  route,
  transport,
  accommodation,
  onConfirm,
  onBack,
}: BookingSummaryProps) {
  const [travelers, setTravelers] = useState(route?.numberOfTravelers || 2);
  const [nights, setNights] = useState(2);
  const [addOns, setAddOns] = useState({
    travelInsurance: true,
    mealPlan: true,
    guidedTour: false,
    medicalSupport: true,
  });

  const calculateTotal = () => {
    let total = 0;

    // Transport cost
    total += (transport?.price || 0) * travelers;

    // Accommodation cost
    total += (accommodation?.price || 0) * nights;

    // Add-ons
    if (addOns.travelInsurance) total += 500 * travelers;
    if (addOns.mealPlan) total += 800 * travelers * nights;
    if (addOns.guidedTour) total += 2500 * travelers;
    if (addOns.medicalSupport) total += 1500;

    return total;
  };

  const handleConfirm = () => {
    onConfirm({
      trip_id: route.trip_id, // 🔥 REQUIRED FOR PAYMENTS
      transport_booking_id: transport?.booking_id,
      accommodation_booking_id: accommodation?.booking_id,
      travelers,
      nights,
      addOns,
      totalAmount: calculateTotal(),
      bookingDate: new Date().toISOString(),
    });
  };

  const addOnsList = [
    {
      id: "travelInsurance",
      name: "Senior Travel Insurance",
      description:
        "Comprehensive coverage for medical emergencies",
      price: 500,
      perUnit: "per person",
      recommended: true,
    },
    {
      id: "mealPlan",
      name: "All Meals Included",
      description: "Special senior-friendly diet options",
      price: 800,
      perUnit: "per person/night",
      recommended: true,
    },
    {
      id: "guidedTour",
      name: "Senior-Friendly Guided Tours",
      description: "Accessible sightseeing with rest breaks",
      price: 2500,
      perUnit: "per person",
      recommended: false,
    },
    {
      id: "medicalSupport",
      name: "24/7 Medical Support",
      description: "On-call doctor and emergency assistance",
      price: 1500,
      perUnit: "for the trip",
      recommended: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Accommodation
        </button>
        <h2 className="text-gray-900 mb-2">
          Review Your Booking
        </h2>
        <p className="text-gray-600">
          Please review all details before proceeding to payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Details */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-gray-900 mb-4">Trip Details</h3>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-gray-600 text-sm">Route</p>
                <p className="text-gray-900">
                  {route?.startState} →{" "}
                  {route?.destinationDistrict}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-gray-600 text-sm">
                  Travel Date
                </p>
                <p className="text-gray-900">
                  {route?.travelDate}
                </p>
              </div>
            </div>
          </div>

          {/* Transport */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-gray-900 mb-2">Transport</h3>
            <p className="text-gray-700">{transport?.name}</p>
            <p className="text-indigo-600 mt-2">
              ₹{(transport?.price * travelers).toLocaleString()}
            </p>
          </div>

          {/* Accommodation */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-gray-900 mb-2">
              Accommodation
            </h3>
            <p className="text-gray-700">
              {accommodation?.name}
            </p>
            <p className="text-indigo-600 mt-2">
              ₹
              {(accommodation?.price * nights).toLocaleString()}
            </p>
          </div>

          {/* Add-ons */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-gray-900 mb-4">
              Additional Services
            </h3>
            <div className="space-y-3">
              {addOnsList.map((addOn) => (
                <label
                  key={addOn.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={
                      addOns[addOn.id as keyof typeof addOns]
                    }
                    onChange={(e) =>
                      setAddOns({
                        ...addOns,
                        [addOn.id]: e.target.checked,
                      })
                    }
                    className="w-5 h-5 mt-1 accent-indigo-600"
                  />
                  <div>
                    <p className="text-gray-900">
                      {addOn.name}
                    </p>
                    <p className="text-indigo-600 text-sm">
                      ₹{addOn.price} {addOn.perUnit}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-4">
            <h3 className="text-gray-900 mb-6">
              Price Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Transport</span>
              <span>
                ₹
                {(
                  transport?.price * travelers
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Accommodation</span>
              <span>
                ₹
                {(
                  accommodation?.price * nights
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all mt-6"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}