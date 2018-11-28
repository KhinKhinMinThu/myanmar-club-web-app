import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  // Legend,
  Guide,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */

const MemberAgeChart = ({ membersAges }) => {
  const { DataView } = DataSet;
  const { Text } = Guide;
  const dv = new DataView();

  const total = Object.values(membersAges).reduce((a, b) => a + b, 0);
  const totalMembers = 'Total Members: '.concat(total);

  const data = [];
  Object.entries(membersAges).forEach((item) => {
    if (item[1] !== 0) {
      data.push({
        ageRange: `Age ${item[0]}`,
        count: (item[1] * 100) / total,
      });
    }
  });
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'ageRange',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: val => `${(val * 100).toFixed(2)}%`,
    },
  };
  return (
    <Chart
      height={400}
      data={dv}
      scale={cols}
      padding={[0, 100, 0, 80]}
      forceFit
    >
      <Coord type="theta" radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      {/* <Legend
        position="right"
        // offsetY={-window.innerHeight / 2 + 120}
        offsetY={-400 / 2 + 120}
        offsetX={-150}
      /> */}
      <Tooltip
        showTitle={false}
        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
      />
      <Guide>
        <Text
          position={['50%', '50%']}
          content={totalMembers}
          style={{
            fontSize: '16',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          alignX="middle"
          alignY="middle"
        />
      </Guide>
      <Geom
        type="intervalStack"
        position="percent"
        color="ageRange"
        tooltip={[
          'ageRange*percent',
          (item, percent) => ({
            name: item,
            value: `${(percent * 100).toFixed(2)}%`,
          }),
        ]}
        guide={totalMembers}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      >
        <Label
          content="percent"
          formatter={(val, item) => `${item.point.ageRange}: ${val}`}
        />
      </Geom>
    </Chart>
  );
};

export default MemberAgeChart;
