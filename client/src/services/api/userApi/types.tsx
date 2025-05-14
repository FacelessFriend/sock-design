export interface AuthResponse {
    accessToken: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
  
  export interface AuthFormData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }