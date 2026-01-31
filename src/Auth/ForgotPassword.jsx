import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Check your email 📩 — we’ve sent you a password reset link",
        {
          duration: 5000,
        },
      );
      setEmail("");
    } catch (err) {
      toast.error("Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Mail size={26} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Forgot your password?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We’ll email you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Sending…
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>{" "}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ForgotPassword;
