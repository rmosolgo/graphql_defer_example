class Types::Slot < Types::BaseObject
  implements Types::Node

  field :deck, Types::Deck, null: false
  field :quantity, Integer, null: true
  field :card, Types::Card, null: true

  def card
    ::Scryfall::Card.load(object.scryfall_card_id)
  end
end
