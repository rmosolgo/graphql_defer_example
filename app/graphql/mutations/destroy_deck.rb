class Mutations::DestroyDeck < Mutations::BaseMutation
  argument :deck_id, ID, required: true

  field :deck_id, ID, null: false

  def resolve(deck_id:)
    _type_name, database_id = deck_id.split("/")
    deck = ::Deck.find(database_id)
    deck.destroy
    { deck_id: deck_id }
  end
end
