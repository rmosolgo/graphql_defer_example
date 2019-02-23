class GraphqlDeferExampleSchema < GraphQL::Schema
  query(Types::QueryType)
  mutation(Types::MutationType)

  def self.object_from_id(id, ctx)
    type_name, database_id = id.split("/")
    case type_name
    when "Deck", "Slot"
      type_name.constantize.find(database_id)
    when "Card"
      ::Scryfall::Card.load(database_id)
    else
      raise "Unsupported node: #{id.inspect} (#{type_name.inspect}, #{database_id.inspect})"
    end
  end

  def self.resolve_type(type, obj, ctx)
    case obj
    when ::Deck
      Types::Deck
    when ::Slot
      Types::Slot
    when ::Scryfall::Card
      Types::Card
    else
      raise "Unknown resolve_type: #{type}, #{obj}"
    end
  end

  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  use GraphQL::Pro::Defer
end
