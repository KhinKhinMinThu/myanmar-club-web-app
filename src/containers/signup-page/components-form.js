import React from "react";
import { Steps, Button, Icon } from "antd";

import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
const Step = Steps.Step;

// ******************************* signup-form components
// *******************************
const stepsContentStyles = {
  marginTop: "20px",
  borderRadius: 10,
  backgroundColor: "#fafafa",
  textAlign: "center",
  padding: "18px"
};
const stepActionStyles = {
  marginTop: "24px",
  textAlign: "right"
};

export const PageSteps = props => (
  <Steps current={props.current}>
    {props.steps.map(
      item =>
        item.content === 3 ? (
          <Step
            key={item.title}
            title={item.title}
            icon={<Icon type="smile-o" style={{ fontSize: 30 }} />}
          />
        ) : (
          <Step key={item.title} title={item.title} />
        )
    )}
  </Steps>
);

export class StepContent extends React.Component {
  validatePage = e => {
    let result = false;
    this.currentPage.validateFields((err, values) => {
      if (!err) {
        result = true;
      }
    });
    return result;
  };
  render() {
    const { steps, current } = this.props;
    this.currentStep = steps[current].content;
    // ***********************

    console.log("currentStep", this.currentStep);

    let page = null;
    if (this.currentStep === 1) {
      page = (
        <Page1
          ref={node => {
            this.currentPage = node;
          }}
        />
      );
    } else if (this.currentStep === 2) {
      page = (
        <Page2
          ref={node => {
            this.currentPage = node;
          }}
        />
      );
    } else if (this.currentStep === 3) {
      page = (
        <Page3
          ref={node => {
            this.currentPage = node;
          }}
        />
      );
    }
    // ***********************
    return <div style={stepsContentStyles}>{page}</div>;
  }
}

export const StepAction = props => (
  <div style={stepActionStyles}>
    {props.current > 0 && (
      <Button style={{ marginRight: 8 }} onClick={props.prevClicked}>
        Previous
      </Button>
    )}
    {props.current < props.steps.length - 1 && (
      <Button type="primary" htmlType="submit" onClick={props.nxtClicked}>
        Next
      </Button>
    )}
    {props.current === props.steps.length - 1 && (
      <Button type="primary" onClick={props.completedClicked}>
        Done
      </Button>
    )}
  </div>
);
// end
