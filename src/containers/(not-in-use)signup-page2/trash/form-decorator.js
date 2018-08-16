import React, { Children, cloneElement } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

const formFieldConfigs = {
  byId: {
    dob: {
      formKey: 'dob',
      label: 'Date of Birth',
      requiredField: true,
      validationMsg: 'Please enter your date of birth!',
      meta: { dateFormat: 'DD-MM-YYYY' },
    },
    gender: {
      formKey: 'gender',
      label: 'Gender',
    },
    maritalStatus: {
      formKey: 'maritalStatus',
      label: 'Marital Status',
      meta: {
        placeholder: 'Select marital status',
        options: [
          { value: 'SI', description: 'Single' },
          { value: 'MA', description: 'Married' },
          { value: 'DI', description: 'Divorced' },
          { value: 'WI', description: 'Widowed' },
        ],
      },
    },
    education: {
      formKey: 'education',
      label: 'Education Level',
      requiredField: true,
      validationMsg: 'Please enter your education level',
      meta: {
        placeholder: 'Enter education level',
        info: 'GCE A Level, Bachelor, Master, Doctoral (PhD) etc.',
      },
    },
    occupation: {
      formKey: 'occupation',
      label: 'Occupation',
      requiredField: true,
      validationMsg: 'Please enter your occupation',
      meta: { placeholder: 'Enter occupation' },
    },
    stayPass: {
      formKey: 'stayPass',
      label: 'Stay Pass',
      meta: {
        placeholder: 'Select stay pass',
        options: [
          { value: 'SP', description: 'S Pass' },
          { value: 'EP', description: 'Employment Pass' },
          { value: 'ST', description: 'Student Pass' },
          { value: 'CI', description: 'Citizen' },
          {
            value: 'PR',
            description: 'Permanent Resident',
          },
          { value: 'WP', description: 'Work Permit' },
        ],
      },
    },
    id: {
      formKey: 'id',
      label: 'Identification Number',
      requiredField: true,
      validationMsg: 'Please enter your ID Number!',
      patternRegex: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
      patternMsg: 'The input is not a valid ID Number!',
      meta: {
        placeholder: 'Enter education level',
        maxLength: 9,
        info: 'S1234567Z, G1234567Z etc.',
      },
    },
    firstName: {
      formKey: 'firstName',
      requiredField: true,
      validationMsg: 'Please input your username!',
      meta: {
        placeholder: 'First name',
        type: 'text',
      },
    },
    middleName: {
      formKey: 'middleName',
      meta: {
        placeholder: 'Middle name',
        type: 'text',
      },
    },
    lastName: {
      formKey: 'lastName',
      meta: {
        placeholder: 'Last name',
        type: 'text',
      },
    },
  },
  fullNameIds: ['firstName', 'middeName', 'lastName'],
  stepOneIds: [
    'gender',
    'dob',
    'maritalStatus',
    'education',
    'occupation',
    'stayPass',
    'id',
  ],
};

const formWrapperConfig = {
  fullName: {
    label: 'Name',
    cols: [7, 7, 10],
    fieldConfigs: [
      formFieldConfigs.byId.firstName,
      formFieldConfigs.byId.middleName,
      formFieldConfigs.byId.lastName,
    ],
  },
};

const FormWithConfigs = ({ children, decorator }) => {
  const clone = (child, index) => {
    const { byId, stepOneIds } = formFieldConfigs;
    const fieldId = stepOneIds[index];
    const fieldConfig = byId[fieldId];

    if (child.props.wrapper) {
      console.log('found it');
    }

    return cloneElement(child, {
      decorator,
      ...fieldConfig,
    });
  };

  return <Form>{Children.map(children, clone)}</Form>;
};

FormWithConfigs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  decorator: PropTypes.func.isRequired,
};

export default FormWithConfigs;

// {stepOneIds.map((id) => {
//   if (id === 'fullName') {
//     return (
//       <FormItemWrapper
//         {...byId[id]}
//         render={wrappedComponentId => (
//           <FormItemWithDecorator
//             formConfig={byId[wrappedComponentId]}
//             decorator={getFieldDecorator}
//           />
//         )}
//       />
//     );
//   }

//   if (id.endsWith('Other')) {
//     return (
//       <SelectWithOther
//         render={(showOther, onChange) => (
//           <FormItemWrapper
//             {...byId[id]}
//             render={(wrappedComponentId) => {
//               if (
//                 wrappedComponentId.startsWith('other')
//                 && !showOther
//               ) {
//                 return null;
//               }
//               return (
//                 <FormItemWithDecorator
//                   formConfig={byId[wrappedComponentId]}
//                   decorator={getFieldDecorator}
//                   onChange={onChange}
//                 />
//               );
//             }}
//           />
//         )}
//       />
//     );
//   }

//   return (
//     <FormItemWithDecorator
//       formConfig={byId[id]}
//       decorator={getFieldDecorator}
//     />
//   );
// })}

// export const FormItemWrapper = ({
//   label, cols, wrappedComponents, render,
// }) => (
//   <FormItem label={label}>
//     {cols.map((col, index) => (
//       <Col span={col}>{render(wrappedComponents[index])}</Col>
//     ))}
//   </FormItem>
// );

// export class SelectWithOther extends Component {
//   state = { showOther: false };

//   onChange = (value) => {
//     if (value === 'OT') {
//       this.setState({ showOther: true });
//     } else {
//       this.setState({ showOther: false });
//     }
//   };

//   render() {
//     const { render } = this.props;
//     const { showOther } = this.state;
//     return render(showOther, this.onChange);
//   }
// }
