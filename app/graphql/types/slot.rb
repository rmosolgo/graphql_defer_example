class Types::Slot < Types::BaseObject
  field :deck, Types::Deck, null: false
  field :quantity, Integer, null: false
  field :card, Types::Card, null: false

  def card
    ::Scryfall::Card.load(object.scryfall_card_id)
  end
end
