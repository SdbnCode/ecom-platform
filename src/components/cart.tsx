import CartItem from "../types/cartItem";

interface CartDisplayProps {
  cart: CartItem[];
}

export default function Cart({ cart }: CartDisplayProps) {
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.alt} className="h-48 w-auto" />
              <h3>{item.product}</h3>
              <p>{item.brand}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price} CAD</p>
            </div>
          ))}
          <button className="btn"> Remove </button>
          <p>Total: ${cartTotal} CAD</p>
          <button className="btn">Checkout</button>
        </div>
      )}
    </div>
  );
}
