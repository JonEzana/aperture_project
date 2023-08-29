from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Album
from app.forms import CreatePhotoForm

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/all')
@login_required
def all_photos():
    """
    Logged in homepage display all photots
    """
    photos = Photo.query.all()
    res = [photo.to_dict() for photo in photos]

    return {'photos': res}


@photo_routes.route('/<int:id>')
@login_required
def one_photo(id):
    """
    Query for a photo by id and return that photo in a dictioanry
    """
    one_photo = Photo.query.get(id)
    return one_photo.to_dict()


@photo_routes.route('/new', methods=["POST"])
@login_required
def create_photo():
    """
    Create new photo
    """
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('IN BACKEND @OU#OJ@!!!!!!!!!!!!!!!!!')
        new_photo = Photo(
            title=form.data['title'],
            url=form.data['url'],
            description=form.data['description'],
            preview_img=form.data['preview_img'],
            album_id=form.data['album_id'],
            user_id=current_user.id
        )
        print('NEW PHOTO BACKEND !!!!!!!', new_photo)
        db.session.add(new_photo)
        db.session.commit()
        # new_photo = Photo.query.filter(Photo.user_id == current_user.id).all()
        # return {"photos": [photo.to_dict() for photo in new_photo]}
        return new_photo.to_dict();

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@photo_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_photo(id):
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        photo_to_edit = Photo.query.get(id)
        album = Album.query.get(form.data['album_id'])

        photo_to_edit.title = form.data['title']
        photo_to_edit.description = form.data['description']
        album.photos.append(photo_to_edit)

        db.session.commit()
        return photo_to_edit.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@photo_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_your_photo(id):
    to_delete = Photo.query.get(id)
    db.session.delete(to_delete)
    db.session.commit()
    return {"Message": "Photo Deleted Successfully"}
