'use client';
import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type GraphFillType = Record<string, JSX.Element>;

const graphFill: GraphFillType = {
  A: (
    <linearGradient id="A" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
    </linearGradient>
  ),
  B: (
    <linearGradient id="B" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
    </linearGradient>
  ),
};

export default function AreaChartComponent({
  type,
  data,
}: {
  type: string;
  data: { value: number; name: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>{graphFill[type]}</defs>
        <YAxis
          className="text-[#F5F5F5]"
          axisLine={false}
          fontWeight={300}
          fontSize={10}
        />
        <CartesianGrid
          // strokeDasharray="7 7"
          vertical={false}
          stroke="#F5F5F5"
        />
        <XAxis
          dataKey="name"
          className="text-[#F5F5F5]"
          axisLine={false}
          fontSize={10}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke={type === 'A' ? '#334DAA' : '#2DA588'}
          fill={`url(#${type})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
