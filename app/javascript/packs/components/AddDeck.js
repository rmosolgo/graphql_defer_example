import React from "react"
import {Mutation} from "react-apollo"
import GetDecks from "../graphql/GetDecks.graphql"
import AddDeckMutation from "../graphql/AddDeck.graphql"

const AddDeck = () => {
  let input;

  return (
    <Mutation
      mutation={AddDeckMutation}
      update={(cache, { data: { createDeck } }) => {
        const { decks } = cache.readQuery({ query: GetDecks });
        cache.writeQuery({
          query: GetDecks,
          data: { decks: decks.concat([createDeck.deck]) },
        });
      }}
    >
      {(createDeck, { data }) => (
        <form className="list-group-item d-flex justify-content-between"
          onSubmit={e => {
            e.preventDefault();
            createDeck({ variables: { deckName: input.value } });
            input.value = "";
          }}
        >
          <input
            className="form-control col-8"
            ref={node => {
              input = node;
            }}
          />
          <button type="submit" className="btn btn-sm btn-outline-primary col-3">+ Deck</button>
        </form>
      )}
    </Mutation>
  );
}

export default AddDeck
