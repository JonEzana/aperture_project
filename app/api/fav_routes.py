from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_, select
from app.models import favorites, db, Photo, User

fav_routes = Blueprint('fav', __name__)


@fav_routes.route('/<int:userId>/allFav')
@login_required
def all_fav(userId):
    """Display all fav photos by the user"""
    favPhotos = Photo.query.filter(and_(Photo.liked == True, Photo.user_id == userId)).all()
    return {"favPhotos": [photo.to_dict() for photo in favPhotos]}


@fav_routes.route('/<int:userId>/<int:photoId>/new', methods=["PUT"])
@login_required
def create_fav(userId, photoId):
    """Create new fav to a photo by the user"""
    user = User.query.get(userId)
    photo = Photo.query.get(photoId)
    user.photos.append(photo)
    photo.favorite_count += 1
    db.session.commit()

    favPhotos = Photo.query.filter(and_(Photo.liked == True, Photo.user_id == userId)).all()
    return {"favPhotos": [photo.to_dict() for photo in favPhotos]}
