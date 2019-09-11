import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "apollo";
import ThemeProvider from "context/ThemeProvider";
import IntlProvider from "context/IntlProvider";
import AuthProvider from "context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App";
import { setupLocalization } from "config/localization";

setupLocalization();

render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <IntlProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </IntlProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("app"),
);
