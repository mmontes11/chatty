import React from "react";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router-dom";
import SignUpForm from "components/SignUpForm";
import HeroBox from "components/HeroBox";
import { compose } from "recompose";
import { withAuthRedirection } from "hocs/auth";
import styled from "styled-components";

const LoginLink = styled(Link)`
  display: block;
  margin-top: 10px;
`;

const Login = ({ intl: { formatMessage } }) => (
  <HeroBox>
    <p className="title is-2">{formatMessage({ id: "Chatty" })}</p>
    <SignUpForm />
    <LoginLink to="/login">{formatMessage({ id: "Login" })}</LoginLink>
  </HeroBox>
);

Login.propTypes = {
  intl: intlShape.isRequired,
};

export default compose(
  injectIntl,
  withAuthRedirection,
)(Login);
