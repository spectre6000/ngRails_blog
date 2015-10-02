class RenameBlogsToPosts < ActiveRecord::Migration
  def change
    def self.up
      rename_table :blogs, :posts
    end

    def self.down
      rename_table :posts, :blogs
    end
  end
end
