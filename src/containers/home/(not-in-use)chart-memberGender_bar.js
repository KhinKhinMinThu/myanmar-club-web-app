import React from 'react';
import {
  Chart, Geom, Axis, Tooltip, Coord, Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';
// const data = [
//   {
//     action: 't1',
//     visitor: 500,
//     site: 'site1',
//   },
//   {
//     action: 't2',
//     visitor: 400,
//     site: 'site1',
//   },
//   {
//     action: 't3',
//     visitor: 300,
//     site: 'site1',
//   },
//   {
//     action: 't4',
//     visitor: 200,
//     site: 'site1',
//   },
//   {
//     action: 't5',
//     visitor: 100,
//     site: 'site1',
//   },
//   {
//     action: 't1',
//     visitor: 550,
//     site: 'site2',
//   },
//   {
//     action: 't2',
//     visitor: 420,
//     site: 'site2',
//   },
//   {
//     action: 't3',
//     visitor: 280,
//     site: 'site2',
//   },
//   {
//     action: 't4',
//     visitor: 150,
//     site: 'site2',
//   },
//   {
//     action: 't5',
//     visitor: 80,
//     site: 'site2',
//   },
// ];
/* eslint react/prop-types: 0 */
const MemberGenderChart = ({ membersAges }) => {
  const data = [];
  const ageRange = [];
  const membersAgesData = membersAges;
  membersAgesData.forEach((item) => {
    if (!ageRange.includes(item.range)) ageRange.push(item.range);
  });
  ageRange.forEach((item) => {
    const obj = { range: item };
    Object.entries(membersAgesData).forEach((entry) => {
      const value = entry[1];
      if (value.range === item) obj[value.gender] = value.count;
    });
    data.push(obj);
  });

  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['Male', 'Female'],
    key: 'gender',
    value: 'count',
    retains: ['range'],
  });
  const cols = {
    count: {
      tickInterval: 1,
    },
  };
  return (
    <div>
      <Chart height={400} data={dv} forceFit padding="auto" scale={cols}>
        <Legend />
        <Coord transpose />
        <Axis name="range" />
        <Axis name="count" />
        <Tooltip />
        <Geom type="intervalStack" position="range*count" color="gender" />
      </Chart>
      <br />
      <h1 style={{ textAlign: 'center' }}>Members Age-Groups and Genders</h1>
    </div>
  );
};

export default MemberGenderChart;
