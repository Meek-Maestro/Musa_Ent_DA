import { useState } from "react";
import { api } from "../../api/api";
import { useForm } from "@mantine/form";
import { authManager } from "../../store/auth";


interface IformInput {
  email: string;
  business_name: string;
  business_location: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}
interface ILoginInput {
  username: string,
  password: string
}
export const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwMjE5MTg4LCJpYXQiOjE3NDAxMzI3ODgsImp0aSI6IjRhZDZjMmJhYjQyMzQ1NWU5MjE2MWJhNzk2NWIzODY0IiwidXNlcl9pZCI6MTJ9.JYRHCL_0B9s1GRu7wOC8CurcTYMHgOX3mI5FVkBXbLo"
const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MDIxOTE4OCwiaWF0IjoxNzQwMTMyNzg4LCJqdGkiOiI5NWVjNTIyZGY0M2Y0MDk4OTkwMTYxMWExZGVjYTFmNyIsInVzZXJfaWQiOjEyfQ.Xv_Tm16Tc3jkRWhtPX-YqZ2fnF9s_zpfsgKxOdr3fNU"
export function useAuth() {
  const [submiting, setSubmiting] = useState<boolean>(false);

  let signupForm = useForm<IformInput>({
    initialValues: {
      email: "",
      business_name: "",
      business_location: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    },
    validate: {
      email: (value) => (value ? null : "Email is required"),
      business_name: (value) => (value ? null : "Business name is required"),
      business_location: (value) => (value ? null : "Business Location is required"),
      password: (value) => (value ? null : "Password field is required"),
      confirmPassword: (value, values) => (value === values.password ? null : "Passwords do not match"),
    },
  });

  let loginForm = useForm<ILoginInput>({
    initialValues: {
      username: "",
      password: ""
    },
    validate: {
      username: (value) => value ? null : "Email is required",
      password: (value) => value ? null : "Password is required"
    },
  })

  async function signup(): Promise<boolean> {
    const { confirmPassword, ...formInput } = signupForm.values
    setSubmiting(true);
    try {
      const res = await api.post("api/v1/register-organization/", formInput);
      const data = res.data;
      console.log(data);
      setSubmiting(false);
      return true;
    } catch (error) {
      setSubmiting(false);
      throw error

    }
  }
  async function Login(): Promise<boolean> {
    setSubmiting(true)
    try {
      const res = await api.post("api/v1/login/", loginForm.values)
      const data = res.data
      authManager.setAuthenticatedProfile(data.data, data.data.access_token)
      console.log(data)
      setSubmiting(false)
      return true
    } catch (error) {
      setSubmiting(false)
      throw error
    }
  }

  return {
    submiting,
    signup,
    signupForm,
    loginForm,
    Login
  };
}