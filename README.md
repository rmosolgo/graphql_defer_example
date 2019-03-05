# GraphQL-Ruby Defer Example

This app demonstrates how to use [`@defer`](#) with Rails, GraphQL-Ruby, Apollo Client and React.

The app is a deck builder for Magic the Gathering:

- _Decks_ are persisted in the app's local database (`::Deck` and `::Slot`)
- _Cards_ are fetched from [Scryfall](https://scryfall.com)'s REST API (`::Scryfall::Card`)

`@defer` is used to reduce time-to-first-byte: local data is returned immediately, but external calls are deferred.

![rails-with-defer](https://user-images.githubusercontent.com/2231765/53442027-4a122b00-39d6-11e9-8d7b-feb7a4f7962a.gif)

## Development

- Clone the repo
- `bundle install`
- `bundle exec db:create db:migrate`
- Install & compile the local `apollo-client` fork (https://github.com/rmosolgo/apollo-client/):
  - `cd app/javascript/apollo-client`
  - `npm install`
- `yarn install`
- `bundle exec rails server`
