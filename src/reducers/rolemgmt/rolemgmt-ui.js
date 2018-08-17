export const SELECTEDROLE = '[ROLEMGMT_UI] SELECTEDROLE';
export const RESETSTATE = '[ROLEMGMT_UI] RESETSTATE';

export const setSelectedRole = selectedRole => ({
  type: SELECTEDROLE,
  payload: selectedRole,
});
export const resetState = () => ({ type: RESETSTATE });

const inititalState = {
  selectedRole: null,
};
export default function (
  state = {
    ...inititalState,
  },
  action,
) {
  switch (action.type) {
    case SELECTEDROLE:
      return {
        ...state,
        selectedRole: action.payload,
      };
    case RESETSTATE:
      return {
        ...state,
        ...inititalState,
      };
    default:
      return state;
  }
}
