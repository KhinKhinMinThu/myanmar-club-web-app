export const SAVE = '[SIGNUP_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export default function (
  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'M',
    dob: '',
    nationality: 'MM',
    otherNationality: '',
    maritalStatus: 'SI',
    education: '',
    occupation: '',
    stayPass: 'SP',
    id: '',
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
