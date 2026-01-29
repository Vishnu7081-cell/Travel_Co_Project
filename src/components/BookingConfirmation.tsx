import { useEffect, useState } from "react";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Car,
  Hotel,
  CreditCard,
  Shield,
  Phone,
} from "lucide-react";
import {
  tripsAPI,
  transportBookingsAPI,
  accommodationBookingsAPI,
  paymentsAPI
} from "../utils/api";

interface BookingConfirmationProps {
  tripId: string;
  bookingData: {
    from: string;
    to: string;
  };
  onGoHome: () => void;
  setActiveTrip: (trip: { from: string; to: string }) => void;
}

export function BookingConfirmation({
  tripId,
  bookingData,
  onGoHome,
  setActiveTrip,
}: BookingConfirmationProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [trip, setTrip] = useState<any>(null);
  const [transport, setTransport] = useState<any>(null);
  const [accommodation, setAccommodation] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);

        const tripRes = await tripsAPI.getById(tripId);
        if (tripRes.success) setTrip(tripRes.data);

        const transportRes = await transportBookingsAPI.getByTripId(tripId);
        if (transportRes.success && transportRes.data.length > 0) {
          setTransport(transportRes.data[0]);
        }

        const accommodationRes = await accommodationBookingsAPI.getByTripId(tripId);
        if (accommodationRes.success && accommodationRes.data.length > 0) {
          setAccommodation(accommodationRes.data[0]);
        }

        const paymentRes = await paymentsAPI.getByTripId(tripId);
        if (paymentRes.success && paymentRes.data.length > 0) {
          setPayment(paymentRes.data[0]);
        }

      } catch (err: any) {
        console.error(err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [tripId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading your booking details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* SUCCESS HEADER */}
      <div className="bg-white rounded-xl p-10 shadow-md border text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-14 h-14 text-green-600" />
        </div>

        <h1 className="text-2xl text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-4">
          Your safe journey has been successfully booked.
        </p>

        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg inline-block">
          Trip ID: <strong>{tripId}</strong>
        </div>
      </div>

      {/* TRIP DETAILS */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          Trip Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>From:</strong> {trip?.startState}
          </p>
          <p>
            <strong>To:</strong> {trip?.destinationDistrict}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {trip?.startDate ? new Date(trip.startDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Number of People:</strong> {trip?.numberOfTravelers}
          </p>
          <p>
            <strong>Rest Stops:</strong> Every{" "}
            {trip?.restFrequency} hrs
          </p>
        </div>
      </div>

      {/* TRANSPORT */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-indigo-600" />
          Transport Booking
        </h3>

        <p>
          <strong>Type:</strong> {transport?.transport_type}
        </p>
        <p>
          <strong>Service:</strong> {transport?.transport_name}
        </p>
        <p>
          <strong>Vendor:</strong> {transport?.vendor}
        </p>
        <p>
          <strong>Duration:</strong> {transport?.duration}
        </p>
        <p>
          <strong>Price:</strong> ₹{transport?.price}
        </p>
      </div>

      {/* ACCOMMODATION */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <Hotel className="w-5 h-5 text-indigo-600" />
          Accommodation
        </h3>

        <p>
          <strong>Hotel:</strong> {accommodation?.hotel_name}
        </p>
        <p>
          <strong>Room Type:</strong> {accommodation?.room_type}
        </p>
        <p>
          <strong>Nights:</strong> {accommodation?.nights}
        </p>
        <p>
          <strong>Total:</strong> ₹{accommodation?.total_price}
        </p>
      </div>

      {/* PAYMENT */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          Payment Summary
        </h3>

        <p>
          <strong>Amount Paid:</strong> ₹{payment?.amount}
        </p>
        <p>
          <strong>Method:</strong> {payment?.payment_method}
        </p>
        <p>
          <strong>Transaction ID:</strong>{" "}
          {payment?.transaction_id}
        </p>
        <p className="text-green-600 font-semibold">
          Status: {payment?.status}
        </p>
      </div>

      {/* SUPPORT */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex gap-4">
        <Phone className="w-6 h-6 text-indigo-600 mt-1" />
        <div>
          <h3 className="text-indigo-900 mb-1">
            Need Help During Your Journey?
          </h3>
          <p className="text-indigo-800 text-sm">
            Our 24/7 senior travel support team is always
            available.
          </p>
          <p className="text-indigo-900 font-medium mt-2">
            📞 Helpline: 1800-123-456
          </p>
        </div>
      </div>

      {/* GO HOME BUTTON */}
      <div className="text-center">
        <button
          onClick={() => {
            setActiveTrip({
              from: bookingData.from,
              to: bookingData.to,
            });
            onGoHome();
          }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}