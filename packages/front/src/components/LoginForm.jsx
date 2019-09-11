import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import classNames from "classnames";
import { useLogin } from "hooks/auth";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Error from "components/Error";
import Field from "components/Field";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ intl: { formatMessage }, history }) => {
  const login = useLogin();
  const onSubmit = async ({ username, password }, { setSubmitting, setErrors }) => {
    try {
      await login(username, password);
      history.push("/chat");
    } catch (err) {
      setErrors({ login: err });
    } finally {
      setSubmitting(false);
    }
  };
  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(formatMessage({ id: "Username required" })),
    password: Yup.string().required(formatMessage({ id: "Password required" })),
  });
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({
        values: { username, password },
        errors: { login: loginError, username: usernameError, password: passwordError },
        touched: { username: touchedUsername, password: touchedPassword },
        isSubmitting,
        isValid,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        const btnClass = classNames("button", "is-block", "is-primary", "is-large", "is-fullwidth", {
          "is-loading": isSubmitting,
        });
        return (
          <>
            {loginError && <Error error={loginError} />}
            <form onSubmit={handleSubmit}>
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
                {formatMessage({ id: "Login" })}
              </button>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withRouter,
)(LoginForm);
