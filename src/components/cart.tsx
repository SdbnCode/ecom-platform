import Image from "next/image";
import { useShoppingCart } from "../components/shoppingCart";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useShoppingCart();

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white py-10">
      <div className="w-full max-w-4xl rounded-md bg-white p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-6 gap-4 border-b pb-2 font-semibold text-gray-700">
              <label className="col-span-1 text-center">Item</label>
              <label className="col-span-2">Product</label>
              <label className="col-span-1">Brand</label>
              <label className="col-span-1 text-center">Quantity</label>
              <label className="col-span-1 text-right">Price</label>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center gap-4 border-b py-4"
              >
                <div className="col-span-1 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={96}
                    height={96}
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="col-span-2 font-medium text-gray-800">
                  {item.product}
                </h3>
                <p className="col-span-1 text-gray-600">{item.brand}</p>
                <div className="col-span-1 flex flex-col items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 rounded-md border text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <p className="col-span-1 text-right text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)} CAD
                </p>
              </div>
            ))}
            <div className="mt-6 flex flex-col items-end gap-2">
              <p className="text-xl font-semibold text-gray-800">
                Subtotal: ${cartTotal.toFixed(2)} CAD
              </p>
              <p className="text-sm text-gray-500">
                Shipping, taxes, and discounts are calculated at checkout.
              </p>
              <button className="btn btn-primary mt-4 rounded-md px-6 py-2 text-white">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
