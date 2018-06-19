import React from "react";
import "antd/dist/antd.css";
import Page1 from "./page1";
import { PageSteps, StepContent, StepAction } from "./components";
import { message } from "antd";

const steps = [
  {
    title: "First",
    content: <Page1 />,
    ref: "page1"
  },
  {
    title: "Second",
    content: "Second-content"
  },
  {
    title: "Last",
    content: "Last-content"
  },
  {
    title: "Last",
    content: "Last-content"
  },
  {
    title: "Last",
    content: "Last-content"
  }
];

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  next = () => {
    const current = this.state.current + 1;
    // const refName = steps[this.state.current].ref;

    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
  completed = () => message.success("Processing complete!");
  render() {
    const { current } = this.state;
    return (
      <div>
        <PageSteps current={current} steps={steps} />
        <StepContent current={this.state.current} steps={steps} />
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
