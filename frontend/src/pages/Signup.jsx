import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization_name: "",
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
      await signup(form);
      navigate("/login", { replace: true });
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : "Unable to create account. Please try again."
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
            BUILT FOR GROWING BUSINESSES
          </span>

          <h1>
            Start small.
            <br />
            <span>Grow smarter.</span>
          </h1>

          <p>
            A simpler way to organize your inventory
            and stay in control of your business.
          </p>

          <div className="brand-feature">
            <Building2 size={24} />
            <div>
              <h4>Your own workspace</h4>
              <p>Manage inventory for your organization.</p>
            </div>
          </div>

          <div className="brand-feature">
            <ShieldCheck size={24} />
            <div>
              <h4>Private and secure</h4>
              <p>Keep your business data separate.</p>
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
            GET STARTED
          </span>

          <h2>Create your workspace.</h2>

          <p className="auth-subtitle">
            Set up your StockFlow account today.
          </p>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization_name">
                Organization name
              </label>

              <input
                id="organization_name"
                type="text"
                name="organization_name"
                placeholder="Your company name"
                value={form.organization_name}
                onChange={handleChange}
                autoComplete="organization"
                required
              />
            </div>

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
              <label htmlFor="password">Password</label>

              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
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
              {loading
                ? "Creating workspace..."
                : "Create workspace"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;