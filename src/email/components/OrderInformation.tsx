import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

type OrderInformationProps = {
  order: { id: string; createdAt: Date; total: number };
  product: { image: string; name: string; description: string };
};

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export function OrderInformation({ order, product }: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="whitespaces-nowrap mb-0 mr-4 text-nowrap text-gray-500">
              {" "}
              Order ID
            </Text>
            <Text className="mb-0 mr-4"> {order.id}</Text>
          </Column>
          <Column>
            <Text className="whitespaces-nowrap mb-0 mr-4 text-nowrap text-gray-500">
              Purchased On
            </Text>
            <Text className="mb-0 mr-4">
              {" "}
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className="whitespaces-nowrap mb-0 mr-4 text-nowrap text-gray-500">
              Price Paid
            </Text>
            <Text className="mb-0 mr-4"> {order.total}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="my-4 rounded-lg border border-solid border-gray-500 p-4 md:p-6">
        <Img
          width="100%"
          height={100}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.image}`}
          alt={product.name}
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="m-0 mr-4 text-lg font-bold">{product.name}</Text>
          </Column>
          <Column align="right">
            <Button
              className="rounded bg-red-600 px-6 py-4 text-lg text-white"
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/receipt/${order.id}`}
            >
              Check your Reciept Here
            </Button>
          </Column>
          <Row>
            <Column>
              <Text className="mb-0 text-gray-500"> {product.description}</Text>
            </Column>
          </Row>
        </Row>
      </Section>
    </>
  );
}
