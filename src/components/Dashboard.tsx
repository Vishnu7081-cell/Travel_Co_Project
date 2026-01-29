import { useEffect, useState } from "react";
import {
  MapPin,
  Shield,
  Clock,
  Heart,
  AlertCircle,
} from "lucide-react";
import { tripsAPI } from "../utils/api";

interface DashboardProps {
  userId: string;
  userName: string;
  onStartPlanning: () => void;
  onViewTrip: () => void;
}

function Dashboard({
  userId,
  userName,
  onStartPlanning,
  onViewTrip,
}: DashboardProps) {
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        // We might want to add getByCustomerId to tripsAPI, but for now getAll and filter or just getAll
        const response = await tripsAPI.getAll();
        if (response.success) {
          // Filter trips for this customer
          const userTrips = response.data.filter((t: any) => t.customerId === userId || t.customerId?._id === userId);
          setUpcomingTrips(userTrips.slice(0, 2)); // Show only 2
        }
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [userId]);

  const safetyMetrics = [
    {
      icon: Shield,
      label: "Safety Score",
      value: "95%",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Clock,
      label: "Avg. Travel Time",
      value: "3.5 hrs",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Heart,
      label: "Health Stops",
      value: "12",
      color: "bg-pink-100 text-pink-700",
    },
    {
      icon: MapPin,
      label: "Safe POIs",
      value: "48",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-white text-2xl font-semibold mb-2">
          Welcome back, {userName}!
        </h2>

        <p className="text-indigo-100 mb-6">
          Ready to explore India safely? Let's plan your next
          adventure.
        </p>

        <button
          onClick={onStartPlanning}
          className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:shadow-lg transition-all"
        >
          Plan New Trip
        </button>
      </div>

      {/* Safety Metrics */}
      <div>
        <h3 className="text-gray-900 text-xl font-semibold mb-4">
          Your Safety Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  {metric.label}
                </p>
                <p className="text-gray-900 text-lg font-semibold">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 text-xl font-semibold">
            Upcoming Trips
          </h3>
          <button
            onClick={onStartPlanning}
            className="text-indigo-600 hover:text-indigo-700"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTrips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">
                    {trip.destinationDistrict || trip.to || "Unknown Destination"}
                  </h4>
                  <p className="text-gray-600">{trip.travelDate || trip.startDate || "Date TBD"}</p>
                </div>

                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {trip.safetyScore || 95}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{trip.duration || "Multi-day"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>{trip.numberOfTravelers || 2} People</span>
                </div>
                <div className="text-xs text-indigo-600">
                  From: {trip.startState || "Unknown"}
                </div>
              </div>

              <button
                onClick={onViewTrip}
                className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-lg hover:bg-indigo-100 transition-all"
              >
                View Details
              </button>
            </div>
          ))}
          {upcomingTrips.length === 0 && !loading && (
            <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 mb-4">No upcoming trips planned yet.</p>
              <button
                onClick={onStartPlanning}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Start planning your first journey!
              </button>
            </div>
          )}
          {loading && (
            <div className="col-span-full text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
          )}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-amber-900 font-semibold mb-2">
              Travel Tip for Today
            </h4>
            <p className="text-amber-800">
              Remember to take regular breaks every 2 hours
              during your journey. Stay hydrated and keep your
              medications easily accessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard };