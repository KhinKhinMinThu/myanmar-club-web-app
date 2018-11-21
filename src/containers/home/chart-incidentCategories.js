import React from 'react';
import {
  Chart, Geom, Axis, Tooltip, Label,
} from 'bizcharts';

/* eslint react/prop-types: 0 */
const IncidentCategoriesChart = ({ incidentCategories }) => {
  const cols = {
    total: {
      tickInterval: 1,
    },
  };
  incidentCategories.sort((a, b) => b.total - a.total);
  const year = new Date().getFullYear();
  return (
    <div>
      <Chart height={400} data={incidentCategories} scale={cols} forceFit>
        <Axis name="type" />
        <Axis name="total" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="type*total">
          <Label
            content={['total', total => (total === 0 ? '' : `${total}`)]}
            offset={10}
          />
        </Geom>
      </Chart>
      <h1 style={{ textAlign: 'center' }}>{`Incident Types in ${year}`}</h1>
    </div>
  );
};

export default IncidentCategoriesChart;
