class Mutations::UpdateDeck < Mutations::BaseMutation
  argument :deck_id, ID, required: true
  argument :name, String, required: false
  argument :slots, [Types::SlotInput], required: false

  field :deck, Types::Deck, null: false

  def resolve(deck_id:, **args)
    _type_name, database_id = deck_id.split("/")
    deck = ::Deck.find(database_id)
    # TODO error handling
    attrs = {}
    if args.key?(:name)
      attrs[:name] = args[:name]
    end

    if args.key?(:slots)
      slots_by_card_id = {}
      deck.slots.each do |slot|
        slots_by_card_id[slot.scryfall_card_id] = slot.id
      end

      attrs[:slots_attributes] = args[:slots].map { |s|
        _card_type_name, scryfall_card_id = s[:card_id].split("/")
        slot_attr = {
          quantity: s[:quantity],
          scryfall_card_id: scryfall_card_id,
        }
        if slots_by_card_id.key?(scryfall_card_id)
          slot_attr[:id] = slots_by_card_id[scryfall_card_id]
        end
        slot_attr
      }
    end

    deck.update!(attrs)
    { deck: deck }
  end
end
