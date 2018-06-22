import React from "react";
import "antd/dist/antd.css";
import { PageSteps, StepContent, StepAction } from "./components-form";
import { message } from "antd";

const steps = [
  {
    title: "First",
    content: 1
    //ref: "page1"
  },
  {
    title: "Second",
    content: 2
  },
  {
    title: "Last 1",
    content: 3
  }
];

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2
    };
  }
  next = e => {
    const current = this.state.current + 1;
    const result = this.stepContent.validatePage(e);

    if (result === true) {
      this.setState({ current });
    }
    // to display the next page from top
    document.documentElement.scrollTop = 0;
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
    // to display the previous page from top
    document.documentElement.scrollTop = 0;
  };
  completed = e => {
    const result = this.stepContent.validatePage(e);
    if (result === true) {
      message.success("Processing complete!");
    }
  };
  render() {
    const { current } = this.state;
    return (
      <div>
        <PageSteps current={current} steps={steps} />
        <StepContent
          ref={node => {
            this.stepContent = node;
          }}
          current={this.state.current}
          steps={steps}
        />
        <StepAction
          current={this.state.current}
          steps={steps}
          prevClicked={this.prev}
          nxtClicked={this.next}
          completedClicked={this.completed}
        />
      </div>
    );
  }
}

export default SignupForm;
