FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "User #{n}" }
  end

  factory :pin do
    item_name "Fabulous Item"
    buy_sell true

    association :user
  end
end
