class CreateSlots < ActiveRecord::Migration[5.2]
  def change
    create_table :slots do |t|
      t.references :deck, foreign_key: true
      t.string :scryfall_card_id, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
  end
end
