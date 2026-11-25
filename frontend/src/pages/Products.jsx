import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  SlidersHorizontal,
  RefreshCw,
  CheckCircle2,
  X,
  TriangleAlert,
  Trash2,
} from "lucide-react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      setEditingProduct(null);
      setShowForm(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    setSuccess(
      editingProduct
        ? "Product updated successfully."
        : "Product created successfully."
    );

    handleCloseForm();
    fetchProducts();
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    setDeleteLoading(true);
    setError("");

    try {
      await deleteProduct(deletingProduct.id);

      setSuccess("Product deleted successfully.");
      setDeletingProduct(null);

      await fetchProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Unable to delete product."
      );

      setDeletingProduct(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query);

    let matchesFilter = true;

    if (filter === "in-stock") {
      matchesFilter =
        product.quantity > product.low_stock_threshold;
    }

    if (filter === "low-stock") {
      matchesFilter =
        product.quantity > 0 &&
        product.quantity <= product.low_stock_threshold;
    }

    if (filter === "out-of-stock") {
      matchesFilter = product.quantity === 0;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            MANAGE YOUR STOCK
          </span>

          <h1>Inventory</h1>

          <p>
            Organize, track and manage your products.
          </p>
        </div>

        <button
          className="action-button"
          onClick={handleAdd}
        >
          <Plus size={20} />
          Add product
        </button>
      </div>

      {success && (
        <div className="success-message" role="status">
          <CheckCircle2 size={20} />

          <span>{success}</span>

          <button
            className="icon-button"
            onClick={() => setSuccess("")}
            aria-label="Dismiss notification"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <section className="inventory-section">
        <div className="section-header">
          <div>
            <h2>All products</h2>

            <p>
              {products.length} products in your workspace
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={fetchProducts}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="inventory-toolbar">
          <div className="search-box">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search by name or SKU..."
              aria-label="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <SlidersHorizontal size={18} />

            <select
              value={filter}
              aria-label="Filter by stock status"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="in-stock">In stock</option>
              <option value="low-stock">Low stock</option>
              <option value="out-of-stock">
                Out of stock
              </option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            <ProductTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={setDeletingProduct}
            />

            <div className="table-footer">
              Showing {filteredProducts.length} of{" "}
              {products.length} products
            </div>
          </>
        )}
      </section>

      {showForm && (
        <ProductForm
          key={editingProduct?.id ?? "new"}
          product={editingProduct}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {deletingProduct && (
        <div className="modal-overlay">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <div className="delete-modal-icon">
              <TriangleAlert size={30} />
            </div>

            <h2 id="delete-title">Delete product?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingProduct.name}</strong>?
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setDeletingProduct(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                className="danger-button"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                <Trash2 size={17} />

                {deleteLoading
                  ? "Deleting..."
                  : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;