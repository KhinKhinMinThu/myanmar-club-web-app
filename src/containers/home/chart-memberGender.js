import React from 'react';
import {
  Chart, Geom, Axis, Tooltip, Coord, Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

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
