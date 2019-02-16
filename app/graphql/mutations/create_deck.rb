class Mutations::CreateDeck < Mutations::BaseMutation
  argument :name, String, required: true

  field :deck, Types::Deck, null: false

  def resolve(name:)
    deck = ::Deck.new(name: name)
    # TODO error handling
    deck.save!
    { deck: deck }
  end
end
