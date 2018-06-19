import React from "react";
import "antd/dist/antd.css";
import {
  NextStep,
  cardStyles,
  firstNameInput,
  middleNameInput,
  lastNameInput,
  genderRdo,
  dobInput,
  NationalityDdl,
  ReligionDdl,
  otherInput,
  mStatusDdl,
  eduLvlInput,
  eduLvlInfo,
  occupationInput,
  sgPassDdl,
  passNumInput,
  passNumInfo
} from "./components";
import { Form, Card, Row, Col, Button } from "antd";
const FormItem = Form.Item;

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOtherNat: false,
      showOtherRel: false
    };
  }

  nameInputOpts = {
    rules: [
      {
        required: true,
        message: "Please input your name!"
      }
    ]
  };
  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log("Received values of form: ", values);
    //     //this.props.next;
    //   }
    // });
    console.log("clicked submit next");
    this.props.nxtClicked;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const rowGutter = 6;
    return (
      <Card style={cardStyles}>
        <Form onSubmit={this.props.nxtClicked.bind(this)}>
          <FormItem {...formItemLayout} label="Name">
            <Row gutter={rowGutter} type="flex">
              <Col>
                {getFieldDecorator("firstName", this.nameInputOpts)(
                  firstNameInput
                )}
              </Col>
              <Col>{middleNameInput}</Col>
              <Col>{lastNameInput}</Col>
            </Row>
          </FormItem>

          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Page1);
