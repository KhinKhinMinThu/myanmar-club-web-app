export const FI_DATE_PICKER = 'FI_DATE_PICKER';
export const FI_RADIO = 'FI_RADIO';
export const FI_SELECT = 'FI_SELECT';
export const FI_INPUT = 'FI_INPUT';
export const FI_TEXT_AREA = 'FI_TEXT_AREA';
export const FI_CHECKBOX_GROUP = 'FI_CHECKBOX_GROUP';
export const FI_GROUP = 'FI_GROUP';
export const FI_COLLAPSE = 'FI_COLLAPSE';
export const FI_UPLOAD = 'FI_UPLOAD';

export const N_SELECT = 'N_SELECT';
export const FI_INPUT_ADDON = 'FI_INPUT_ADDON';

const commonLayout = {
  labelCol: { span: 7, offset: 1 },
  wrapperCol: { span: 5, offset: 1 },
};

const groupLayout = {
  labelCol: commonLayout.labelCol,
  wrapperCol: { span: 14, offset: 1 },
};

const collapseLayout = {
  labelCol: commonLayout.labelCol,
  wrapperCol: { span: 11, offset: 1 },
};

const collapseChildLayout = {
  labelCol: commonLayout.labelCol,
  wrapperCol: { span: 10, offset: 1 },
};

export default {
  byId: {
    // *** DATE PICKER ***

    // Date of Birth
    dob: {
      key: 'dob',
      inputType: FI_DATE_PICKER,
      formItemProps: {
        formKey: 'dob',
        label: 'Date of Birth',
        formItemLayout: commonLayout,
        validation: {
          validationType: 'object',
          requiredField: true,
          requiredFieldMsg: 'Please choose your date of birth!',
        },
      },
      componentProps: {
        dateFormat: 'DD-MM-YYYY',
      },
    },

    // *** FI_RADIO ***

    // Gender
    gender: {
      key: 'gender',
      inputType: FI_RADIO,
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

    // *** FI_CHECKBOX_GROUP ***

    // Interested Sub-Committee(s)
    interestedPosition: {
      key: 'interestedPosition',
      inputType: FI_CHECKBOX_GROUP,
      formItemProps: {
        formKey: 'interestedPosition',
        label: 'Interested Sub-Committee(s)',
        formItemLayout: groupLayout,
      },
      componentProps: {
        options: [
          {
            value: 'culture',
            description:
              'မြန်မာ့ယဉ်ကျေးမှုအနုပညာ ထိန်းသိမ်းမြှင့်တင် ပျံ့ပွားရေး Sub-Committee',
          },
          {
            value: 'literature',
            description:
              'စာပေ၊ ဗဟုသုတ၊ တတ်သိပညာ မြှင့်တင် ပျံ့ပွားရေး Sub-Committee',
          },
          {
            value: 'help',
            description:
              'စင်္ကာပူရောက် မြန်မာမိသားစု၏ လူမှုအခက်ခဲများ ကူညီစောင့်ရှောက်ရေးနှင့် ကောင်းမွန်သော လူ့ဘောင်ဘဝ မြှင့်တင်ထိန်းသိမ်းရေး Sub-Committee',
          },
          {
            value: 'sport',
            description: 'မြန်မာ့အားကစားကဏ္ဍ ပံ့ပိုးကူညီရေး Sub-Committee',
          },
          {
            value: 'logistic',
            description: 'ရံပုံငွေရှာဖွေရေး Sub-Committee',
          },
          {
            value: 'news',
            description: 'သတင်းနှင့် ပြန်ကြားရေး Sub-Committee',
          },
        ],
      },
    },

    // ** FI_SELECT ***

    // Marital Status
    maritalStatus: {
      key: 'maritalStatus',
      inputType: FI_SELECT,
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
      inputType: FI_SELECT,
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
      inputType: FI_SELECT,
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
      inputType: FI_SELECT,
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

    // Area Code
    areaCode: {
      key: 'areaCode',
      inputType: N_SELECT,
      formKey: 'areaCode',
      componentProps: {
        options: [
          { value: '65', description: '+65' },
          { value: '95', description: '+95' },
        ],
        style: { width: 70 },
      },
    },

    // ** TEXT AREA ***

    // Hobbies
    hobbies: {
      key: 'hobbies',
      inputType: FI_TEXT_AREA,
      formItemProps: {
        formKey: 'hobbies',
        label: 'Hobbies',
        formItemLayout: commonLayout,
      },
      componentProps: {
        rows: 2,
      },
    },

    // ** FI_INPUT ***

    // Education
    education: {
      key: 'education',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'education',
        label: 'Education',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your education level',
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
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'occupation',
        label: 'Occupation',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your occupation',
        },
      },
      componentProps: {
        placeholder: 'Enter occupation',
      },
    },

    // ID Number
    id: {
      key: 'id',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'id',
        label: 'ID Number',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your ID number',
          patternRegex: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
          patternRegexMsg: 'The input is not a valid ID number!',
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
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'firstName',
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your name',
        },
      },
      componentProps: {
        placeholder: 'Enter first name',
      },
    },

    // Middle Name
    middleName: {
      key: 'middleName',
      inputType: FI_INPUT,
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
      inputType: FI_INPUT,
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
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'otherNationality',
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your nationality',
        },
      },
      componentProps: {
        placeholder: 'Enter nationality',
      },
    },

    // Other Nationality
    otherReligion: {
      key: 'otherReligion',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'otherReligion',
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your religion',
        },
      },
      componentProps: {
        placeholder: 'Enter religion',
      },
    },

    // Postal Code
    postalCode: {
      key: 'postalCode',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'postalCode',
        label: 'Postal Code',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your postal code',
          patternRegex: '^([0-9]{6})$',
          patternRegexMsg: 'Please enter your postal code!',
        },
      },
      componentProps: {
        maxLength: 6,
        placeholder: 'Postal Code',
      },
    },

    // Main Address
    mainAddress: {
      key: 'mainAddress',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'mainAddress',
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your address',
        },
      },
      componentProps: {
        placeholder: 'Enter your address',
      },
    },

    // Addtional Address
    additionalAddress: {
      key: 'additionalAddress',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'additionalAddress',
      },
      componentProps: {
        placeholder: 'addtional address',
      },
    },

    // Email Address
    emailAddress: {
      key: 'emailAddress',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'emailAddress',
        label: 'Email Address',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your address',
          validationType: 'email',
          validationTypeMsg: 'This is not valid email address',
        },
      },
      componentProps: {
        placeholder: 'Enter email address',
      },
    },

    // Password
    password: {
      key: 'password',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'password',
        label: 'Password',
        formItemLayout: collapseChildLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your password',
        },
      },
      componentProps: {
        placeholder: 'Enter password',
      },
    },

    // Confirm Password
    confirmPassword: {
      key: 'confirmPassword',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'confirmPassword',
        label: 'Confirm Password',
        formItemLayout: collapseChildLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please confirm your password',
        },
      },
      componentProps: {
        placeholder: 'Confirm password',
      },
    },

    // Facebook Link
    fbLink: {
      key: 'fbLink',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'fbLink',
        label: 'Facebook Link',
        formItemLayout: commonLayout,
      },
      componentProps: {
        placeholder: 'Enter facebook link',
      },
    },

    // Line Phone Number
    linePhNo: {
      key: 'linePhNo',
      inputType: FI_INPUT,
      formItemProps: {
        formKey: 'linePhNo',
        label: 'Line Phone Number',
        formItemLayout: commonLayout,
        validation: {
          patternRegex: '^([0-9]{6,})$',
          patternRegexMsg: 'The input is not a valid phone number!',
        },
      },
      componentProps: {
        placeholder: 'Enter line phone number',
      },
    },

    // Mobile Number
    mobileNo: {
      key: 'mobileNo',
      inputType: FI_INPUT_ADDON,
      addOnId: 'areaCode',
      formItemProps: {
        formKey: 'mobileNo',
        label: 'Mobile Number',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please enter your mobile number!',
          patternRegex: '^([0-9]{6,})$',
          patternRegexMsg: 'The input is not a valid phone number!',
        },
      },
      componentProps: {
        placeholder: 'Enter mobile number',
      },
    },

    // ** UPLOAD ***

    // Passport Photo
    passportPhoto: {
      key: 'passportPhoto',
      inputType: FI_UPLOAD,
      addOnId: 'passportPhoto',
      formItemProps: {
        formKey: 'passportPhoto',
        label: 'Passport Size Photo',
        formItemLayout: commonLayout,
        validation: {
          requiredField: true,
          requiredFieldMsg: 'Please upload your passport size photo!',
        },
      },
      componentProps: {
        placeholder: 'Enter mobile number',
        fileList: [
          {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
      },
    },

    // ** FI_GROUP ***

    // Fullname
    fullName: {
      key: 'fullName',
      inputType: FI_GROUP,
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
      inputType: FI_GROUP,
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
      inputType: FI_GROUP,
      formItemProps: {
        label: 'Religion',
        formItemLayout: groupLayout,
        colSpans: [7, 6],
      },
      componentIds: ['religion', 'otherReligion'],
    },

    // Full Address
    fullAddress: {
      key: 'fullAddress',
      inputType: FI_GROUP,
      formItemProps: {
        label: 'Address',
        formItemLayout: groupLayout,
        colSpans: [9, 9],
      },
      componentIds: ['mainAddress', 'additionalAddress'],
    },

    // Password Collapse
    passwordCollapse: {
      key: 'passwordCollapse',
      inputType: FI_COLLAPSE,
      formItemProps: {
        label: ' ',
        formItemLayout: collapseLayout,
        panelHeader: 'Create Myanmar Club Account',
      },
      componentIds: ['password', 'confirmPassword'],
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
    'fullAddress',
    'postalCode',
    'emailAddress',
    'passwordCollapse',
    'fbLink',
    'linePhNo',
    'mobileNo',
    'hobbies',
    'passportPhoto',
    'interestedPosition',
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
  // stepTwo
  'areaCode',
];
