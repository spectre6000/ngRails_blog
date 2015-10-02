class PostsController < ApplicationController
  before_action :get_post, except: [:index, :create]
  respond_to :html, :json

  def index
    @post = Post.all
    respond_with(@posts) do |format|
      format.json { render :json => @post.as_json }
      format.html
    end
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post.as_json, status: :ok
    else
      render json: {post: @post.errors, status: :no_content}
    end
  end      

  def show
    respond_with(@post.as_json)
  end

  def update
    if @post.update_attributes(user_params)
      render json: @post.as_json, status: :ok 
    else
      render json: {post: @post.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @post.destroy
    render json: {status: :ok}
  end

  private

    def user_params
      params.fetch(:post, {}).permit(:title, :body, :date)
    end

    def get_user
      @post = Post.find(params[:id])
      render json: {status: :not_found} unless @post
    end

end
