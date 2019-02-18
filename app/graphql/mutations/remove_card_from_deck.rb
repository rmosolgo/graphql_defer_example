class Mutations::RemoveCardFromDeck < Mutations::BaseMutation
  argument :deck_id, ID, required: true, loads: Types::Deck
  argument :card_id, ID, required: true, loads: Types::Card

  field :deck, Types::Deck, null: false

  def resolve(deck:, card:)
    slot = deck.slots.find_by(scryfall_card_id: card.id)
    if slot
      slot.destroy
    end
    { deck: deck }
  end
end
