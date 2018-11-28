import React from 'react';
import {
  Chart, Tooltip, Legend, Facet,
} from 'bizcharts';

/* eslint react/prop-types: 0 */
const MemberGenderChart = ({ membersAges }) => {
  const tmp = membersAges;
  const scale = {
    range: {
      sync: true,
      tickCount: 0,
    },
    count: {
      sync: true,
      tickInterval: 1,
    },
    gender: {
      sync: true,
    },
  };
  return (
    <div>
      <Chart
        height={400}
        data={tmp}
        scale={scale}
        padding={[50, 0, 80, 50]}
        forceFit
      >
        <Tooltip />
        <Legend />
        <Facet
          type="mirror"
          fields={['gender']}
          transpose
          eachView={(view) => {
            view
              .interval()
              .position('range*count')
              .color('gender', [
                'rgb(113,192,235, 0.7)',
                'rgb(246,170,203, 0.5)',
              ]);
          }}
        />
      </Chart>
      <h1 style={{ textAlign: 'center' }}>Members Age-Groups and Genders</h1>
    </div>
  );
};

export default MemberGenderChart;
