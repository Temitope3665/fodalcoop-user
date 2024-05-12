import { DashboardCard, cardData } from '@/components/dashboard-card';
import AreaChartComponent from '@/components/ui/area-chart-component';
import { dataA, dataB } from './data';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-default font-semibold text-sm">Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-4 overflow-y-auto">
        {cardData.map((data) => (
          <DashboardCard key={data.title} data={data} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 h-[40vh]">
        <div className="bg-white p-4 rounded-lg">
          <AreaChartComponent type="A" data={dataA} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <AreaChartComponent type="B" data={dataB} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
