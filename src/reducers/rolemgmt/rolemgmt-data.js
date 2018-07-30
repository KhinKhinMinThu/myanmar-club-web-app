export const SAVE = '[ROLEMGMT_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export default function (
  state = {
    // to get the data from API
    roleData: [
      {
        roleId: 0,
        roleName: 'ECMEMBERS',
        executives: [
          { id: 1, name: 'Member1' },
          { id: 2, name: 'Member2' },
          { id: 3, name: 'Member3' },
          { id: 4, name: 'Member4' },
        ],
      },
      {
        roleId: 1,
        roleName: 'ROLE1',
        executives: [
          { id: 1, name: 'Member1' },
          { id: 2, name: 'Member2' },
          { id: 3, name: 'Member3' },
        ],
      },
      {
        roleId: 2,
        roleName: 'ROLE2',
        executives: [{ id: 1, name: 'Member1' }, { id: 4, name: 'Member4' }],
      },
    ],
    // end

    // to update to API
    roleId: 0,
    transferFrom: [],
    transferTo: [],
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
