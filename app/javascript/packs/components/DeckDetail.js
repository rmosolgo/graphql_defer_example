import React from "react";
import GetDeckDetailQuery from "../graphql/GetDeckDetail.graphql"
import { Query, Mutation } from "react-apollo"
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import AutocompleteCardQuery from "../graphql/AutocompleteCard.graphql"
import AddCardMutation from "../graphql/AddCard.graphql"
import RemoveCardMutation from "../graphql/RemoveCard.graphql"

class DeckDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { cardQuery: "", selectedCard: null, selectedQuantity: 4 }
  }

  render() {
    if (!this.props.deckId) {
      return (
        <p>Select or add a deck.</p>
      )
    }
    return (
      <Query query={GetDeckDetailQuery} variables={{deckId: this.props.deckId}}>
        {({ loading, error, data, loadingState}) => {
          if (loading) {
            return <p>Loading ... </p>
          } else if (error) {
            console.error(error)
            return <p>Error: {String(error)}</p>
          } else {
            const deck = data.deck
            if (!deck) {
              return <p>No deck</p>
            }
            return (
              <div>
                <h1>{deck.name}</h1>
                <table className="table">
                  <thead>
                  </thead>
                  <tbody>
                  {deck.slots.map((slot) => {
                    const totalPrice = slot.card ? (Math.round(slot.card.price * slot.quantity * 100) / 100).toFixed(2) : "..."
                    return (
                      <tr key={slot.id} className="row">
                        <td className="col-1">{slot.quantity}x</td>
                        <td className="col-5">{slot.card && slot.card.name}</td>
                        <td className="col-4">{slot.card && slot.card.type}</td>
                        <td className="col-1">${totalPrice}</td>
                        <td className="col-1">
                          <Mutation
                            mutation={RemoveCardMutation}
                            update={(cache, { data }) => {
                              cache.writeQuery({
                                query: GetDeckDetailQuery,
                                variables: { deckId: deck.id},
                                data: { deck: data.removeCardFromDeck.deck },
                              });
                            }}
                          >
                            {(removeCard, { data }) => {
                              return (
                                <button className="btn btn-outline-danger btn-sm" onClick={(e) => removeCard({variables: { deckId: deck.id, cardId: slot.card && slot.card.id }})}>
                                  𝘅
                                </button>
                              )
                            }}
                          </Mutation>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="row">
                    <td className="col-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quantity"
                        value={this.state.selectedQuantity}
                        onChange={(e) => this.setState({ selectedQuantity: Number(e.target.value) })}
                      />
                    </td>
                    <td colSpan="2" className="col-9">
                      <Query query={AutocompleteCardQuery} variables={{query: this.state.cardQuery}}>
                        {({ loading, error, data }) => {
                          if (error) {
                            return <p>Error: {String(error)}</p>
                          } else {
                            const options = (loading || (!data.searchCards)) ? [] : data.searchCards.map((card) => ({id: card.id, name: card.name}))
                            return <AsyncTypeahead
                              labelKey="name"
                              minLength={3}
                              isLoading={loading}
                              allowNew={false}
                              multiple={false}
                              onChange={(items) => { this.setState({selectedCard: items[0]}) }}
                              onSearch={(q) => { this.setState({cardQuery: q}) }}
                              options={options}
                              placeholder="Find a card..."
                              ref={(typeahead) => this.typeahead = typeahead}
                            />
                          }
                        }}
                      </Query>
                    </td>
                    <td colSpan="2" className="col-2">
                      <Mutation
                        mutation={AddCardMutation}
                        update={(cache, { data }) => {
                          cache.writeQuery({
                            query: GetDeckDetailQuery,
                            variables: { deckId: deck.id},
                            data: { deck: data.addCardToDeck.deck },
                          });
                          this.typeahead.getInstance().clear()
                          this.setState({selectedCard: null, selectedQuantity: 4, cardQuery: ""})
                        }}
                      >
                        {(addCard, { data }) => (
                          <button
                            className="btn btn-outline-primary"
                            onClick={(e) => {
                              const variables = {
                                cardId: this.state.selectedCard.id,
                                quantity: this.state.selectedQuantity,
                                deckId: deck.id
                              }
                              addCard({variables: variables})
                            }}
                          >
                            Add Card
                          </button>
                        )}
                      </Mutation>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}


export default DeckDetail
