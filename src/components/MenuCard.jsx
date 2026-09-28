import React from "react";
import { Plus } from "lucide-react";

function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <div className="food-image-wrap">
        <img src={item.image_url} alt={item.name} />

        <span className="category-tag">
          {item.category}
        </span>
      </div>

      <div className="food-info">
        <div>
          <h3>{item.name}</h3>

          <p>
            {item.description}
          </p>
        </div>

        <div className="food-bottom">
          <strong>
            ₹{Number(item.price).toFixed(0)}
          </strong>

          <button
            className="add-button"
            onClick={() => onAdd(item)}
          >
            <Plus size={17} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;

