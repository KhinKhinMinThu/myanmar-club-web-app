import React from 'react';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Label,
  View,
  Guide,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
const MemberAgeChart = ({ membersAges }) => {
  const { DataView } = DataSet;
  const data = [];
  const ageRange = [];
  const membersAgesData = membersAges;

  const dv = new DataView();
  const { Text } = Guide;
  let totalMembers = 0;
  membersAgesData.forEach((item) => {
    if (!ageRange.includes(item.range)) ageRange.push(item.range);
  });

  membersAgesData.forEach((item) => {
    const index = ageRange.indexOf(item.range);
    data.push({
      count: item.count,
      range: item.range,
      gender: `${index + 1}: ${item.gender}`,
    });
    totalMembers += item.count;
  });

  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'range',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: val => `${(val * 100).toFixed(2)}%`,
    },
  };
  const dv1 = new DataView();
  dv1.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'gender',
    as: 'percent',
  });
  return (
    <div>
      <Chart
        height={450}
        data={dv}
        scale={cols}
        // padding={[80, 100, 80, 80]}
        padding={[80, 100, 50, 100]}
        forceFit
      >
        <Coord type="theta" radius={0.8} innerRadius={0.2} />
        <Legend />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Legend name="gender" visible={false} />
        <Guide>
          <Text
            position={['50%', '50%']}
            content={`Total:\n${totalMembers}`}
            style={{
              fontSize: '12',
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
          color="range"
          tooltip={[
            'range*percent',
            (item, percent) => ({
              name: item,
              value: `${(percent * 100).toFixed(2)}%`,
            }),
          ]}
          guide={totalMembers}
          style={{ lineWidth: 1, stroke: '#fff' }}
          select={false}
        >
          <Label
            content={[
              'range*percent',
              (range, percent) => `${range}:\n${(percent * 100).toFixed(2)}%`,
            ]}
            offset={-10}
          />
        </Geom>
        <View data={dv1} scale={cols}>
          <Coord type="theta" radius={0.95} innerRadius={0.8 / 0.95} />
          <Geom
            type="intervalStack"
            position="percent"
            color={[
              'gender',
              [
                '#BAE7FF',
                '#7FC9FE',
                '#71E3E3',
                '#ABF5F5',
                '#8EE0A1',
                '#BAF5C4',
                '#9b9bff',
                '#b4b4ff',
                '#cdcdff',
              ],
            ]}
            tooltip={[
              'gender*percent',
              (item, percent) => ({
                name: item.substring(item.indexOf(':') + 1, item.length),
                value: `${(percent * 100).toFixed(2)}%`,
              }),
            ]}
            style={{ lineWidth: 1, stroke: '#fff' }}
            select={false}
          >
            <Label
              content={[
                'gender*percent',
                (gender, percent) => `${gender.substring(
                  gender.indexOf(':') + 1,
                  gender.length,
                )}: ${(percent * 100).toFixed(2)}%`,
              ]}
            />
          </Geom>
        </View>
      </Chart>
    </div>
  );
};

export default MemberAgeChart;
