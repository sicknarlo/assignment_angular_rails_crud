class Pin < ActiveRecord::Base
  belongs_to :user
  default_scope { includes :user }

end
