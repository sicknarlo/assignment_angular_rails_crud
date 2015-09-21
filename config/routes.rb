Rails.application.routes.draw do
  devise_for :users
  root to: "static#index"
  scope :api do
    scope :v1 do
      resources :users
      resources :pins
    end
  end
end
