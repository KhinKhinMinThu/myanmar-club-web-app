import React, { Component } from 'react';
import {
  Radio, Alert, Modal, Button,
} from 'antd';
import {
  Chart, Geom, Axis, Tooltip, Legend, Label, Coord,
} from 'bizcharts';
import DataSet from '@antv/data-set';

/* eslint react/prop-types: 0 */
class EventFinanceChart extends Component {
  state = {
    period: '1',
    visible: false,
    piechartData: [],
    piechartTitle: '',
  };

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

  showModal = (data, budgetBreakdown) => {
    const obj = budgetBreakdown.find(item => item.name === data.events);
    const piechartData = data.name === 'Income' ? obj.income : obj.expenditure;
    // console.log(budgetBreakdown, data, obj, piechartData);
    this.setState({
      visible: true,
      piechartData,
      piechartTitle: `${data.events} - ${data.name}`,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  preparePieChartList = (eventsFinance) => {
    const budgetBreakdown = [];
    eventsFinance.forEach((item) => {
      const obj = {};
      const keys = Object.keys(item);
      obj.name = item.name;
      obj.income = [];
      obj.expenditure = [];
      keys.forEach((income) => {
        if (income.substr(0, income.indexOf('-') - 1) === 'income') {
          obj.income.push({
            category: income.substr(income.indexOf('-') + 2, income.length),
            amount: item[income],
          });
        }
      });
      keys.forEach((expenditure) => {
        if (
          expenditure.substr(0, expenditure.indexOf('-') - 1) === 'expenditure'
        ) {
          obj.expenditure.push({
            category: expenditure.substr(
              expenditure.indexOf('-') + 2,
              expenditure.length,
            ),
            amount: item[expenditure],
          });
        }
      });
      budgetBreakdown.push(obj);
    });
    return budgetBreakdown;
  };

  render() {
    const { eventsFinance } = this.props;
    const {
      period, visible, piechartData, piechartTitle,
    } = this.state;
    const eventsFinanceData = eventsFinance;
    const filteredData = this.getFilteredPeriod(period, eventsFinanceData);
    const budgetBreakdown = this.preparePieChartList(eventsFinanceData);

    const income = {};
    const expenditure = {};

    filteredData.forEach((item) => {
      income[item.name] = item.totalIncome;
      expenditure[item.name] = item.totalExpenditure;
    });
    // console.log('Income:', income);
    // console.log('Expenditure:', expenditure);

    const chartdata = [
      { name: 'Income', ...income },
      { name: 'Expenditure', ...expenditure },
    ];

    // *************************** Barchart
    const ds = new DataSet();
    const dv = ds.createView().source(chartdata);
    dv.transform({
      type: 'fold',
      fields: Object.keys(income),
      key: 'events',
      value: 'amount',
    });
    const year = new Date().getFullYear();
    const cols = {
      amount: {
        tickInterval: 100,
      },
    };
    // *************************** Barchart End

    // *************************** Piechart Modal

    // *************************** Piechart Modal End

    // toString().substr(-2)
    const curyear = new Date().getFullYear();
    const nxtyear = new Date().getFullYear() + 1;
    return (
      <div style={{ textAlign: 'center' }}>
        Select a period to view:&nbsp;
        <Radio.Group
          defaultValue="1"
          onChange={this.onChange}
          buttonStyle="solid"
        >
          <Radio.Button value="1">{`June - August (${curyear})`}</Radio.Button>
          <Radio.Button value="2">{`September - November (${curyear})`}</Radio.Button>
          <Radio.Button value="3">{`December - February (${nxtyear})`}</Radio.Button>
          <Radio.Button value="4">{`March - May (${nxtyear})`}</Radio.Button>
        </Radio.Group>
        <br /> <br />
        {filteredData.length > 0 && (
          <div>
            <Chart
              height={window.innerHeight}
              data={dv}
              forceFit
              padding={[50, 0, 80, 50]}
              scale={cols}
              onPlotClick={(ev) => {
                const { data } = ev;
                const { _origin } = data;
                this.showModal(_origin, budgetBreakdown);
              }}
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
              <Tooltip
                crosshairs={{ type: 'y' }}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
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
                style={{ cursor: 'pointer' }}
                tooltip={[
                  'name*amount',
                  (name, amount) => ({
                    name,
                    value: `$${amount}`,
                  }),
                ]}
              >
                <Label
                  content={[
                    'amount',
                    amount => `$${amount}`,
                  ]}
                  offset={10}
                />
              </Geom>
            </Chart>
            <br />
            <h1 style={{ textAlign: 'center' }}>
              {`Event Finance Breakdown - June ${year} to May ${year + 1}`}
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
        <Modal
          width={800}
          title={piechartTitle}
          visible={visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="close" type="primary" onClick={this.handleOk}>
              Close
            </Button>,
          ]}
        >
          <Chart height={400} data={piechartData} forceFit padding="auto">
            <Coord type="polar" innerRadius={0.2} />
            <Axis name="amount" />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Legend position="bottom" />
            <Geom
              type="interval"
              position="category*amount"
              color="category"
              tooltip={[
                'category*amount',
                (category, amount) => ({
                  name: category,
                  value: `$${amount}`,
                }),
              ]}
              style={{ lineWidth: 1, stroke: '#fff' }}
            />
          </Chart>
        </Modal>
      </div>
    );
  }
}

export default EventFinanceChart;
