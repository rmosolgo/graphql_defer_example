import React from "react";
import GetDecks from "../graphql/GetDecks.graphql"
import {Query} from "react-apollo"
import AddDeck from "./AddDeck"

const Sidebar = (props) => (
  <Query
      query={GetDecks}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <ul className="list-group">
            <li className="list-group-item">
              Loading...
            </li>
          </ul>
        } else if (error) {
          return <ul className="list-group">
            <li className="list-group-item">
              Error! {String(error)}
            </li>
          </ul>
        } else {
          if (!props.selectedDeckId && data.decks.length) {
            props.deckWasSelected(data.decks[0])
          }

          return <div className="list-group">
            <AddDeck deckWasSelected={props.deckWasSelected}/>
            {data.decks.map((deck) => (
              <a
                key={deck.id}
                className={"list-group-item list-group-item-action " + (deck.id === props.selectedDeckId ? "active" : "")}
                onClick={function(e){
                  e.preventDefault()
                  props.deckWasSelected(deck)
                }}
                href="#"
              >
                {deck.name}
              </a>
            ))}
          </div>
        }
      }}
  </Query>
)

export default Sidebar
