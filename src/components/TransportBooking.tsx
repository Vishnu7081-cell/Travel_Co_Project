import { useState } from "react";
import {
  Car,
  Train,
  Bus,
  Shield,
  Clock,
  Users,
  Accessibility,
  Star,
} from "lucide-react";
import { transportBookingsAPI } from "../utils/api";

interface TransportBookingProps {
  route: any; // contains trip_id, startState, destinationDistrict etc
  onSelect: (transport: any) => void;
}

export function TransportBooking({
  route,
  onSelect,
}: TransportBookingProps) {
  const [selectedType, setSelectedType] =
    useState<string>("all");
  const [loadingId, setLoadingId] = useState<number | null>(
    null,
  );

  const transportOptions = [
    {
      id: 1,
      type: "car",
      name: "Private Car with Driver",
      icon: Car,
      duration: "5.5 hours",
      price: 4500,
      safetyScore: 98,
      features: [
        "Senior-friendly driver",
        "AC comfort",
        "Multiple rest stops",
        "Medical kit onboard",
      ],
      accessibility: true,
      rating: 4.8,
      reviews: 245,
      vendor: "SafeDrive India",
    },
    {
      id: 2,
      type: "train",
      name: "First Class AC Train",
      icon: Train,
      duration: "6 hours",
      price: 2800,
      safetyScore: 95,
      features: [
        "Senior citizen quota",
        "Lower berth",
        "Attendant service",
        "Wheelchair accessible",
      ],
      accessibility: true,
      rating: 4.6,
      reviews: 892,
      vendor: "Indian Railways",
    },
    {
      id: 3,
      type: "bus",
      name: "Luxury Volvo Bus",
      icon: Bus,
      duration: "7 hours",
      price: 1500,
      safetyScore: 90,
      features: [
        "Reclining seats",
        "AC comfort",
        "Rest stops",
        "Onboard restroom",
      ],
      accessibility: false,
      rating: 4.3,
      reviews: 567,
      vendor: "RedBus Premium",
    },
    {
      id: 4,
      type: "car",
      name: "Luxury SUV with Medical Support",
      icon: Car,
      duration: "5 hours",
      price: 8500,
      safetyScore: 99,
      features: [
        "Trained paramedic",
        "Oxygen support",
        "Premium comfort",
        "Emergency equipped",
      ],
      accessibility: true,
      rating: 4.9,
      reviews: 156,
      vendor: "ElderCare Travel",
    },
  ];

  const filteredOptions =
    selectedType === "all"
      ? transportOptions
      : transportOptions.filter(
        (opt) => opt.type === selectedType,
      );

  // 🔥 SAVE TRANSPORT BOOKING
  const handleSelectTransport = async (option: any) => {
    try {
      setLoadingId(option.id);

      const storedUser = JSON.parse(
        localStorage.getItem("customer") || "{}",
      );

      if (!route?.trip_id) {
        alert("Trip not found. Please plan trip again.");
        return;
      }

      if (!storedUser?.id) {
        alert("User not found. Please login again.");
        return;
      }

      const response = await transportBookingsAPI.create({
        tripId: route.trip_id,
        customerId: storedUser.id,
        transportType: option.type.charAt(0).toUpperCase() + option.type.slice(1),
        transportName: option.name,
        vendor: option.vendor,
        price: option.price,
        duration: option.duration,
        safetyScore: Math.round((option.safetyScore / 20) * 10) / 10, // Scale 100 to 5.0
      });

      if (!response.success) {
        alert("Error saving transport");
        return;
      }

      const bookingData = response.data;
      console.log("✅ Transport saved:", bookingData);

      // ✅ Pass BOTH UI option + DB booking record forward
      onSelect({
        ...option,
        booking_id: bookingData._id,
        trip_id: route.trip_id,
      });
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 className="text-gray-900 mb-2">
          Select Your Transport
        </h2>
        <p className="text-gray-600">
          Travel from <b>{route?.startState}</b> to{" "}
          <b>{route?.destinationDistrict}</b>
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["all", "car", "train", "bus"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${selectedType === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {type === "all"
                ? "All Options"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">
                        {option.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {option.vendor}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">
                      ₹{option.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      per person
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">
                      {option.safetyScore}% Safe
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-900 text-sm">
                      {option.rating}
                    </span>
                    <span className="text-gray-600 text-sm">
                      ({option.reviews})
                    </span>
                  </div>
                  {option.accessibility && (
                    <div className="flex items-center gap-1 text-purple-600">
                      <Accessibility className="w-4 h-4" />
                      <span className="text-sm">
                        Accessible
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-gray-900 text-sm">
                        Duration
                      </p>
                      <p className="text-xs">
                        {option.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-gray-900 text-sm">
                        Capacity
                      </p>
                      <p className="text-xs">1-4 passengers</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-700">Features:</p>
                  {option.features.map(
                    (feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                        {feature}
                      </div>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handleSelectTransport(option)}
                  disabled={loadingId === option.id}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loadingId === option.id
                    ? "Saving..."
                    : "Select This Option"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}