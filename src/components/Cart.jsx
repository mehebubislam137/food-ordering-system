import React from "react";
import {
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

function Cart({
  cart,
  onClose,
  onChangeQuantity,
  onRemove,
  onCheckout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="cart-overlay"
      onClick={onClose}
    >
      <aside
        className="cart-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-head">
          <div>
            <span className="eyebrow">
              YOUR BAG
            </span>

            <h2>Your order</h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={21} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              🥢
            </div>

            <h3>Your cart is waiting</h3>

            <p>
              Add something delicious from the
              menu to get started.
            </p>

            <button
              className="primary-button"
              onClick={onClose}
            >
              Explore menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h4>{item.name}</h4>

                    <span>
                      ₹{Number(item.price).toFixed(0)}
                    </span>

                    <div className="quantity-row">
                      <button
                        onClick={() =>
                          onChangeQuantity(item.id, -1)
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <b>{item.quantity}</b>

                      <button
                        onClick={() =>
                          onChangeQuantity(item.id, 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      onRemove(item.id)
                    }
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>
                  ₹{total.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong className="free">
                  FREE
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  ₹{total.toFixed(2)}
                </strong>
              </div>

              <button
                className="primary-button checkout-button"
                onClick={onCheckout}
              >
                Continue to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;

