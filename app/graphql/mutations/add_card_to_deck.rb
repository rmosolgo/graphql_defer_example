class Mutations::AddCardToDeck < Mutations::BaseMutation
  argument :deck_id, ID, required: true, loads: Types::Deck
  argument :card_id, ID, required: true, loads: Types::Card
  argument :quantity, Integer, required: true

  field :deck, Types::Deck, null: false

  def resolve(deck:, card:, quantity:)
    slot = deck.slots.find_or_initialize_by(scryfall_card_id: card.id)
    slot.quantity ||= 0
    slot.quantity += quantity
    slot.save!
    { deck: deck }
  end
end
