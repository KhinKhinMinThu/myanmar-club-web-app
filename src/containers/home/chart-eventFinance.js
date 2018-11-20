import React, { Component } from 'react';
// import colormap from 'colormap';
import { Radio, Alert } from 'antd';
import {
  Chart, Geom, Axis, Tooltip, Legend, Label,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
class EventFinanceChart extends Component {
  state = { period: '1' };

  onChange = (e) => {
    this.setState({ period: e.target.value });
  };

  getFilteredPeriod = (period, eventsFinanceData) => {
    let filteredData = [];
    if (period === '1') {
      filteredData = eventsFinanceData.filter(
        item => item.month === 'JUN' || item.month === 'JUL' || item.month === 'AUG',
      );
    } else if (period === '2') {
      filteredData = eventsFinanceData.filter(
        item => item.month === 'SEP' || item.month === 'OCT' || item.month === 'NOV',
      );
    } else if (period === '3') {
      filteredData = eventsFinanceData.filter(
        item => item.month === 'DEC' || item.month === 'JAN' || item.month === 'FEB',
      );
    } else {
      filteredData = eventsFinanceData.filter(
        item => item.month === 'MAR' || item.month === 'APR' || item.month === 'MAY',
      );
    }
    return filteredData;
  };

  render() {
    const { eventsFinance } = this.props;
    const { period } = this.state;
    const eventsFinanceData = eventsFinance;
    const filteredData = this.getFilteredPeriod(period, eventsFinanceData);
    const income = {};
    const expenditure = {};
    filteredData.forEach((item) => {
      income[item.name] = item.totalIncome;
      expenditure[item.name] = item.totalExpenditure;
    });
    console.log('Income:', income);
    console.log('Expenditure:', expenditure);

    const data = [
      { name: 'Income', ...income },
      { name: 'Expenditure', ...expenditure },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: Object.keys(income),
      key: 'events',
      value: 'amount',
    });
    const year = new Date().getFullYear();
    const cols = {
      amount: {
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
          <Radio.Button value="1">June - August</Radio.Button>
          <Radio.Button value="2">September - November</Radio.Button>
          <Radio.Button value="3">December - February</Radio.Button>
          <Radio.Button value="4">March - May</Radio.Button>
        </Radio.Group>
        <br /> <br />
        {filteredData.length > 0 && (
          <div>
            <Chart
              height={400}
              data={dv}
              forceFit
              padding={[50, 0, 80, 50]}
              scale={cols}
            >
              <Axis name="Events" />
              <Axis
                name="Amount"
                label={{
                  formatter(val) {
                    return `$${val}`;
                  },
                }}
              />
              <Legend />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom
                type="interval"
                position="events*amount"
                color="name"
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 1 / 32,
                  },
                ]}
              />
              <Geom type="point" position="events*amount">
                <Label
                  content={[
                    'name*amount',
                    (name, amount) => (name === 'Income'
                      ? `${name}:     \n$${amount}     `
                      : `     ${name}:\n     $${amount}`),
                  ]}
                  offset={15}
                  textStyle={(name) => {
                    const style = {
                      fill: '#404040',
                      fontSize: '12',
                      fontWeight: 'bold',
                      textBaseline: 'middle',
                    };
                    const type = name.substring(0, name.indexOf(':'));
                    if (type === 'Income') style.textAlign = 'right';
                    else style.textAlign = 'left';
                    return style;
                  }}
                />
              </Geom>
            </Chart>
            <br />
            <h1 style={{ textAlign: 'center' }}>
              {`Event Finance Breakdown ${year} - ${year + 1}`}
            </h1>
          </div>
        )}
        {filteredData.length === 0 && (
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
