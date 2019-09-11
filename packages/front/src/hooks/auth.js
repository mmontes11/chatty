import { useContext } from "react";
import { AuthContext } from "context/AuthProvider";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN, SIGN_UP } from "apollo/mutations";

export const useAuth = () => useContext(AuthContext);

export const useLogin = () => {
  const [loginMutation] = useMutation(LOGIN);
  const auth = useAuth();
  const login = async (username, password) => {
    const {
      data: {
        login: { token },
      },
    } = await loginMutation({ variables: { login: username, password } });
    auth.login(username, token);
    return { token };
  };
  return login;
};

export const useSignUp = () => {
  const [signUpMutation] = useMutation(SIGN_UP);
  const auth = useAuth();
  const signUp = async (email, username, password) => {
    const {
      data: {
        signUp: { token },
      },
    } = await signUpMutation({ variables: { email, username, password } });
    auth.login(username, password);
    return { token };
  };
  return signUp;
};
