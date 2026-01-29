import { useState } from "react";
import {
  Hotel,
  Home,
  Building2,
  Shield,
  Star,
  Accessibility,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { supabase } from "../supabase/client";

interface AccommodationBookingProps {
  route: any;
  tripId: string;
  onSelect: (accommodation: any) => void;
  onBack: () => void;
}

export function AccommodationBooking({
  route,
  tripId,
  onSelect,
  onBack,
}: AccommodationBookingProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<string>("all");
  const [loadingId, setLoadingId] = useState<number | null>(
    null,
  );

  const accommodations = [
    {
      id: 1,
      type: "hotel",
      name: "Senior Comfort Hotel & Spa",
      location: "Central Jaipur",
      price: 3500,
      rating: 4.7,
      reviews: 389,
      safetyScore: 96,
      image: "luxury hotel",
      accessibility: true,
      medicalSupport: true,
    },
    {
      id: 2,
      type: "resort",
      name: "Heritage Senior Resort",
      location: "Near City Palace",
      price: 5200,
      rating: 4.9,
      reviews: 256,
      safetyScore: 98,
      image: "resort wellness",
      accessibility: true,
      medicalSupport: true,
    },
    {
      id: 3,
      type: "guesthouse",
      name: "Peaceful Haveli Guesthouse",
      location: "Old City",
      price: 2200,
      rating: 4.5,
      reviews: 167,
      safetyScore: 92,
      image: "traditional guesthouse",
      accessibility: false,
      medicalSupport: false,
    },
    {
      id: 4,
      type: "serviced",
      name: "ElderCare Serviced Apartments",
      location: "Malviya Nagar",
      price: 4800,
      rating: 4.8,
      reviews: 203,
      safetyScore: 97,
      image: "modern apartment",
      accessibility: true,
      medicalSupport: true,
    },
  ];

  const filteredAccommodations =
    selectedFilter === "all"
      ? accommodations
      : accommodations.filter(
          (acc) => acc.type === selectedFilter,
        );

  // 🔥 SAVE BOOKING TO DATABASE
  const handleBooking = async (accommodation: any) => {
    try {
      setLoadingId(accommodation.id);

      const storedUser = JSON.parse(
        localStorage.getItem("customer") || "{}",
      );

      if (!tripId) {
        alert("Trip not found. Please restart booking.");
        return;
      }

      if (!storedUser?.id) {
        alert("User session missing. Please login again.");
        return;
      }

      const { data, error } = await supabase
        .from("accommodation_bookings")
        .insert([
          {
            trip_id: tripId,
            customer_id: storedUser.id,
            hotel_name: accommodation.name,
            room_type: accommodation.type,
            price_per_night: accommodation.price,
            nights: 1,
            total_price: accommodation.price,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(
          "Accommodation save error:",
          error.message,
        );
        alert("Error saving accommodation: " + error.message);
        return;
      }

      console.log("Accommodation saved:", data);

      // Send booking forward with DB booking id
      onSelect({ ...accommodation, booking_id: data.id });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transport
        </button>
        <h2 className="text-gray-900 mb-2">
          Select Your Accommodation
        </h2>
        <p className="text-gray-600">
          Choose a safe and comfortable stay in{" "}
          {route?.to || "your destination"}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["all", "hotel", "resort", "guesthouse"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() +
                  filter.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
              <ImageWithFallback
                src={`https://source.unsplash.com/800x600/?${accommodation.image}`}
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">
                    {accommodation.safetyScore}%
                  </span>
                </div>
                {accommodation.medicalSupport && (
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Medical</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">
                    {accommodation.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {accommodation.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">
                    ₹{accommodation.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    per night
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900 text-sm">
                    {accommodation.rating}
                  </span>
                  <span className="text-gray-600 text-sm">
                    ({accommodation.reviews})
                  </span>
                </div>
                {accommodation.accessibility && (
                  <div className="flex items-center gap-1 text-purple-600">
                    <Accessibility className="w-4 h-4" />
                    <span className="text-sm">Accessible</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleBooking(accommodation)}
                disabled={loadingId === accommodation.id}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loadingId === accommodation.id
                  ? "Saving..."
                  : "Select This Stay"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}