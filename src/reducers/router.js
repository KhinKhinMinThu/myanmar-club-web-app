export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const locationChange = location => ({
  type: LOCATION_CHANGE,
  payload: location,
});

export default function (
  state = {
    location: null,
  },
  action,
) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
