import { useState } from "react";
import { TransportBooking } from "./TransportBooking";
import { AccommodationBooking } from "./AccommodationBooking";
import { BookingSummary } from "./BookingSummary";
import { PaymentGateway } from "./PaymentGateway";
import { Check } from "lucide-react";

interface BookingFlowProps {
  bookingData: any;
  onComplete: (trip: any) => void;
}

export function BookingFlow({
  bookingData,
  onComplete,
}: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedTransport, setSelectedTransport] =
    useState<any>(null);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<any>(null);
  const [bookingDetails, setBookingDetails] =
    useState<any>(null);

  const steps = [
    {
      number: 1,
      name: "Transport",
      completed: currentStep > 1,
    },
    {
      number: 2,
      name: "Accommodation",
      completed: currentStep > 2,
    },
    { number: 3, name: "Review", completed: currentStep > 3 },
    { number: 4, name: "Payment", completed: false },
  ];

  // 🚗 TRANSPORT SELECTED
  const handleTransportSelect = (transport: any) => {
    setSelectedTransport(transport);
    setCurrentStep(2);
  };

  // 🏨 ACCOMMODATION SELECTED
  const handleAccommodationSelect = (accommodation: any) => {
    setSelectedAccommodation(accommodation);
    setCurrentStep(3);
  };

  // 📋 CONFIRM BOOKING (FROM SUMMARY PAGE)
  const handleConfirmBooking = (details: any) => {
    setBookingDetails({
      ...details,
      trip_id: bookingData.trip_id, // 🔥 ensure trip_id moves to payment
    });
    setCurrentStep(4);
  };

  // 💳 PAYMENT COMPLETE

  const handlePaymentComplete = (paymentInfo: any) => {
    const completedTrip = {
      trip_id: bookingData.trip_id,

      // ⭐⭐⭐ THIS IS THE FIX ⭐⭐⭐
      from: bookingData.startState,
      to: bookingData.destinationDistrict,
      date: bookingData.travelDate,

      transport: selectedTransport,
      accommodation: selectedAccommodation,

      booking: bookingDetails,
      payment: paymentInfo,

      status: "confirmed",
      bookingId:
        "TRV" +
        Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase(),
    };

    console.log("🚀 FINAL TRIP SENT TO APP:", completedTrip);
    onComplete(completedTrip);
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex items-center flex-1"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-600 text-white"
                      : currentStep === step.number
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep === step.number
                      ? "text-indigo-600"
                      : "text-gray-600"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step.completed
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Screens */}
      {currentStep === 1 && (
        <TransportBooking
          route={bookingData} // contains trip_id
          onSelect={handleTransportSelect}
        />
      )}

      {currentStep === 2 && (
        <AccommodationBooking
          route={bookingData}
          tripId={bookingData.trip_id} // 🔥 PASS TRIP ID
          onSelect={handleAccommodationSelect}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <BookingSummary
          route={bookingData}
          transport={selectedTransport}
          accommodation={selectedAccommodation}
          onConfirm={handleConfirmBooking}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <PaymentGateway
          bookingDetails={bookingDetails} // contains trip_id
          totalAmount={bookingDetails?.totalAmount || 0}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setCurrentStep(3)}
        />
      )}
    </div>
  );
}