import React from "react";
import { ApolloProvider } from "react-apollo";
import Sidebar from "./Sidebar"
import DeckDetail from "./DeckDetail"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedDeckId: null }
  }

  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <div className="container-fluid">
          <nav className="navbar navbar-light bg-light row mb-2">
            <span className="navbar-brand mb-0 h1 col">Magic Deckbox</span>
          </nav>
          <div className="row">
            <div className="col-4">
              <Sidebar selectedDeckId={this.state.selectedDeckId} deckWasSelected={(deck) => {
                this.setState({selectedDeckId: deck.id})
              }}/>
            </div>
            <div className="col-8">
              <DeckDetail deckId={this.state.selectedDeckId}/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
