module Types
  class QueryType < Types::BaseObject
    field :node, Types::Node, null: true do
      argument :id, ID, required: true
    end

    def node(id:)
      type_name, database_id = id.split
      case type_name
      when "Types::Deck"
        ::Deck.find(database_id)
      when "Types::Slot"
        ::Slot.find(database_id)
      when "Types::Card"
        ::Scryfall::Card.load(database_id)
      else
        raise "Unsupported node: #{id.inspect}"
      end
    end

    # TODO paginate
    field :decks, [Types::Deck], null: false

    def decks
      ::Deck.all
    end

    field :search_cards, [Types::Card], null: false do
      argument :query, String, required: true
    end

    def search_cards(query:)
      ::Scryfall::Card.search(query)
    end
  end
end
