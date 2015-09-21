require 'rails_helper'

describe PinsController do

  let!(:pin){ FactoryGirl.create(:pin) }
  let(:json){ JSON.parse(response.body) }

  describe 'GET /pins' do

    before do
      get :index, format: :json
    end

    it 'should return a collection including all posts' do

    end

  end

end
