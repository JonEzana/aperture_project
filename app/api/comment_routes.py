from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Comment, User
from app.forms import CreateCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:photoId>')     # <int: converts the param to integer
@login_required
def all_comments(photoId):
  """
  fetch all comments by the photo's id
  """
  comments = Comment.query.filter(Comment.photo_id == photoId).all()
  for comment in comments:
    res = {"comments": {}}
    user = User.query.filter(User.id == comment.user_id).first()
    new_comment = comment.to_dict()
    user = user.to_dict()
    res["comments"] = new_comment
    res["comments"]["Author"] = user
    new_comment["Author"] = user
  return res
