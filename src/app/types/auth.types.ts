export interface authState {
  userData: null | string;
  userToken: null | string;
  isError: boolean;
  isLoading: boolean;
}

export interface loginData {
  email: string;
  password: string;
}
