import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import classNames from "classnames";
import { useSignUp } from "hooks/auth";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Error from "components/Error";
import Field from "components/Field";
import { Formik } from "formik";
import * as Yup from "yup";
import { passwordRegex } from "config/form";

const SignUpForm = ({ intl: { formatMessage }, history }) => {
  const signUp = useSignUp();
  const onSubmit = async ({ email, username, password }, { setSubmitting, setErrors }) => {
    try {
      await signUp(email, username, password);
      history.push("/chat");
    } catch (err) {
      setErrors({ signUp: err });
    } finally {
      setSubmitting(false);
    }
  };
  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(formatMessage({ id: "Email required" }))
      .email(formatMessage({ id: "Invalid email" })),
    username: Yup.string().required(formatMessage({ id: "Username required" })),
    password: Yup.string()
      .required(formatMessage({ id: "Password required" }))
      .matches(passwordRegex, formatMessage({ id: "Invalid password" })),
  });
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({
        values: { email, username, password },
        errors: { signUp: signUpError, email: emailError, username: usernameError, password: passwordError },
        touched: { email: touchedEmail, username: touchedUsername, password: touchedPassword },
        isSubmitting,
        isValid,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        const btnClass = classNames("button", "is-block", "is-success", "is-large", "is-fullwidth", {
          "is-loading": isSubmitting,
        });
        return (
          <>
            {signUpError && <Error error={signUpError} />}
            <form onSubmit={handleSubmit}>
              <Field
                id="email"
                type="email"
                value={email}
                error={touchedEmail && emailError}
                iconClass="fas fa-envelope"
                placeholder={formatMessage({ id: "Email" })}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                id="username"
                type="text"
                value={username}
                error={touchedUsername && usernameError}
                iconClass="fas fa-user"
                placeholder={formatMessage({ id: "Username" })}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                id="password"
                type="password"
                value={password}
                error={touchedPassword && passwordError}
                iconClass="fas fa-lock"
                placeholder={formatMessage({ id: "Password" })}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button type="submit" className={btnClass} disabled={!isValid || !dirty || isSubmitting}>
                {formatMessage({ id: "Sign Up" })}
              </button>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withRouter,
)(SignUpForm);
