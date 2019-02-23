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
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading ... </p>
          } else if (error) {
            return <p>Error: {String(error)}</p>
          } else {
            const deck = data.deck
            return (
              <div>
                <h1>{deck.name}</h1>
                <table className="table">
                  <thead>
                  </thead>
                  <tbody>
                  {deck.slots.map((slot) => {
                    const totalPrice = (Math.round(slot.card.price * slot.quantity * 100) / 100).toFixed(2)
                    return (
                      <tr key={slot.id}>
                        <td>{slot.quantity}x</td>
                        <td>{slot.card.name}</td>
                        <td>{slot.card.type}</td>
                        <td>${totalPrice}</td>
                        <td>
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
                                <button className="btn btn-outline-danger btn-sm" onClick={(e) => removeCard({variables: { deckId: deck.id, cardId: slot.card.id }})}>
                                  𝘅
                                </button>
                              )
                            }}
                          </Mutation>
                        </td>
                      </tr>
                    )
                  })}
                  <tr row>
                    <td className="input-group col-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quantity"
                        value={this.state.selectedQuantity}
                        onChange={(e) => this.setState({ selectedQuantity: Number(e.target.value) })}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">x</span>
                      </div>
                    </td>
                    <td colSpan="2" className="col-6">
                      <Query query={AutocompleteCardQuery} variables={{query: this.state.cardQuery}}>
                        {({ loading, error, data }) => {
                          if (error) {
                            return <p>Error: {String(error)}</p>
                          } else {
                            return <AsyncTypeahead
                              labelKey="name"
                              minLength={3}
                              isLoading={loading}
                              allowNew={false}
                              multiple={false}
                              onChange={(items) => { this.setState({selectedCard: items[0]}) }}
                              onSearch={(q) => { this.setState({cardQuery: q}) }}
                              options={loading ? [] : data.searchCards.map((card) => ({id: card.id, name: card.name}))}
                              placeholder="Find a card..."
                              ref={(typeahead) => this.typeahead = typeahead}
                            />
                          }
                        }}
                      </Query>
                    </td>
                    <td colSpan="2" className="col-3">
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
                              console.log(variables)
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
