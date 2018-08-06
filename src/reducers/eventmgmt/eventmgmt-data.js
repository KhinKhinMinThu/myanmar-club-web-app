export const SAVE = '[EVENTMGMT_DATA] SAVE';
export const REMOVE = '[EVENTMGMT_DATA] REMOVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export const remove = values => ({
  type: REMOVE,
  payload: values,
});

// to delete
export const eventData = {
  Id: '1',
  name: ' xxxxxx event A',
  description: 'this is a cool event',
  startDateTime: '11-06-2018 11:59:00',
  endDateTime: '11-06-2018 13:00:00',
  locationLine1: 'xxxx',
  locationLine2: 'xxxx',
  locationPostalCode: '123456',
  photoLink:
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  income: '',
  expenditure: '',
  balance: '',
  ticketFee: '20.00',
  noOfPax: '150',
  isRefreshmentProvided: '0', // not provided
  contactPerson: 'Name 01',
  emailAddress: 'abc@gmail.com',
  mobilePhone: '6512345678',
  eventStatus: '0', // close
  createdBy: '',
  createdAt: '11-05-2018',
};

export default function (
  state = {
    // to get the data from API
    eventsData: [
      {
        id: '1',
        name: ' xxxxxx event A',
        description: 'this is a cool event',
        startDate: '11-06-2018 11:59:00',
        endDate: '11-06-2018 13:00:00',
        locationLine1: 'xxxx',
        locationLine2: 'xxxx',
        locationPostalCode: '123456',
        photoLink:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        income: '',
        expenditure: '',
        balance: '',
        ticketFee: '20.00',
        noOfPax: '150',
        isRefreshmentProvided: '0', // not provided
        contactPerson: 'Name 01',
        emailAddress: 'abc@gmail.com',
        mobilePhone: '6512345678',
        eventStatus: '0', // close
        createdBy: '',
        createdDate: '11-05-2018',
      },
      {
        id: '2',
        name: ' xxxxxx event B',
        description: 'this is a cool event',
        startDate: '11-06-2018 11:59:00',
        endDate: '11-06-2018 13:00:00',
        locationLine1: 'xxxx',
        locationLine2: 'xxxx',
        locationPostalCode: '123456',
        photoLink:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        income: '',
        expenditure: '',
        balance: '',
        ticketFee: '20.00',
        noOfPax: '150',
        isRefreshmentProvided: '0', // not provided
        contactPerson: 'Name 01',
        emailAddress: 'abc@gmail.com',
        mobilePhone: '6512345678',
        eventStatus: '1', // close
        createdBy: '',
        createdDate: '11-05-2018',
      },
      {
        id: '3',
        name: ' xxxxxx event C',
        description: 'this is a cool event',
        startDate: '11-06-2018 11:59:00',
        endDate: '11-06-2018 13:00:00',
        locationLine1: 'xxxx',
        locationLine2: 'xxxx',
        locationPostalCode: '123456',
        photoLink:
          // 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flower_poster_2.jpg/1280px-Flower_poster_2.jpg',
        income: '',
        expenditure: '',
        balance: '',
        ticketFee: '20.00',
        noOfPax: '150',
        isRefreshmentProvided: '0', // not provided
        contactPerson: 'Name 01',
        emailAddress: 'abc@gmail.com',
        mobilePhone: '6512345678',
        eventStatus: '0', // close
        createdBy: '',
        createdDate: '11-05-2018',
      },
      {
        id: '4',
        name: ' xxxxxx event D',
        description: 'this is a cool event',
        startDate: '11-06-2018 11:59:00',
        endDate: '11-06-2018 13:00:00',
        locationLine1: 'xxxx',
        locationLine2: 'xxxx',
        locationPostalCode: '123456',
        photoLink:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        income: '',
        expenditure: '',
        balance: '',
        ticketFee: '20.00',
        noOfPax: '150',
        isRefreshmentProvided: '0', // not provided
        contactPerson: 'Name 01',
        emailAddress: 'abc@gmail.com',
        mobilePhone: '9512345678',
        eventStatus: '0', // close
        createdBy: '',
        createdDate: '11-05-2018',
      },
    ],
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
    eventsToDelete: [],
    name: null,
    description: null,
    startDate: null,
    endDate: null,
    locationLine1: null,
    locationLine2: null,
    locationPostalCode: null,
    ticketFee: null,
    noOfPax: null,
    isRefreshmentProvided: null,
    contactPerson: null,
    emailAddress: null,
    mobilePhone: null,
    eventStatus: null,
    // end
  },
  action,
) {
  switch (action.type) {
    case SAVE:
    case REMOVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
