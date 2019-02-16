class Slot < ApplicationRecord
  belongs_to :deck
  validates :scryfall_card_id, uniqueness: { scope: :deck_id }
end
