import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon } from 'antd';

import PageInfo from './page-info';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import { HalfWidthButton } from './styled-components';

const { Step } = Steps;

// ******************************* signup-form components
// *******************************
const stepsContentStyles = {
  marginTop: '20px',
  borderRadius: 10,
  backgroundColor: '#fafafa',
  textAlign: 'center',
  padding: '18px',
};
const stepActionStyles = {
  marginTop: '14px',
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
};

export const PageSteps = (props) => {
  const { current, steps } = props;

  return (
    <Steps current={current}>
      {steps.map(
        item => (item.content === 3 ? (
          <Step
            key={item.title}
            title={item.title}
            icon={<Icon type="smile-o" style={{ fontSize: 30 }} />}
          />
        ) : (
          <Step key={item.title} title={item.title} />
        )),
      )}
    </Steps>
  );
};

PageSteps.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export class StepContent extends React.Component {
  // un-comment below line to bypass the validations
  // validatePage = () => true;
  validatePage = () => {
    let result = true;
    if (this.currentStep !== 0) {
      this.currentPage.validateFieldsAndScroll((err) => {
        if (err) {
          result = false;
        }
      });
    }

    return result;
  };

  render() {
    const { steps, current } = this.props;
    this.currentStep = steps[current].content;
    // ***********************

    console.log('currentStep', this.currentStep); // eslint-disable-line no-console

    let page = null;
    if (this.currentStep === 0) {
      page = <PageInfo />;
    } else if (this.currentStep === 1) {
      page = (
        <Page1
          ref={(node) => {
            this.currentPage = node;
          }}
        />
      );
    } else if (this.currentStep === 2) {
      page = (
        <Page2
          ref={(node) => {
            this.currentPage = node;
          }}
        />
      );
    } else if (this.currentStep === 3) {
      page = (
        <Page3
          ref={(node) => {
            this.currentPage = node;
          }}
        />
      );
    }
    // ***********************
    return <div style={stepsContentStyles}>{page}</div>;
  }
}

StepContent.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export const StepAction = (props) => {
  const {
    steps, current, prevClicked, nxtClicked, completedClicked,
  } = props;
  return (
    <div style={stepActionStyles}>
      {current > 0 && (
        <HalfWidthButton style={{ marginRight: 8 }} onClick={prevClicked}>
          Previous
        </HalfWidthButton>
      )}
      {current < steps.length - 1 && (
        <HalfWidthButton type="primary" htmlType="submit" onClick={nxtClicked}>
          Next
        </HalfWidthButton>
      )}
      {current === steps.length - 1 && (
        <HalfWidthButton type="primary" onClick={completedClicked}>
          Apply for Membership
        </HalfWidthButton>
      )}
    </div>
  );
};

StepAction.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.number.isRequired,
    }),
  ).isRequired,
  prevClicked: PropTypes.func.isRequired,
  nxtClicked: PropTypes.func.isRequired,
  completedClicked: PropTypes.func.isRequired,
};
// end
