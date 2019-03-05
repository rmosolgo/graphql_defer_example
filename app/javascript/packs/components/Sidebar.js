import React from "react";
import GetDecks from "../graphql/GetDecks.graphql"
import {Query} from "react-apollo"
import AddDeck from "./AddDeck"

class Sidebar extends React.Component {
  render() {
    return <Query
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
            return <div className="list-group">
              <AddDeck deckWasSelected={this.props.deckWasSelected}/>
              {data.decks.map((deck) => (
                <a
                  key={deck.id}
                  className={"list-group-item list-group-item-action " + (deck.id === this.props.selectedDeckId ? "active" : "")}
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.deckWasSelected(deck)
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
  }
}

export default Sidebar
