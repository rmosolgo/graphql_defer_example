module Types
  class QueryType < Types::BaseObject
    field :node, Types::Node, null: true do
      argument :id, ID, required: true
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    # TODO paginate :P
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
