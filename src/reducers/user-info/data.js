export const SAVE_FIELD = '[SIGNUP_DATA] SAVE_FIELD';

export const saveFields = fieldValues => ({
  type: SAVE_FIELD,
  payload: fieldValues,
});

const initialState = {
  firstName: 'ok',
  middleName: '',
  lastName: '',
  gender: 'M',
  dob: null,
  nationality: 'MMMM',
  religion: 'BU',
  maritalStatus: 'SI',
  education: '',
  occupation: '',
  stayPass: 'SP',
  id: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_FIELD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const IsInArray = (arr, keyword) => arr.some(i => i === keyword);

export const getIsNationaltiyOther = (state) => {
  const { nationality } = state;
  return !IsInArray(['MM', 'SG'], nationality);
};

export const getIsReligionOther = (state) => {
  const rlgs = ['BU', 'IS', 'HI', 'CH'];
  const { religion } = state;
  return !IsInArray(rlgs, religion);
};
