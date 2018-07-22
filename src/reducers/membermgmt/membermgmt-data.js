import moment from 'moment';

export const SAVE = '[MEMBERMGMT_DATA] SAVE';

export const save = formValues => ({
  type: SAVE,
  payload: formValues,
});

export default function (
  state = {
    memberId: 12,
    firstName: 'Khin Khin',
    middleName: '-',
    lastName: 'Min Thu',
    gender: 'F',
    dob: moment('07-09-1992', 'DD-MM-YYYY'),
    nationality: 'OT',
    otherNationality: 'KK',
    religion: 'BU',
    otherReligion: '',
    maritalStatus: 'SI',
    education: 'PRIMARY',
    occupation: 'STUDENT',
    stayPass: 'SP',
    id: 'S1234567X',
    memberRoles: [1, 2],
    allRoles: [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'TREASURER',
      },
      {
        id: 3,
        name: 'OTHER ROLE 3',
      },
      {
        id: 4,
        name: 'OTHER ROLE 4',
      },
    ],

    // membership information
    memberType: 'Life Member', // DB col: membership_type
    status: 'Active', // membership_status
    expiryDate: '20-01-2019', // membership_expiry
    joinedDate: '01-01-2017', // created_at member table
    lastPaymentDate: '11-07-2018', // created_at renew table
    lastPaymentType: 'Cash', // payment_type renew table
    newPaymentType: '',
    // end

    // to update to API
    roleTransfer: [],
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
