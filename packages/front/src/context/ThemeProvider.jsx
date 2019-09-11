import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { getThemeVariables } from "config/theme";

const ThemeProvider = ({ children }) => {
  const theme = getThemeVariables();
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
