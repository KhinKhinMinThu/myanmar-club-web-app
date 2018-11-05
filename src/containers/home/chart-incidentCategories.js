import React from 'react';
import {
  Chart, Geom, Axis, Tooltip,
} from 'bizcharts';

/* eslint react/prop-types: 0 */
const IncidentCategoriesChart = ({ incidentCategories }) => {
  const cols = {
    total: {
      tickInterval: 1,
    },
  };
  return (
    <div>
      <Chart height={400} data={incidentCategories} scale={cols} forceFit>
        <Axis name="type" />
        <Axis name="total" />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="interval" position="type*total" />
      </Chart>
    </div>
  );
};

export default IncidentCategoriesChart;
