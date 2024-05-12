import { DashboardCard, cardData } from '@/components/dashboard-card';

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-default font-semibold text-sm">Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-4 overflow-y-auto">
        {cardData.map((data) => (
          <DashboardCard key={data.title} data={data} />
        ))}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
