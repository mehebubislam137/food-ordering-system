import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

function Checkout({
  cart,
  total,
  onBack,
  onPlaceOrder,
  orderPlaced,
}) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onPlaceOrder(form);
  };

  if (orderPlaced) {
    return (
      <section className="checkout-page success-page">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={42} />
          </div>

          <span className="eyebrow">
            ORDER CONFIRMED
          </span>

          <h1>Thanks for ordering!</h1>

          <p>
            Your order has been placed successfully.
            We&apos;ll start preparing it shortly.
          </p>

          <button
            className="primary-button"
            onClick={onBack}
          >
            Back to menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={18} />
        Back to cart
      </button>

      <div className="checkout-grid">
        <div className="checkout-form-card">
          <span className="eyebrow">
            CHECKOUT
          </span>

          <h1>Almost there.</h1>

          <p className="muted-text">
            Tell us where to deliver your meal.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Full name

              <input
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Phone number

              <input
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                required
              />
            </label>

            <label>
              Delivery address

              <textarea
                name="customer_address"
                value={form.customer_address}
                onChange={handleChange}
                placeholder="House number, street, area..."
                rows="4"
                required
              />
            </label>

            <button
              className="primary-button full-button"
              type="submit"
            >
              Place order · ₹{total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="order-preview">
          <span className="eyebrow">
            ORDER SUMMARY
          </span>

          <h2>Your meal</h2>

          {cart.map((item) => (
            <div
              className="preview-item"
              key={item.id}
            >
              <div>
                <strong>{item.name}</strong>

                <span>
                  Qty {item.quantity}
                </span>
              </div>

              <b>
                ₹{(
                  item.price * item.quantity
                ).toFixed(2)}
              </b>
            </div>
          ))}

          <div className="preview-total">
            <span>Total</span>

            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;

