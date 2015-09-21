require 'rails_helper'

describe PinsController do

  let!(:pin){ FactoryGirl.create(:pin) }
  let(:json){ JSON.parse(response.body) }

  describe 'GET /pins' do

    before do
      get :index, format: :json
    end

    it 'should return a collection including all pins' do
      expect(json.map{|item| item["id"] }).to include(pin.id)
    end

  end

  describe 'SHOW /pins/:id' do

    before do
      get :show, format: :json, id: 1
    end

    it 'should return the correct item name' do
      expect(json["item_name"]).to eq(pin.item_name)
    end

    it 'should return the correct buy/sell state' do
      expect(json["buy_sell"]).to eq(pin.buy_sell)
    end

    it 'should return the correct description' do
      expect(json["description"]).to eq(pin.description)
    end

  end

end
