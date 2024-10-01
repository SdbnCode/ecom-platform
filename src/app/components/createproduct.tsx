let items: HTMLElement | null = document.getElementById("product-section");
let cart: CartItem[] = JSON.parse(localStorage.getItem("data") || "[]");

export default function createProduct(): void {
    if (!items) return; // Ensure the items element exists
  
    items.innerHTML = itemData
      .map((item: Item) => {
        return `
        <div id="product-card-${item.id}" class="product-card">
          <img src="${item.image}" alt="${item.alt}">
          <div class="product-details">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
          </div>
          <button id="${item.id}" class="add-to-cart-button">Add to Cart</button>
        </div>
        `;
      })
      .join("");
  