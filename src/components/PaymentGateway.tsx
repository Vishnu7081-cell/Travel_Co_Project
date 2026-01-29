import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Lock,
  Shield,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { paymentsAPI, tripsAPI } from "../utils/api";

interface PaymentGatewayProps {
  bookingDetails: any; // must contain trip_id
  totalAmount: number;
  onPaymentComplete: (paymentInfo: any) => void;
  onBack: () => void;
}

export function PaymentGateway({
  bookingDetails,
  totalAmount,
  onPaymentComplete,
  onBack,
}: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "upi" | "netbanking" | "wallet"
  >("card");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
  ];

  const wallets = [
    "Paytm",
    "PhonePe",
    "Google Pay",
    "Amazon Pay",
    "Mobikwik",
  ];

  // 🔥 HANDLE PAYMENT
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const storedUser = JSON.parse(
        localStorage.getItem("customer") || "{}",
      );

      if (!storedUser?.id) {
        alert("User not logged in");
        return;
      }

      if (!bookingDetails?.trip_id) {
        alert("Trip details missing");
        return;
      }

      const transactionId =
        "TXN" +
        Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase();

      // Map frontend keys to backend enum values
      const methodMap: Record<string, string> = {
        card: "Credit Card",
        upi: "UPI",
        netbanking: "Net Banking",
        wallet: "Wallet",
      };

      // 1️⃣ Insert into payments table
      const paymentResponse = await paymentsAPI.create({
        tripId: bookingDetails.trip_id,
        customerId: storedUser.id,
        amount: totalAmount,
        paymentMethod: methodMap[paymentMethod] || "UPI",
        transactionId: transactionId,
        status: "Success", // Match backend enum ['Pending', 'Success', 'Failed', 'Refunded']
        paymentGateway: "Manual",
      });

      if (!paymentResponse.success) {
        alert("Payment failed");
        return;
      }

      // 2️⃣ Update trip payment status
      const tripUpdateResponse = await tripsAPI.update(bookingDetails.trip_id, {
        paymentStatus: "Paid",
      });

      if (!tripUpdateResponse.success) {
        alert("Trip status update failed");
        return;
      }

      // 3️⃣ Success UI
      setPaymentSuccess(true);

      setTimeout(() => {
        onPaymentComplete({
          method: paymentMethod,
          amount: totalAmount,
          transactionId,
          status: "success",
          trip_id: bookingDetails.trip_id,
        });
      }, 2000);
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong during payment: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-12 shadow-md border text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking is confirmed. Redirecting to trip
            details...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Summary
        </button>
        <h2 className="text-gray-900 mb-2">Secure Payment</h2>
        <p className="text-gray-600">
          Complete your payment to confirm your booking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="text-gray-900 mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  key: "card",
                  icon: CreditCard,
                  label: "Card",
                },
                { key: "upi", icon: Smartphone, label: "UPI" },
                {
                  key: "netbanking",
                  icon: Building2,
                  label: "Net Banking",
                },
                {
                  key: "wallet",
                  icon: Wallet,
                  label: "Wallet",
                },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setPaymentMethod(key as any)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${paymentMethod === key
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200"
                    }`}
                >
                  <Icon className="w-6 h-6 text-gray-700" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border">
            <form
              onSubmit={handlePayment}
              className="space-y-6"
            >
              {paymentMethod === "card" && (
                <>
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    className="w-full p-4 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    required
                    className="w-full p-4 border rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className="p-4 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      className="p-4 border rounded-lg"
                    />
                  </div>
                </>
              )}

              {paymentMethod === "upi" && (
                <input
                  type="text"
                  placeholder="yourname@upi"
                  required
                  className="w-full p-4 border rounded-lg"
                />
              )}

              {paymentMethod === "netbanking" && (
                <select
                  required
                  className="w-full p-4 border rounded-lg"
                >
                  <option value="">Choose Bank</option>
                  {banks.map((bank) => (
                    <option key={bank}>{bank}</option>
                  ))}
                </select>
              )}

              {paymentMethod === "wallet" && (
                <select
                  required
                  className="w-full p-4 border rounded-lg"
                >
                  <option value="">Choose Wallet</option>
                  {wallets.map((wallet) => (
                    <option key={wallet}>{wallet}</option>
                  ))}
                </select>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-green-600 text-white py-4 rounded-xl"
              >
                {processing
                  ? "Processing..."
                  : `Pay ₹${totalAmount}`}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-md border sticky top-4">
            <h3 className="text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="flex justify-between mb-2">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="text-sm text-gray-500 mt-4 flex gap-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              Secure encrypted payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}