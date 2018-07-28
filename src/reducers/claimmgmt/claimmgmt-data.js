export const SAVE = '[CLAIMMGMT_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export default function (
  state = {
    // to get the data from API
    claimsData: [
      {
        id: '1',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        remark: 'remarks 1 2 3 4',
        isApproved: '1', // approved
        submittedBy: 'Member Name',
        submittedDate: '12-01-2020',
      },
      {
        id: '2',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '239.12',
        photoLink: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        remark:
          'long remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4     remarks 1 2 3 4 remarks 1 2 3 4 remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name 01',
        submittedDate: '22-01-2020',
      },
      {
        id: '3',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '4',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '5',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '6',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '7',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '8',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '9',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '10',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '11',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '0', // not approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '12',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '1', // approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '13',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '1', // approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
      {
        id: '14',
        eventDesc: 'Event Name/Description xyz',
        category: 'Catering',
        totalAmount: '240.12',
        photoLink: 'www.google.com',
        remark: 'remarks 1 2 3 4',
        isApproved: '1', // approved
        submittedBy: 'Member Name',
        submittedDate: '22-01-2020',
      },
    ],
    // end

    // to update to API
    claimsToApprove: [],
    claimsToUnApprove: [],
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
