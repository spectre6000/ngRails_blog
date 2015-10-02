require 'test_helper'

class PostTest < ActiveSupport::TestCase
    test "should not save post entry without any of title, body, or release date" do
    post = Post.new(body: 'Test body', release_date: Time.now)
    assert_not post.save
    post = Post.new(title: 'Test', release_date: Time.now)
    assert_not post.save
    post = Post.new(title: 'Test', body: 'Test body')
    assert_not post.save
    post = Post.new(title: 'Test', body: 'Test body', release_date: Time.now)
    assert post.save
  end
end
