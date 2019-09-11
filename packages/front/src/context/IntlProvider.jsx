import React from "react";
import PropTypes from "prop-types";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { getLocale, getMessages } from "config/localization";

const IntlProvider = ({ children }) => {
  const locale = getLocale();
  const messages = getMessages(locale);
  return (
    <ReactIntlProvider key={locale} locale={locale} messages={messages}>
      {children}
    </ReactIntlProvider>
  );
};

IntlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IntlProvider;
