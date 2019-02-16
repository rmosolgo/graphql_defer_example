/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "/graphql",
  fetchOptions: {
    credentials: 'same-origin',
  },
  request: (operation) => {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content')
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    })
  },
});

client
  .query({
    query: gql`
      {
        searchCards(query: "Venser") {
          id
          name
        }
      }
    `
  })
  .then(result => console.log(result));

const Decks = () => (
  <Query
    query={gql`
      {
        decks {
          name
          slots {
            quantity
            card {
              name
              price
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.decks.map(({ name, slots }) => (
        <div key={name}>
          <p>{name}</p>
          <ul>
            {slots.map(({quantity, card}) => (
              <li key={card.name}>{quantity}x {card.name} (${card.price} each)</li>
            ))}
            </ul>
        </div>
      ));
    }}
  </Query>
)
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Decks />
    </div>
  </ApolloProvider>
);

document.addEventListener('DOMContentLoaded', function() {
  render(<App />, document.getElementById("root"));
}, false);
