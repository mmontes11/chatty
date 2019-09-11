import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Field = ({ id, type, value, error, placeholder, iconClass, onChange, onBlur }) => {
  const inputClass = classNames("input is-large", { "is-danger": error });
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          id={id}
          type={type}
          value={value}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className="icon is-large is-left">
          <i className={iconClass} />
        </span>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Field.defaultProps = {
  value: "",
  error: null,
};

export default Field;
