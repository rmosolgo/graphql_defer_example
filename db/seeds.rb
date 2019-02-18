# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Deck.all.each(&:destroy)
def create_deck(name, card_names_and_quantities)
  deck = Deck.create!(name: name)
  card_names_and_quantities.each do |card_name, quantity|
    card = Scryfall::Card.by_name(card_name)
    deck.slots.create!(scryfall_card_id: card.id, quantity: quantity)
  end
  deck
end

create_deck("RDW", {
  "Mountain" => 22,
  "Fanatical Firebrand" => 4,
  "Ghitu Lavarunner" => 4,
  "Goblin Chainwhirler" => 4,
  "Rekindling Phoenix" => 2,
  "Runaway Steam-Kin" => 4,
  "Viashino Pyromancer" => 4,
  "Banefire" => 1,
  "Lightning Strike" => 4,
  "Shock" => 4,
  "Wizard's Lightning" => 4,
  "Experimental Frenzy" => 3,
})

create_deck("UrzaTron", {
  "Forest" => 4,
  "Ghost Quarter" => 1,
  "Horizon Canopy" => 1,
  "Sanctum of Ugin" => 1,
  "Urza's Mine" => 4,
  "Urza's Power Plant" => 4,
  "Urza's Tower" => 4,
  "Ulamog, the Ceaseless Hunger" => 2,
  "Walking Ballista" => 2,
  "World Breaker" => 1,
  "Wurmcoil Engine" => 4,
  "Ancient Stirrings" => 4,
  "Sylvan Scrying" => 4,
  "Chromatic Sphere" => 4,
  "Chromatic Star" => 4,
  "Expedition Map" => 4,
  "Karn Liberated" => 4,
  "Oblivion Stone" => 4,
  "Relic of Progenitus" => 2,
  "Ugin, the Spirit Dragon" => 2,
})


create_deck "Amulet Titan", {
  "Aether Hub" => 2,
  "Boros Garrison" => 1,
  "Crumbling Vestige" => 1,
  "Forest" => 2,
  "Gemstone Mine" => 4,
  "Golgari Rot Farm" => 1,
  "Gruul Turf" => 2,
  "Khalni Garden" => 1,
  "Radiant Fountain" => 1,
  "Selesnya Sanctuary" => 1,
  "Simic Growth Chamber" => 4,
  "Slayers' Stronghold" => 1,
  "Sunhome, Fortress of the Legion" => 1,
  "Temple of Mystery" => 2,
  "Tolaria West" => 3,
  "Vesuva" => 1,
  "Azusa, Lost but Seeking" => 3,
  "Primeval Titan" => 4,
  "Ancient Stirrings" => 4,
  "Pact of Negation" => 2,
  "Serum Visions" => 2,
  "Summoner's Pact" => 4,
  "Amulet of Vigor" => 4,
  "Coalition Relic" => 1,
  "Engineered Explosives" => 2,
  "Hive Mind" => 2,
  "Lotus Bloom" => 4,
}
