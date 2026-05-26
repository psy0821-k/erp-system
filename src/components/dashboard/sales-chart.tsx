'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Fab',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 4300,
  },
];

// #endregion
const StackedAreaChart = () => {
  return (
    <AreaChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      <RechartsDevtools />
    </AreaChart>
  );
};

export default StackedAreaChart;
