import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../services/msal";

const SignInButton = () => {
  const { instance } = useMsal();
  return <button onClick={() => instance.loginRedirect(loginRequest)}>Sign In</button>;
};

export default SignInButton;
