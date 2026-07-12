import { fetcher } from "@/lib/fetcher";
import { LoginSchema, SignupPayloadSchema } from "@/schema/auth.schema";

export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SignupResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const login = (data: LoginSchema) => {
  return fetcher<LoginResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const signup = (data: SignupPayloadSchema) => {
  return fetcher<LoginResponse>("/user/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};