export interface authState {
  userData: null | string;
  userToken: null | string;
  isAuth: boolean;
  isError: boolean;
  isLoading: boolean;
}

export interface loginData {
  email: string;
  password: string;
}

export interface signupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}
