module Types
  class MutationType < Types::BaseObject
    field :add_card_to_deck, mutation: Mutations::AddCardToDeck
    field :remove_card_from_deck, mutation: Mutations::RemoveCardFromDeck
    field :create_deck, mutation: Mutations::CreateDeck
    field :destroy_deck, mutation: Mutations::DestroyDeck
  end
end
