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

  describe 'POST /pins/' do
    # let(:new_pin) { FactoryGirl.create(:pin) }

    it 'should increment the count of pins by 1' do
      expect{
        post :create, format: :json, pin: pin.attributes
      }.to change(Pin, :count).by(1)
    end

  end

  describe 'PUT /pins/id/edit' do

    it 'should edit the pin properly' do
      new_pin = pin
      new_pin.item_name = "Abc123"
      put :update, format: :json, id: pin.id, pin: new_pin.attributes
      expect(pin.item_name).to eq("Abc123")
    end

    it 'should not edit the pin improperly' do
      new_pin = pin
      new_pin.item_name = "Abc1234"
      put :update, format: :json, id: pin.id, pin: new_pin.attributes
      expect(pin.item_name).to_not eq("Abc123")
    end
  end

  describe 'Delete /pins/id' do

    it 'should delete pins properly' do
      expect{ delete :destroy, format: :json, id: pin.id }.to change(Pin, :count).by(-1)
    end
  end
end
