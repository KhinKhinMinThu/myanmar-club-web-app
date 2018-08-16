import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form } from 'antd';
import {
  NameInput,
  GenderRadio,
  DobDatePicker,
  NationalitySelect,
  ReligionSelect,
  MaritalStatusSelect,
  EducationLevelInput,
  OccupationInput,
  StayPassSelect,
  IDInput,
} from './components/page1-components';
import { FormCard } from './styled-components';

class Page1 extends React.Component {
  static propTypes = {
    form: PropTypes.shape({}),
  };

  static defaultProps = {
    form: PropTypes.shape({}),
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        <FormCard style={{ textAlign: 'left' }}>
          <NameInput decorator={getFieldDecorator} />
          <GenderRadio decorator={getFieldDecorator} />
          <DobDatePicker decorator={getFieldDecorator} />
          <NationalitySelect decorator={getFieldDecorator} />
          <ReligionSelect decorator={getFieldDecorator} />
          <MaritalStatusSelect decorator={getFieldDecorator} />
          <EducationLevelInput decorator={getFieldDecorator} />
          <OccupationInput decorator={getFieldDecorator} />
          <StayPassSelect decorator={getFieldDecorator} />
          <IDInput decorator={getFieldDecorator} />
        </FormCard>
      </Form>
    );
  }
}

export default Form.create()(Page1);
