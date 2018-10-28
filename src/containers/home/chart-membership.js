import React from 'react';
import {
  Chart, Geom, Axis, Tooltip, Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const MembershipChart = ({
  newMembership,
  renewedMembership,
  expiringMembership,
}) => {
  const data = [
    { name: 'New Registrations', ...newMembership },
    { name: 'Renewed Membership', ...renewedMembership },
    { name: 'Expired Membership', ...expiringMembership },
  ];
  const ds = new DataSet();
  const dv = ds.createView().source(data);

  dv.transform({
    type: 'fold',
    fields: months,
    key: 'months',
    value: 'memberships',
  });
  return (
    <Chart height={400} data={dv} forceFit padding="auto">
      <Axis name="Months" />
      <Axis name="Memberships" />
      <Legend />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom
        type="interval"
        position="months*memberships"
        color="name"
        adjust={[
          {
            type: 'dodge',
            marginRatio: 1 / 32,
          },
        ]}
      />
    </Chart>
  );
};

export default MembershipChart;
