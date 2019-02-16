class Types::Card < Types::BaseObject
  implements Types::Node
  field :name, String, null: false
  field :set, String, null: false
  field :type, String, null: false
  field :image_url, String, null: false
  field :price, Float, null: false
end
