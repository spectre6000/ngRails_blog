class Post < ActiveRecord::Base
  validates :title, :body, :release_date, presence: true
end
