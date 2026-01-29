import { useState } from "react";
import { authAPI } from "../utils/api";

interface LoginProps {
  onLogin: (user: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    emergencyContact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const {
      name,
      email,
      password,
      phone,
      age,
      emergencyContact,
    } = formData;

    try {
      // ================= SIGN UP =================
      if (isSignUp) {
        console.log("🔵 Signing up user...");

        const response = await authAPI.signup({
          name,
          email,
          password,
          phone,
          age: age ? parseInt(age) : undefined,
          emergencyContact,
        });

        console.log("✅ Signup successful:", response);
        alert("Account created! Please log in.");
        setIsSignUp(false);
      }

      // ================= LOGIN =================
      else {
        console.log("🔵 Logging in...");

        const response = await authAPI.login({
          email,
          password,
        });

        console.log("✅ Login successful:", response);

        const userData = {
          id: response.user.customerId,
          name: response.user.name,
          email: response.user.email,
        };

        localStorage.setItem(
          "customer",
          JSON.stringify(userData),
        );
        onLogin(userData);
      }
    } catch (err: any) {
      console.error("❌ Error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-gray-900 mb-4 text-xl font-semibold">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          {isSignUp && (
            <>
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
              <input
                name="age"
                placeholder="Age"
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {isLoading
              ? "Please wait..."
              : isSignUp
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isSignUp
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}