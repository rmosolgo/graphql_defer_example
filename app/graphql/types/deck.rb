class Types::Deck < Types::BaseObject
  implements Types::Node
  field :name, String, null: false
  field :creatures, [Types::Slot], null: false
  field :spells, [Types::Slot], null: false
  field :lands, [Types::Slot], null: false
  field :slots, [Types::Slot], null: false
end
