type RegisterStateType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterActionsTypes = {
  type: 'firstName' | 'lastName' | 'email' | 'password';
  payload:string;
};
