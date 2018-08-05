export const SAVE = '[EVENTTRANSAC_DATA] SAVE';
export const REMOVE = '[EVENTTRANSAC_DATA] REMOVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export const remove = values => ({
  type: REMOVE,
  payload: values,
});

export default function (
  state = {
    // to get the data from API
    eventsData: [
      {
        id: '1',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '2',
        name: 'Event Name 02',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '3',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '4',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '5',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '6',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '7',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '8',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '9',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '10',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '11',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '12',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '13',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 01',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
      {
        id: '14',
        name: 'Event Name 01',
        description: 'Event Description xyz',
        startDate: '12-01-2020',
        endDate: '12-01-2020',
        location: 'BLK 111, CityHall, 123456',
        eventStatus: '1', // open
        income: '1000.00',
        expenditure: '550.00',
        balance: '450.00',
        createdBy: 'Member 02',
        createdDate: '12-01-2020',
        eventTransactions: [
          {
            id: '11',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '12',
            type: 'income',
            category: 'ticket',
            amount: '110.0',
          },
          {
            id: '19',
            type: 'expenditure',
            category: 'catering',
            amount: '110.0',
          },
          {
            id: '21',
            type: 'income',
            category: 'donation',
            amount: '110.0',
          },
        ],
      },
    ],
    // end

    // to update to API
    eventId: null,
    transacIdToRemove: null,
    transacDataToAdd: null,
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
    case REMOVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
