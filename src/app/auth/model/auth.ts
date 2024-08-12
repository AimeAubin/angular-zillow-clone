export interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthResponse {
  login_token: string;
  message: string;
}
