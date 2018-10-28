import React, { Component } from 'react';
import colormap from 'colormap';
import { Radio, Alert } from 'antd';
import {
  Chart, Geom, Axis, Tooltip, Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
class EventFinanceChart extends Component {
  state = { period: '1' };

  onChange = (e) => {
    this.setState({ period: e.target.value });
  };

  render() {
    const { eventsFinance } = this.props;
    const { period } = this.state;
    const { DataView } = DataSet;
    let data = [];
    let categories = [];
    if (period === '1') {
      data = eventsFinance.filter(
        item => item.month === 'JAN'
          || item.month === 'FEB'
          || item.month === 'MAR'
          || item.month === 'APR',
      );
    } else if (period === '2') {
      data = eventsFinance.filter(
        item => item.month === 'MAY'
          || item.month === 'JUN'
          || item.month === 'JUL'
          || item.month === 'AUG',
      );
    } else {
      data = eventsFinance.filter(
        item => item.month === 'SEP'
          || item.month === 'OCT'
          || item.month === 'NOV'
          || item.month === 'DEC',
      );
    }
    data.forEach((item) => {
      categories.push(...Object.keys(item));
    });
    categories = categories.filter(
      item => item !== 'eventId' && item !== 'name' && item !== 'month',
    );

    // console.log('fianance', eventsFinance);
    // console.log('data', data);
    // console.log('cat', categories);
    const dv = new DataView();
    if (data.length > 0) {
      dv.source(data)
        .transform({
          type: 'fold',
          fields: categories,
          key: 'category',
          value: 'totalamt',
          retains: ['name', 'eventId', 'month'],
        })
        .transform({
          type: 'map',
          callback: (obj) => {
            const key = obj.category;
            let type;
            if (key.substr(0, key.indexOf('-') - 1) === 'income') {
              type = 'a';
            } else {
              type = 'b';
            }
            const object = { ...obj, type };
            return object;
          },
        });
    }

    const colorMap = colormap({
      colormap: 'jet',
      nshades: categories.length < 7 ? 7 : categories.length,
      format: 'hex',
      alpha: 1,
    });
    const cols = {
      totalamt: {
        tickInterval: 50,
      },
    };
    return (
      <div style={{ textAlign: 'center' }}>
        Select a period to view:&nbsp;
        <Radio.Group
          defaultValue="1"
          onChange={this.onChange}
          buttonStyle="solid"
        >
          <Radio.Button value="1">January - April</Radio.Button>
          <Radio.Button value="2">May - August</Radio.Button>
          <Radio.Button value="3">September - December</Radio.Button>
        </Radio.Group>
        {data.length > 0 && (
          <Chart
            height={window.innerHeight}
            data={dv}
            scale={cols}
            padding={[20, 160, 80, 60]}
            forceFit
          >
            <Axis
              name="totalamt"
              label={{
                formatter(val) {
                  return `$${val}`;
                },
              }}
            />
            <Legend position="bottom" />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="name*totalamt"
              color={[
                'category',
                category => colorMap[categories.indexOf(category)],
              ]}
              tooltip={[
                'category*totalamt',
                (category, totalamt) => ({
                  name: category,
                  value: totalamt,
                }),
              ]}
              adjust={[
                {
                  type: 'dodge',
                  dodgeBy: 'type',
                  marginRatio: 0,
                },
                { type: 'stack' },
              ]}
            />
          </Chart>
        )}
        {data.length === 0 && (
          <Alert
            message="No data to display for selected period!"
            type="warning"
            showIcon
          />
        )}
      </div>
    );
  }
}

export default EventFinanceChart;

// <Label
// content="totalamt"
// // formatter={(val, item) => `${item.point.category}: $${item.point.totalamt}`
// htmlTemplate={(text, item) => {
//   const { point } = item;
//   const { category, totalamt } = point;
//   const categoryStr = category.substr(2, category.length);
//   return `<span style="display: inline-block; padding-top: 80px">${categoryStr}: $${totalamt}</span>`;
// }}
// />
