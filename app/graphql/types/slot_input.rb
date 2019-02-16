class Types::SlotInput < Types::BaseInputObject
  argument :quantity, Integer, required: true
  argument :card_id, ID, required: true
end
