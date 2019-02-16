require "open-uri"
class Scryfall::Card
  attr_reader :id, :name, :set, :type, :price, :image_url

  def initialize(id:, name:, set:, type:, price:, image_url:)
    @id = id
    @name = name
    @set = set
    @type = type
    @price = price
    @image_url = image_url
  end

  def self.load(scryfall_id)
    card_json = scryfall_request("/cards/#{scryfall_id}")
    from_json(card_json)
  end

  def self.search(query)
    search_json = scryfall_request("/cards/autocomplete?q=#{query}")
    card_names = search_json["data"]
    card_names.map do |card_name|
      card_json = scryfall_request("/cards/named?exact=#{card_name}")
      from_json(card_json)
    end
  end

  class << self
    private

    def from_json(card_json)
      self.new(
        id: card_json.fetch("id"),
        name: card_json.fetch("name"),
        type: card_json.fetch("type_line"),
        price: card_json.fetch("usd").to_f,
        set: card_json.fetch("set"),
        image_url: card_json.fetch("image_uris").fetch("png")
      )
    end

    def scryfall_request(path)
      scryfall_url = "https://api.scryfall.com#{path}"
      scryfall_data = open(scryfall_url).read
      JSON.parse(scryfall_data)
    end
  end
end
