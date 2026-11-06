import api from "./api";
import type { MyProfileResponse } from "../types/user";

// Authentication API requests
export interface SignupData {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  password: string;
  rePassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Register a new user
export async function signup(data: SignupData) {
  const response = await api.post("/users/signup", data);
  return response.data;
}

// Login with email, username, or login identifier
export async function login(data: LoginData) {
  const response = await api.post("/users/signin", data);
  return response.data;
}

export interface LoginFormData {
  email: string;
  password: string;
}

//  fetches logged-in user's profile information

export async function getMyProfile() {
  const response = await api.get<MyProfileResponse>("/users/profile-data");
  return response.data;
}
