class PinsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :update]
  before_action :require_owner, only: [:destroy, :update]

  def index
    @pins = Pin.all

    respond_to do |format|
      format.json { render json: @pins.to_json( include: :user )}
    end
  end

  def show
    @pin = Pin.find(params[:id])

    respond_to do |format|
      format.json { render json: @pin.to_json( include: :user )}
    end
  end

  def create
    @pin = Pin.new(whitelist_pin_params)
    if @pin.save
      respond_to do |format|
        format.json { render json: @pin.to_json( include: :user )}
      end
    end
  end

  def update
    @pin = Pin.find(params[:id])
    respond_to do |format|
      if @pin.update(whitelist_pin_params)
        format.json {render json: @pin.to_json( include: :user) }
      end
    end
  end

  def destroy
    @pin = Pin.find(params[:id])

    respond_to do |format|
      if @pin.destroy
        format.json {render json: @pin.to_json }
      end
    end
  end

  private

  def whitelist_pin_params
    params.require(:pin).permit(:item_name, :buy_sell, :description, :user_id)
  end

  def require_owner
    # binding.pry
    unless current_user.id == Pin.find(params[:id]).user_id
      respond_to do |format|
        format.json { render json: {message: "Error", status: 400}}
      end
    end
  end

  # def require_user
  #   unless current_user
  #     respond_to do |format|
  #       # ???
  #     end
  #   end
  # end
end
