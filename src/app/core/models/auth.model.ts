export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  res: number;
  msg: string;
  data: {
    user_id: number;
    email: string;
  };
}

// Register Request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
