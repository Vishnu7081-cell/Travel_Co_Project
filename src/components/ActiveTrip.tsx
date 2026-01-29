import { useState } from "react";
import {
  MapPin,
  Navigation,
  AlertCircle,
  Phone,
  Hospital,
  Pill,
  Hotel,
  Clock,
  Shield,
  Zap,
  Coffee,
} from "lucide-react";

interface ActiveTripProps {
  trip: any;
}

export function ActiveTrip({ trip }: ActiveTripProps) {
  const [isRerouting, setIsRerouting] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);

  const handleDynamicReroute = (reason: string) => {
    setIsRerouting(true);
    setTimeout(() => {
      setIsRerouting(false);
      alert(
        `Route updated! Redirecting you to the nearest safe ${reason} spot.`,
      );
    }, 2000);
  };

  const emergencyContacts = [
    { name: "Emergency Services", number: "108" },
    { name: "Family Contact", number: "+91 98765 43210" },
    { name: "Caregiver", number: "+91 98765 43211" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Map Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Live Route Map */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white mb-1">
                  Active Journey
                </h3>

                <p className="text-indigo-100">
                  {trip?.from} → {trip?.to}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>95% Safe</span>
              </div>
            </div>
          </div>

          {/* Mock Map Visualization */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 h-96 p-8">
            {/* Route Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <path
                d="M 50 350 Q 200 250, 350 300 T 650 150"
                stroke="#4F46E5"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
              />
            </svg>

            {/* POI Markers */}
            <div className="absolute top-20 left-32 z-10">
              <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <Hospital className="w-5 h-5" />
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-md mt-2 text-sm whitespace-nowrap">
                Max Hospital
              </div>
            </div>

            <div className="absolute top-40 left-64 z-10">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <Pill className="w-5 h-5" />
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-md mt-2 text-sm whitespace-nowrap">
                Apollo Pharmacy
              </div>
            </div>

            <div className="absolute top-32 right-40 z-10">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <Hotel className="w-5 h-5" />
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-md mt-2 text-sm whitespace-nowrap">
                Senior Resort
              </div>
            </div>

            {/* Current Location */}
            <div className="absolute top-64 left-80 z-10">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Navigation className="w-6 h-6" />
              </div>
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-md mt-2 text-sm">
                You are here
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">
                Journey Progress
              </span>
              <span className="text-gray-900">
                45% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-blue-600 h-3 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dynamic Re-Route Section */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Dynamic Re-Route
          </h3>
          <p className="text-gray-600 mb-6">
            Need to change plans? We'll instantly redirect you
            to the nearest safe location.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleDynamicReroute("rest")}
              disabled={isRerouting}
              className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all border-2 border-transparent hover:border-blue-300 disabled:opacity-50"
            >
              <Coffee className="w-8 h-8 text-blue-600" />
              <span className="text-gray-900">Need Rest</span>
              <span className="text-gray-600 text-sm">
                Find rest stop
              </span>
            </button>

            <button
              onClick={() => handleDynamicReroute("medical")}
              disabled={isRerouting}
              className="flex flex-col items-center gap-3 p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-all border-2 border-transparent hover:border-red-300 disabled:opacity-50"
            >
              <Hospital className="w-8 h-8 text-red-600" />
              <span className="text-gray-900">
                Medical Help
              </span>
              <span className="text-gray-600 text-sm">
                Find hospital
              </span>
            </button>

            <button
              onClick={() =>
                handleDynamicReroute("accommodation")
              }
              disabled={isRerouting}
              className="flex flex-col items-center gap-3 p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all border-2 border-transparent hover:border-purple-300 disabled:opacity-50"
            >
              <Hotel className="w-8 h-8 text-purple-600" />
              <span className="text-gray-900">End Early</span>
              <span className="text-gray-600 text-sm">
                Find stay
              </span>
            </button>
          </div>

          {isRerouting && (
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                <p className="text-indigo-900">
                  Calculating safest route to nearby location...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Current Status */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h4 className="text-gray-900 mb-4">Current Status</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Travel Time
                </span>
              </div>
              <span className="text-green-700">2.5 hrs</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">
                  Distance Left
                </span>
              </div>
              <span className="text-blue-700">180 km</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Next Stop</span>
              </div>
              <span className="text-purple-700">45 mins</span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <button
            onClick={() => setShowEmergency(!showEmergency)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h4 className="text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              Emergency Contacts
            </h4>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </button>

          {showEmergency && (
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <a
                  key={index}
                  href={`tel:${contact.number}`}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
                >
                  <span className="text-gray-900">
                    {contact.name}
                  </span>
                  <span className="text-red-600">
                    {contact.number}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming POIs */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h4 className="text-gray-900 mb-4">Upcoming POIs</h4>
          <div className="space-y-3">
            {[
              {
                name: "Fortis Hospital",
                distance: "12 km",
                icon: Hospital,
                color: "bg-red-50 text-red-600",
              },
              {
                name: "MedPlus",
                distance: "8 km",
                icon: Pill,
                color: "bg-green-50 text-green-600",
              },
              {
                name: "Comfort Inn",
                distance: "25 km",
                icon: Hotel,
                color: "bg-blue-50 text-blue-600",
              },
            ].map((poi, index) => {
              const Icon = poi.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 ${poi.color} rounded-lg`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">
                      {poi.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {poi.distance} ahead
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h5 className="text-amber-900 mb-2">
                Rest Stop Reminder
              </h5>
              <p className="text-amber-800 text-sm">
                You've been traveling for 1.5 hours. Consider
                taking a break at the next rest stop in 30
                minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}