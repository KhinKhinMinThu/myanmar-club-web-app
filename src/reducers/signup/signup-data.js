export const SAVE = '[SIGNUP_DATA] SAVE';

export const save = formValues => ({
  type: SAVE,
  payload: formValues,
});

export default function (
  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'M',
    dob: null,
    nationality: 'MM',
    otherNationality: '',
    religion: 'BU',
    maritalStatus: 'SI',
    otherReligion: '',
    education: 'abc',
    occupation: '',
    stayPass: 'SP',
    id: '123',
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
