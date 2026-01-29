import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { RoutePlanner } from "./components/RoutePlanner";
import { ActiveTrip } from "./components/ActiveTrip";
import { SafetySettings } from "./components/SafetySettings";
import { BunChat } from "./components/BunChat";
import { BookingFlow } from "./components/BookingFlow";
import { authAPI, getToken } from "./utils/api";

import {
  Map,
  Settings,
  MessageCircle,
  Home,
  Route,
  ShoppingCart,
  LogOut,
  User,
} from "lucide-react";

type View =
  | "dashboard"
  | "planner"
  | "active-trip"
  | "settings"
  | "booking";

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentView, setCurrentView] =
    useState<View>("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [activeTrip, setActiveTrip] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const [bookingData, setBookingData] = useState<any>(null);

  // ✅ RESTORE LOGIN FROM MONGODB BACKEND
  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();

      if (token) {
        try {
          const response = await authAPI.getCurrentUser();

          if (response.success && response.user) {
            const userData = {
              id: response.user.customerId,
              name: response.user.name,
              email: response.user.email,
            };

            setCurrentUser(userData);
            localStorage.setItem(
              "customer",
              JSON.stringify(userData),
            );
          }
        } catch (error) {
          console.error("Session restore failed:", error);
          // Token invalid or expired, clear it
          localStorage.removeItem('authToken');
          localStorage.removeItem('customer');
        }
      }
    };

    restoreSession();
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("customer", JSON.stringify(user));
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("customer");
    setCurrentUser(null);
    setCurrentView("dashboard");
  };

  const handleStartBooking = (tripData: any) => {
    setBookingData(tripData);
    setCurrentView("booking");
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard
            userId={currentUser.id}
            userName={currentUser.name}
            onStartPlanning={() => setCurrentView("planner")}
            onViewTrip={() => setCurrentView("active-trip")}
          />
        );

      case "planner":
        return (
          <RoutePlanner onTripCreated={handleStartBooking} />
        );

      case "booking":
        return bookingData ? (
          <BookingFlow
            bookingData={bookingData}
            onComplete={() => {
              console.log(
                "BOOKING FINISHED, USING ORIGINAL ROUTE DATA",
              );

              setActiveTrip({
                from: bookingData?.startState || "Unknown",
                to:
                  bookingData?.destinationDistrict || "Unknown",
              });

              setBookingData(null);
              setCurrentView("active-trip");
            }}
          />
        ) : (
          <Dashboard
            userId={currentUser.id}
            userName={currentUser.name}
            onStartPlanning={() => setCurrentView("planner")}
            onViewTrip={() => setCurrentView("active-trip")}
          />
        );

      case "active-trip":
        return <ActiveTrip trip={activeTrip} />;

      case "settings":
        return <SafetySettings />;

      default:
        return (
          <Dashboard
            userId={currentUser.id}
            userName={currentUser.name}
            onStartPlanning={() => setCurrentView("planner")}
            onViewTrip={() => setCurrentView("active-trip")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Map className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-indigo-900">Travel Co</h1>
                <p className="text-gray-600 text-sm">
                  Safe Journeys for Seniors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">
                  {currentUser.name}
                </span>
              </div>

              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Bun
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-100 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4">
            <NavBtn
              label="Dashboard"
              icon={<Home />}
              active={currentView === "dashboard"}
              onClick={() => setCurrentView("dashboard")}
            />
            <NavBtn
              label="Plan Trip"
              icon={<Route />}
              active={currentView === "planner"}
              onClick={() => setCurrentView("planner")}
            />
            <NavBtn
              label="Book Travel"
              icon={<ShoppingCart />}
              active={currentView === "booking"}
              onClick={() => setCurrentView("booking")}
              disabled={!bookingData}
            />
            <NavBtn
              label="Active Trip"
              icon={<Map />}
              active={currentView === "active-trip"}
              onClick={() => setCurrentView("active-trip")}
              disabled={!activeTrip}
            />
            <NavBtn
              label="Safety Settings"
              icon={<Settings />}
              active={currentView === "settings"}
              onClick={() => setCurrentView("settings")}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      {isChatOpen && (
        <BunChat onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}

function NavBtn({
  label,
  icon,
  active,
  onClick,
  disabled = false,
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${active
        ? "bg-indigo-600 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon}
      {label}
    </button>
  );
}