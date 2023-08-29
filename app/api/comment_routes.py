from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Comment
from app.forms import CreateCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:photoId>')     # <int: converts the param to integer
@login_required
def all_comments(photoId):
  """
  fetch all comments by the photo's id
  """
  comments = Comment.query.filter(Comment.photo_id == photoId).all()
  comment_list = [comment.to_dict() for comment in comments]

  return {'comments': comment_list}      