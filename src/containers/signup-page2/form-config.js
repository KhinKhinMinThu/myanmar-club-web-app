export const DATE_PICKER = 'DATE_PICKER';
export const RADIO = 'RADIO';
export const SELECT = 'SELECT';
export const INPUT = 'INPUT';
export const GROUP = 'GROUP';

const commonLayout = {
  labelCol: { span: 7, offset: 1 },
  wrapperCol: { span: 4, offset: 1 },
};

const groupLayout = {
  labelCol: commonLayout.labelCol,
  wrapperCol: { span: 14, offset: 1 },
};

export default {
  byId: {
    // *** DATE PICKER ***

    // Date of Birth
    dob: {
      key: 'dob',
      inputType: DATE_PICKER,
      formItemProps: {
        formKey: 'dob',
        label: 'Date of Birth',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          validationMsg: 'Please choose your date of birth!',
        },
      },
      componentProps: {
        dateFormat: 'DD-MM-YYYY',
      },
    },

    // *** RADIO ***

    // Gender
    gender: {
      key: 'gender',
      inputType: RADIO,
      formItemProps: {
        formKey: 'gender',
        label: 'Gender',
        formItemLayout: commonLayout,
      },
      componentProps: {
        groupName: 'gender',
        options: [
          { value: 'M', description: 'Male' },
          { value: 'F', description: 'Female' },
        ],
      },
    },

    // ** SELECT ***

    // Marital Status
    maritalStatus: {
      key: 'maritalStatus',
      inputType: SELECT,
      formItemProps: {
        formKey: 'maritalStatus',
        label: 'Marital Status',
        formItemLayout: commonLayout,
      },
      componentProps: {
        options: [
          { value: 'SI', description: 'Single' },
          { value: 'MA', description: 'Married' },
          { value: 'DI', description: 'Divorced' },
          { value: 'WI', description: 'Widowed' },
        ],
      },
    },

    // Stay Pass
    stayPass: {
      key: 'stayPass',
      inputType: SELECT,
      formItemProps: {
        formKey: 'stayPass',
        label: 'Stay Pass',
        formItemLayout: commonLayout,
      },
      componentProps: {
        options: [
          { value: 'SP', description: 'S Pass' },
          { value: 'EP', description: 'Employment Pass' },
          { value: 'ST', description: 'Student Pass' },
          { value: 'CI', description: 'Citizen' },
          { value: 'PR', description: 'Permanent Resident' },
          { value: 'WP', description: 'Work Permit' },
        ],
      },
    },

    // Religion
    religion: {
      key: 'religion',
      inputType: SELECT,
      formItemProps: {
        formKey: 'religion',
      },
      componentProps: {
        options: [
          { value: 'BU', description: 'Buddhism' },
          { value: 'IS', description: 'Islam' },
          { value: 'HI', description: 'Hinduism' },
          { value: 'CH', description: 'Christianity' },
          { value: 'OT', description: 'Others' },
        ],
      },
    },

    // Nationality
    nationality: {
      key: 'nationality',
      inputType: SELECT,
      formItemProps: {
        formKey: 'nationality',
      },
      componentProps: {
        options: [
          { value: 'MM', description: 'Myanmar' },
          { value: 'SG', description: 'Singaporean' },
          { value: 'OT', description: 'Others' },
        ],
      },
    },

    // ** INPUT ***

    // Education
    education: {
      key: 'education',
      inputType: INPUT,
      formItemProps: {
        formKey: 'education',
        label: 'Education',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your education level',
        },
        info: 'GCE A Level, Bachelor, Master, Doctoral (PhD) etc.',
      },
      componentProps: {
        placeholder: 'Enter education level',
      },
    },

    // Occupation
    occupation: {
      key: 'occupation',
      inputType: INPUT,
      formItemProps: {
        formKey: 'occupation',
        label: 'Occupation',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your occupation',
        },
      },
      componentProps: {
        placeholder: 'Enter occupation',
      },
    },

    // ID Number
    id: {
      key: 'id',
      inputType: INPUT,
      formItemProps: {
        formKey: 'id',
        label: 'ID Number',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your ID number',
          patternRegex: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
          patternMsg: 'The input is not a valid ID Number!',
        },
        info: 'S1234567Z, G1234567Z etc.',
      },
      componentProps: {
        placeholder: 'Enter ID number',
        maxLength: 9,
      },
    },

    // First Name
    firstName: {
      key: 'firstName',
      inputType: INPUT,
      formItemProps: {
        formKey: 'firstName',
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your name',
        },
      },
      componentProps: {
        placeholder: 'Enter first name',
      },
    },

    // Middle Name
    middleName: {
      key: 'middleName',
      inputType: INPUT,
      formItemProps: {
        formKey: 'middleName',
      },
      componentProps: {
        placeholder: 'Enter middle name',
      },
    },

    // Last Name
    lastName: {
      key: 'lastName',
      inputType: INPUT,
      formItemProps: {
        formKey: 'lastName',
      },
      componentProps: {
        placeholder: 'Enter last name',
      },
    },

    // Other Nationality
    otherNationality: {
      key: 'otherNationality',
      inputType: INPUT,
      formItemProps: {
        formKey: 'otherNationality',
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your nationality',
        },
      },
      componentProps: {
        placeholder: 'Enter nationality',
      },
    },

    // Other Nationality
    otherReligion: {
      key: 'otherReligion',
      inputType: INPUT,
      formItemProps: {
        formKey: 'otherReligion',
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your religion',
        },
      },
      componentProps: {
        placeholder: 'Enter religion',
      },
    },

    // Postal Code
    postalCode: {
      key: 'postalCode',
      inputType: INPUT,
      formItemProps: {
        formKey: 'postalCode',
        label: 'Postal Code',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          validationMsg: 'Please enter your postal code',
          patternRegex: '^([0-9]{6})$',
          patternMsg: 'Please enter your postal code!',
        },
      },
      componentProps: {
        maxLength: 6,
        placeholder: 'Postal Code',
      },
    },

    // ** GROUP ***

    // Fullname
    fullName: {
      key: 'fullName',
      inputType: GROUP,
      formItemProps: {
        label: 'Name',
        formItemLayout: groupLayout,
        colSpans: [7, 6, 6],
      },
      componentIds: ['firstName', 'middleName', 'lastName'],
    },

    // Nationality With Other
    nationalityWithOther: {
      key: 'nationalityWithOther',
      inputType: GROUP,
      formItemProps: {
        label: 'Nationality',
        formItemLayout: groupLayout,
        colSpans: [7, 6],
      },
      componentIds: ['nationality', 'otherNationality'],
    },

    // Religion With Other
    religionWithOther: {
      key: 'religionWithOther',
      inputType: GROUP,
      formItemProps: {
        label: 'Religion',
        formItemLayout: groupLayout,
        colSpans: [7, 6],
      },
      componentIds: ['religion', 'otherReligion'],
    },
  },

  // Signup Step 1
  stepOneIds: [
    'fullName',
    'gender',
    'dob',
    'nationalityWithOther',
    'religionWithOther',
    'education',
    'occupation',
    'stayPass',
    'id',
    // stepTwo
    'postalCode',
  ],
};

export const stepOneFormKeys = [
  'firstName',
  'middleName',
  'lastName',
  'gender',
  'dob',
  'nationality',
  'otherNationality',
  'religion',
  'otherReligion',
  'education',
  'occupation',
  'stayPass',
  'id',
];
