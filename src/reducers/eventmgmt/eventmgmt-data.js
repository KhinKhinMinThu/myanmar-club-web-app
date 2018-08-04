export const SAVE = '[EVENTMGMT_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export const eventData = {
  Id: '5',
  name: 'xxxxxx event',
  description: 'this is a cool event',
  startDateTime: '11 June 2018 11:45 AM',
  endDateTime: '11 June 2018 01:00 PM',
  locationLine1: 'xxxx',
  locationLine2: 'yyy',
  locationPostalCode: '600001',
  photoLink: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  income: '',
  expenditure: '',
  balance: '',
  ticketFee: '$20.00',
  noOfPax: '150',
  isRefreshmentProvided: 'YES',
  contactPerson: 'Name 01',
  emailAddress: 'abc@gmail.com',
  mobilePhone: '65 - 12345678',
  eventStatus: 'Open',
  createdAt: '',
  createdBy: '',
  deletedAt: '',
  deletedBy: '',
  updatedAt: '',
  updatedBy: '',
};

export default function (
  state = {
    // to get the data from API
    eventRSVPData: [
      {
        id: '1',
        name: 'Name 1',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '3',
        payment_type: 'Bank Transfer',
      },
      {
        id: '2',
        name: 'Name 2',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '2',
        payment_type: 'Bank Transfer',
      },
      {
        id: '3',
        name: 'Name 3',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '1',
        payment_type: 'Cash Payment',
      },
      {
        id: '4',
        name: 'Name 4',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '5',
        payment_type: 'Bank Transfer',
      },
      {
        id: '5',
        name: 'Name 5',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '2',
        payment_type: 'Bank Transfer',
      },
      {
        id: '6',
        name: 'Name 6',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '3',
        payment_type: 'Bank Transfer',
      },
      {
        id: '7',
        name: 'Name 7',
        email_address: 'abc@gmail.com',
        mobile_phone: '12345678',
        no_of_pax: '4',
        payment_type: 'Cash Payment',
      },
    ],
    // end

    // to update to API
    membersToDelete: [],
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
