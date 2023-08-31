from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_, select
from app.models import Favorite, db, Photo, User

fav_routes = Blueprint('fav', __name__)


@fav_routes.route('/<int:userId>/allFav')
@login_required
def all_fav(userId):
    """Display all fav photos by the user"""
    res = []
    favs = Favorite.query.filter(Favorite.user_id == userId).all()
    for fav in favs:
        photoUrl = Photo.query.filter(Photo.id == fav.photo_id).first().to_dict()
        res.append(photoUrl)
    # user = User.query.get(userId)
    # lst = []
    # favorites = Favorite.query.filter(Photo.user_id == userId)
    # res =[favorite.photo.to_dict() for favorite in favorites]
    # print('RES backend....', res)
    return {"favPhotos": res}


@fav_routes.route('/<int:userId>/<int:photoId>/new', methods=["POST"])
@login_required
def create_fav(userId, photoId):
    """Create new fav to a photo by the user"""
    photo = Photo.query.get(photoId)
    user = Photo.query.get(userId)
    searchFavorite = Favorite.query.filter(and_(Favorite.user_id == userId, Favorite.photo_id == photoId)).all()

    if not len(searchFavorite):
        new_fav = Favorite(user_id = userId, photo_id = photoId)
        newphoto = photo.favorites.append(new_fav)

        # print('!!!!!!!!!!!!!!NEW PHOTO, line 35...........', newphoto)
        # print('...........LINE 39', new_fav.photo)
        photo.favorite_count += 1
        db.session.add(new_fav)
        db.session.commit()
        return {"favPhotos": new_fav.photo.to_dict()}
    else:
        delete_photo = Photo.query.filter(and_(Photo.user_id == userId, Photo.id == photoId)).first()
        print('backend delete !!!!!!!!!!!!!!', delete_photo)
        delete_photo.favorite_count -= 1
        db.session.delete(searchFavorite[0])
        db.session.commit()
        # print('search!!!!!!!!!!', searchFavorite[0])
        return {"favPhotos": delete_photo.to_dict(), 'Delete':'DeleteFav'}
