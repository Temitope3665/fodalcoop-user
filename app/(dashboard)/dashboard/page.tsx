'use server';
import { DashboardCard } from '@/components/dashboard-card';
import AreaChartComponent from '@/components/ui/area-chart-component';
import { dataA, dataB } from './data';
import DashboardGuarantors from '@/components/dashboard/guarantors';

export default async function Dashboard() {
  return (
    <div className="space-y-8 pb-4">
      <h1 className="text-default font-semibold text-sm">Dashboard</h1>
      <div className="">
        <DashboardCard />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 h-[40vh]">
        <div className="bg-white p-4 rounded-lg">
          <AreaChartComponent type="A" data={dataA} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <AreaChartComponent type="B" data={dataB} />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-defalt font-semibold text-[14px]">
          Guarantor requests
        </h1>
        <div className=" w-full gap-4">
          <DashboardGuarantors />
        </div>
      </div>
    </div>
  );
}
