import React from 'react';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { PageSteps, StepContent, StepAction } from './components-form';

const steps = [
  {
    title: 'Info Page',
    content: 0,
  },
  {
    title: 'First Step',
    content: 1,
  },
  {
    title: 'Second Step',
    content: 2,
  },
  {
    title: 'Last Step',
    content: 3,
  },
];

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next = (e) => {
    const { current } = this.state;
    const nxtCurrent = current + 1;
    const result = this.stepContent.validatePage(e);

    if (result === true) {
      this.setState({ current: nxtCurrent });
      document.documentElement.scrollTop = 0;
    }
  };

  prev = () => {
    const { current } = this.state;
    const prvCurrent = current - 1;
    this.setState({ current: prvCurrent });
    document.documentElement.scrollTop = 0;
  };

  completed = (e) => {
    const result = this.stepContent.validatePage(e);
    if (result === true) {
      message.success('Processing complete!');
      document.documentElement.scrollTop = 0;
    }
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <PageSteps current={current} steps={steps} />
        <StepContent
          ref={(node) => {
            this.stepContent = node;
          }}
          current={current}
          steps={steps}
        />
        <StepAction
          current={current}
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
