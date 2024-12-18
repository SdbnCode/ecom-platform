import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    description: string;
    image: string;
    imagePath: string;
  };
  order: { id: string; createdAt: Date; total: number };
};

ProductReceiptEmail.PreviewProps = {
  product: {
    name: "Product Name",
    imagePath: "",
    description: "Product Description",
    image: "Product Image",
  },
  order: { id: crypto.randomUUID(), createdAt: new Date(), total: 100 },
} satisfies PurchaseReceiptEmailProps;

export default function ProductReceiptEmail({
  product,
  order,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>
        Your order from Athlete&apos;s Arena has been recieved! {product.name}
      </Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans"></Body>
        <Container className="max-w-xl">
          <Heading> Purchase Receipt</Heading>
          <OrderInformation order={order} product={product}></OrderInformation>
        </Container>
      </Tailwind>
    </Html>
  );
}
