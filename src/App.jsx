import React, { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import Header from "./components/Header";
import MenuCard from "./components/MenuCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import { fallbackMenu } from "./data/fallbackMenu";
import { supabase, supabaseReady } from "./lib/supabase";

const categories = ["All", "Pizza", "Pasta", "Burgers", "Indian", "Sides", "Desserts"];

function App() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMenu();
    loadOrders();
  }, []);

  async function loadMenu() {
    setLoadingMenu(true);

    if (!supabaseReady) {
      setMenu(fallbackMenu);
      setMessage("Demo menu is shown. Add your Supabase keys to connect the database.");
      setLoadingMenu(false);
      return;
    }

    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_available", true)
      .order("id");

    if (error) {
      setMenu(fallbackMenu);
      setMessage("Could not load the Supabase menu, so the sample menu is being shown.");
    } else {
      setMenu(data || []);
      setMessage("");
    }

    setLoadingMenu(false);
  }

  async function loadOrders() {
    if (!supabaseReady) return;

    setLoadingOrders(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    setOrders(data || []);
    setLoadingOrders(false);
  }

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const searchText = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        (item.description || "").toLowerCase().includes(searchText);
      return matchesCategory && matchesSearch;
    });
  }, [menu, category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(item) {
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });

    setShowCart(true);
  }

  function changeQuantity(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  function startCheckout() {
    if (cart.length === 0) return;
    setShowCart(false);
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function placeOrder(customer) {
    if (!supabaseReady) {
      setOrderPlaced(true);
      setCart([]);
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.customer_name,
        customer_phone: customer.customer_phone,
        customer_address: customer.customer_address,
        total_amount: cartTotal,
      })
      .select()
      .single();

    if (orderError) {
      setMessage(`Order could not be placed: ${orderError.message}`);
      return;
    }

    const items = cart.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemError } = await supabase.from("order_items").insert(items);

    if (itemError) {
      setMessage(`Order was created, but its items could not be saved: ${itemError.message}`);
      return;
    }

    setCart([]);
    setOrderPlaced(true);
    await loadOrders();
  }

  function backToMenu() {
    setShowCheckout(false);
    setOrderPlaced(false);
    window.location.hash = "menu";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (showCheckout) {
    return (
      <>
        <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
        <Checkout
          cart={cart}
          total={cartTotal}
          onBack={() => setShowCheckout(false)}
          onPlaceOrder={placeOrder}
          orderPlaced={orderPlaced}
          onMenu={backToMenu}
        />
      </>
    );
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="hero-badge"><Sparkles size={15} /> Made fresh for you</span>
            <h1>Good food.<br /><em>Good mood.</em></h1>
            <p>Comforting favorites, freshly prepared and delivered to your door.</p>
            <a className="primary-button hero-button" href="#menu">Explore the menu</a>
          </div>

          <div className="hero-food">
            <div className="hero-circle"></div>
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh meal on a table"
            />
            <div className="floating-note">
              <span>Today's pick</span>
              <strong>Made with care </strong>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="menu-top">
            <div className="section-heading">
              <span className="eyebrow">OUR MENU</span>
              <h2>Something for every craving.</h2>
              <p>Pick a favorite, add it to your bag, and let us handle the rest.</p>
            </div>

            <div className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search dishes..."
              />
            </div>
          </div>

          <div className="category-row">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-button active" : "category-button"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {message && <div className="info-message">{message}</div>}

          {loadingMenu ? (
            <div className="loading-state">Loading today&apos;s menu...</div>
          ) : filteredMenu.length === 0 ? (
            <div className="empty-menu">
              <h3>Nothing matched that craving.</h3>
              <p>Try another search or category.</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        <Orders orders={orders} loading={loadingOrders} />

        <section className="mini-banner">
          <div>
            <span className="eyebrow">TASTETABLE</span>
            <h2>One more bite?</h2>
          </div>
          <a href="#menu" className="outline-button">Browse menu</a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">TasteTable</div>
        <p>Simple food. Thoughtfully served.</p>
      </footer>

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
          onCheckout={startCheckout}
        />
      )}
    </div>
  );
}

export default App;