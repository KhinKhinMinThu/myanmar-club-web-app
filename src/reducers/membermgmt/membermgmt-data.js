import moment from 'moment';

export const SAVE = '[MEMBERMGMT_DATA] SAVE';

export const save = formValues => ({
  type: SAVE,
  payload: formValues,
});

export default function (
  state = {
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
