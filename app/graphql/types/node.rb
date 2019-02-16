module Types::Node
  include Types::BaseInterface

  field :id, ID, null: false

  def id
    "#{self.class.graphql_name}/#{object.id}"
  end
end
