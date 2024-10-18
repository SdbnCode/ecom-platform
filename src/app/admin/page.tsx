import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface dashboardStatsProps {
  title: string;
  value: string | number;
  description: string;
}

function DashboardStats({ title, value, description }: dashboardStatsProps) {
  return (
    <Card className="w-64 p-4 text-center">
      <CardHeader className="text-3xl font-bold">{title}</CardHeader>
      <CardContent className="text-3xl font-semibold">{value}</CardContent>
      <CardDescription className="text-lg">{description}</CardDescription>
    </Card>
  );
}

async function getStats() {
  const orderCount = await prisma.order.count();
  const orderAggregate = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  return {
    orders: orderCount,
    revenue: orderAggregate._sum.total || 0,
  };
}

export default async function AdminPage() {
  const { orders, revenue } = await getStats();

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex shadow">
        <DashboardStats
          title="Sales"
          value={Intl.NumberFormat("en-CA").format(orders)}
          description="Total sales"
        />
        <DashboardStats
          title="Revenue"
          value={Intl.NumberFormat("en-CA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(revenue)}
          description="Total revenue"
        />
      </div>
    </div>
  );
}
