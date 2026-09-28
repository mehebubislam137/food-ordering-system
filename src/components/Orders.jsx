import React from "react";
import {
  Clock3,
  PackageCheck,
} from "lucide-react";

function Orders({ orders, loading }) {
  return (
    <section
      className="orders-section"
      id="orders"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            YOUR ORDERS
          </span>

          <h2>Order history</h2>
        </div>
      </div>

      {loading ? (
        <p className="muted-text">
          Loading your orders...
        </p>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <PackageCheck size={30} />

          <h3>No orders yet</h3>

          <p>
            Your completed orders will appear
            here.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article
              className="order-card"
              key={order.id}
            >
              <div className="order-main">
                <div>
                  <span className="order-number">
                    Order #{order.id}
                  </span>

                  <h3>
                    ₹{Number(
                      order.total_amount
                    ).toFixed(2)}
                  </h3>
                </div>

                <span
                  className={`status ${String(
                    order.status
                  )
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-meta">
                <span>
                  <Clock3 size={15} />

                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </span>

                <span>
                  {order.customer_name}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;

