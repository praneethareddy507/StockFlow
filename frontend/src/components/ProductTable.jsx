import {
  Package,
  Pencil,
  Trash2,
  PackageOpen,
} from "lucide-react";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}) => {
  const getStockStatus = (product) => {
    if (product.quantity === 0) {
      return {
        label: "Out of stock",
        className: "out-of-stock",
      };
    }

    if (
      product.quantity <= product.low_stock_threshold
    ) {
      return {
        label: "Low stock",
        className: "low-stock",
      };
    }

    return {
      label: "In stock",
      className: "in-stock",
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <PackageOpen size={44} />

        <h3>No products found</h3>

        <p>
          Add a product or try changing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Product name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Threshold</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const status = getStockStatus(product);

            return (
              <tr key={product.id}>
                <td>
                  <div className="product-name-cell">
                    <div className="product-icon">
                      <Package size={20} />
                    </div>

                    <strong>{product.name}</strong>
                  </div>
                </td>

                <td>
                  <span className="sku-text">
                    {product.sku}
                  </span>
                </td>

                <td>{product.quantity}</td>

                <td>{formatPrice(product.price)}</td>

                <td>
                  {product.low_stock_threshold}
                </td>

                <td>
                  <span
                    className={`stock-badge ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="icon-button edit-button"
                      title="Edit product"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => onEdit(product)}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      className="icon-button delete-button"
                      title="Delete product"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;