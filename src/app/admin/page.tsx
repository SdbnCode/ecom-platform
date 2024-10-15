import prisma from "@/lib/prisma";

interface dashboardStatsProps {
  title: string;
  value: string | number;
  description: string;
}

function DashboardStats({ title, value, description }: dashboardStatsProps) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{description}</div>
    </div>
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
      <div className="stats stats-vertical shadow lg:stats-horizontal">
        <DashboardStats
          title="Sales"
          value={orders}
          description="Total sales"
        />
        <DashboardStats
          title="Revenue"
          value={Intl.NumberFormat("en-CA").format(revenue)}
          description="Total revenue"
        />
      </div>
    </div>
  );
}
