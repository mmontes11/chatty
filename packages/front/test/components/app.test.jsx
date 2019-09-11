import React from "react";
import { mount } from "enzyme";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "apollo";
import App from "components/App";
import IntlProvider from "context/IntlProvider";

describe("components/app", () => {
  it("renders", () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </ApolloProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
