import gql from "graphql-tag";

export const LOGIN = gql`
  mutation($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      token
    }
  }
`;
