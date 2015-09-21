FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "User #{n}" }
  end

  factory :pin do
    item_name "Fabulous Item"
    buy_sell Random.rand(2) > 0 ? true:false
    description "Test test test"

    association :user
  end
end
