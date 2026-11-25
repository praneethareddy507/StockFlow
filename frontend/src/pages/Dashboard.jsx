import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Boxes,
  TriangleAlert,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { getDashboard } from "../services/dashboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setError("Unable to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading your workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <TriangleAlert size={36} />
        <h3>Something went wrong</h3>
        <p>{error}</p>

        <button
          className="action-button"
          onClick={fetchDashboard}
        >
          <RefreshCw size={17} />
          Try again
        </button>
      </div>
    );
  }

  const stats = [
    {
      title: "Total products",
      value: dashboard.total_products,
      icon: Package,
      description: "Unique products in inventory",
      type: "green",
    },
    {
      title: "Stock units",
      value: dashboard.total_quantity,
      icon: Boxes,
      description: "Total available inventory",
      type: "green",
    },
    {
      title: "Low stock",
      value: dashboard.low_stock_count,
      icon: TriangleAlert,
      description: "Products needing attention",
      type: "orange",
    },
  ];

  const lowStockProducts =
    dashboard.low_stock_products || [];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            YOUR WORKSPACE
          </span>

          <h1>Inventory overview</h1>

          <p>
            Everything in stock, in one place.
          </p>
        </div>

        <Link
          to="/products?add=true"
          className="action-button"
        >
          <Plus size={19} />
          Add product
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="stat-card"
              key={stat.title}
            >
              <div className="stat-card-top">
                <div
                  className={`stat-icon ${stat.type}`}
                >
                  <Icon size={23} />
                </div>
              </div>

              <p className="stat-title">
                {stat.title}
              </p>

              <h2 className="stat-value">
                {Number(stat.value).toLocaleString()}
              </h2>

              <span className="stat-description">
                {stat.description}
              </span>
            </div>
          );
        })}
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Needs attention</h2>
            <p>Products running low on stock.</p>
          </div>

          <Link
            to="/products"
            className="text-link"
          >
            View inventory
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="empty-state">
            <CheckCircle2
              size={40}
              className="success-icon"
            />

            <h3>You're all stocked up!</h3>

            <p>
              No products are currently below or
              at their stock threshold.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-name-cell">
                        <div className="product-icon">
                          <Package size={19} />
                        </div>

                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.sku}</td>

                    <td>{product.quantity}</td>

                    <td>
                      {product.low_stock_threshold}
                    </td>

                    <td>
                      <span
                        className={`stock-badge ${
                          product.quantity === 0
                            ? "out-of-stock"
                            : "low-stock"
                        }`}
                      >
                        {product.quantity === 0
                          ? "Out of stock"
                          : "Low stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;