# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
srand(12345)
5.times do |i|
  new_user = User.create!(username: Faker::Name.name, password: "abcd1234", password_confirmation: "abcd1234")
  (rand(5) + 1).times do |i|
    new_user.pins.create(item_name: Faker::Commerce.product_name,
                         buy_sell: rand(2) > 0 ? true : false,
                         description: Faker::Lorem.sentence)
  end
end
