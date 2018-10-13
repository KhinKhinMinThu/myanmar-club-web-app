import React from 'react';
import { withRouter } from 'react-router-dom/es';
import { Card, Button } from 'antd';
import { DASHBOARD } from '../../actions/location';

const ErrorPage = () => (
  <Card
    style={{
      width: '600px',
      backgroundColor: 'transparent',
      border: 0,
      marginTop: 100,
      marginLeft: 150,
    }}
  >
    <h1
      style={{
        fontFamily: 'Impact',
        fontSize: '50px',
        color: '#312d2d',
      }}
    >
      404 Page Not Found!
    </h1>
    <span
      style={{
        fontSize: '16px',
        color: '#312d2d',
      }}
    >
      The requested URL does not exist!<br />
      Please go to Myamar Club home page by clicking the button below.
    </span>
    <br />
    <br />
    <Button type="primary" href={DASHBOARD} icon="smile" ghost>
      Myanmar Club Home Page
    </Button>
  </Card>
);

export default withRouter(ErrorPage);
