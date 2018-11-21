import React from 'react';
import {
  Chart, Geom, Axis, Tooltip, Legend, Label,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
// const prepareList1 = (membershipList) => {
//   const months = Object.keys(membershipList);
//   console.log('Returned months: ', months);
//   const intersection = allmonths.filter(e => months.indexOf(e) > -1);
//   console.log('Filtered months: ', intersection);
//   return intersection;
// };

const getMonths = (membershipList) => {
  const months = [];
  membershipList.forEach(item => months.push(Object.keys(item)[0]));
  return months;
};
const prepareList = (membershipList) => {
  const jsonList = {};
  membershipList.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    jsonList[key] = value;
  });
  return jsonList;
};

const MembershipChart = ({
  newMembership,
  renewedMembership,
  expiringMembership,
}) => {
  const data = [
    { name: 'New Registrations', ...prepareList(newMembership) },
    { name: 'Renewed Membership', ...prepareList(renewedMembership) },
    { name: 'Expired Membership', ...prepareList(expiringMembership) },
  ];
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  const year = new Date().getFullYear();

  dv.transform({
    type: 'fold',
    fields: getMonths(newMembership),
    key: 'months',
    value: 'memberships',
  });
  return (
    <div>
      <Chart height={400} data={dv} forceFit padding={[50, 0, 80, 50]}>
        <Axis name="Months" />
        <Axis name="Memberships" />
        <Legend />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom
          type="interval"
          position="months*memberships"
          color="name"
          adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
        >
          <Label
            content={[
              'memberships',
              memberships => (memberships === 0 ? '' : `${memberships}`),
            ]}
            offset={10}
          />
        </Geom>
      </Chart>
      <br />
      <h1 style={{ textAlign: 'center' }}>
        {`Membership Information ${year} - ${year + 1}`}
      </h1>
    </div>
  );
};

export default MembershipChart;
