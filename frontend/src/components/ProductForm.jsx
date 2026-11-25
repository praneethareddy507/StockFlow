import { useState } from "react";
import { X, Package, Plus, Save } from "lucide-react";
import {
  createProduct,
  updateProduct,
} from "../services/productService";

const ProductForm = ({
  product = null,
  onClose,
  onSuccess,
}) => {
  const isEditing = Boolean(product);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    quantity: product?.quantity ?? 0,
    price: product?.price ?? "",
    low_stock_threshold:
      product?.low_stock_threshold ?? 5,
  });

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

    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
      low_stock_threshold: Number(
        form.low_stock_threshold
      ),
    };

    try {
      if (isEditing) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }

      onSuccess();
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : "Unable to save product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
      >
        <div className="modal-header">
          <div className="modal-heading">
            <div className="modal-icon">
              <Package size={24} />
            </div>

            <div>
              <h2 id="product-form-title">
                {isEditing
                  ? "Edit product"
                  : "Add new product"}
              </h2>

              <p>
                {isEditing
                  ? "Update your product details."
                  : "Expand your inventory."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product-name">
              Product name
            </label>

            <input
              id="product-name"
              name="name"
              type="text"
              placeholder="e.g. Wireless Mouse"
              value={form.name}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">
              SKU (Stock Keeping Unit)
            </label>

            <input
              id="sku"
              name="sku"
              type="text"
              placeholder="e.g. WM-001"
              value={form.sku}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">
                Quantity
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Unit price (₹)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="low_stock_threshold">
              Low stock threshold
            </label>

            <input
              id="low_stock_threshold"
              name="low_stock_threshold"
              type="number"
              min="0"
              step="1"
              value={form.low_stock_threshold}
              onChange={handleChange}
              required
            />

            <small className="field-hint">
              Flag this product when stock reaches
              or falls below this quantity.
            </small>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="action-button"
              disabled={loading}
            >
              {isEditing ? (
                <Save size={18} />
              ) : (
                <Plus size={18} />
              )}

              {loading
                ? "Saving..."
                : isEditing
                ? "Save changes"
                : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;