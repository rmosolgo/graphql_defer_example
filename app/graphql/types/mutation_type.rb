module Types
  class MutationType < Types::BaseObject
    field :create_deck, mutation: Mutations::CreateDeck
    field :update_deck, mutation: Mutations::UpdateDeck
    field :destroy_deck, mutation: Mutations::DestroyDeck
  end
end
