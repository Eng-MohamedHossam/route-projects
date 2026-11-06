export interface SignupFormData {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  password: string;
  confirmPassword: string;
}
