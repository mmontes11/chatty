import React from "react";
import PropTypes from "prop-types";

const HeroBox = ({ children }) => (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <div className="box">{children}</div>
        </div>
      </div>
    </div>
  </section>
);

HeroBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default HeroBox;
