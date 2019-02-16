class Deck < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  has_many :slots, dependent: :delete_all
  accepts_nested_attributes_for :slots
end
