export const getThemeVariables = () =>
  require(`sass-extract-loader?{"plugins":["sass-extract-js"]}!../styles/_variables.scss`);
