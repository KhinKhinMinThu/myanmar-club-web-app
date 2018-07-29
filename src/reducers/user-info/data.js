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
  nationality: 'OT',
  otherNationality: 'English',
  religion: 'BU',
  otherReligion: '',
  maritalStatus: 'SI',
  education: '',
  occupation: '',
  stayPass: 'SP',
  id: 'G1142139T',
  // step two
  areaCode: '65',
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

export const getIsNationaltiyOther = state => state.nationality === 'OT';
export const getIsReligionOther = state => state.religion === 'OT';
