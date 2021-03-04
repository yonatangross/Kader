export default (state: RegisterStateType, action: RegisterActionsTypes) => {
  switch (action.type) {
    case 'firstName':
      return { ...state, firstName: action.payload };
    case 'lastName':
      return { ...state, lastName: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
