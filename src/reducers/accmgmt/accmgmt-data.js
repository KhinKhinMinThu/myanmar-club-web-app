export const SAVE = '[ACCMGMT_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export default function (
  state = {
    // to get the data from API
    membersData: [
      {
        id: '1',
        name: 'Name 1',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '2',
        name: 'Name 2',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '3',
        name: 'Name 3',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '4',
        name: 'Name 4',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '5',
        name: 'Name 5',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '6',
        name: 'Name 6',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '7',
        name: 'Name 7',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '8',
        name: 'Name 8',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '9',
        name: 'Name 9',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '10',
        name: 'Name 10',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '11',
        name: 'Name 11',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '0',
      },
      {
        id: '12',
        name: 'Name 12',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '1',
      },
      {
        id: '13',
        name: 'Name 13',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '1',
      },
      {
        id: '14',
        name: 'Name 14',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        role_names: ['Role1', 'Role2'],
        membership_expiry: '12/01/2020',
        membership_status: 'Active',
        isec_member: '1',
      },
    ],
    // end

    // to update to API
    // roleId: 0,
    // transferFrom: [],
    // transferTo: [],
    // end
  },
  action,
) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
