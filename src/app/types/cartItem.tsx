interface CartItem {
  id: number;
  brand: string;
  product: string;
  price: number;
  quantity: number;
}

interface Item {
  id: number;
  brand: string;
  product: string;
  price: number;
  image: string;
  alt: string;
}

export default CartItem;
