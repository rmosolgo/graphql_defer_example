# GraphQL-Ruby Defer Example

This app demonstrates how to use [`@defer`](#) with Rails, GraphQL-Ruby, Apollo Client and React.

The app is a deck builder for Magic the Gathering:

- _Decks_ are persisted in the app's local database (`::Deck` and `::Slot`)
- _Cards_ are fetched from [Scryfall](https://scryfall.com)'s REST API (`::Scryfall::Card`)

`@defer` is used to reduce time-to-first-byte: local data is returned immediately, but external calls are deferred.

![demo of behavior](#)

## Development

- Clone the repo
- `bundle install`
- `bundle exec db:create db:migrate`
- `bundle exec rails server`

## Testing

- `bundle exec rails test:system`
