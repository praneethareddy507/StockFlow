import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ArrowRight,
  Eye,
  EyeOff,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Unable to sign in. Please check your credentials or connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-brand-panel">
        <div className="brand-logo">
          <Package size={30} />
          <span>stockflow.</span>
        </div>

        <div className="brand-content">
          <span className="brand-tag">
            SMART INVENTORY MANAGEMENT
          </span>

          <h1>
            Less chaos.
            <br />
            <span>More control.</span>
          </h1>

          <p>
            Manage your products, monitor stock levels,
            and keep your business moving.
          </p>

          <div className="brand-feature">
            <Boxes size={24} />
            <div>
              <h4>Inventory simplified</h4>
              <p>All your products in one workspace.</p>
            </div>
          </div>

          <div className="brand-feature">
            <ShieldCheck size={24} />
            <div>
              <h4>Secure workspace</h4>
              <p>Your organization. Your data.</p>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          © 2026 StockFlow
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <span className="auth-eyebrow">
            YOUR WORKSPACE
          </span>

          <h2>Welcome back.</h2>

          <p className="auth-subtitle">
            Sign in to manage your inventory.
          </p>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            New to StockFlow?{" "}
            <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;