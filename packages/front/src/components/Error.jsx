import React from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => (
  <article className="message is-danger">
    <div className="message-body">{error.message}</div>
  </article>
);

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Error;
