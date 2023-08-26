from flask import Blueprint, session
from sqlalchemy import and_
from flask_login import login_required, current_user
from app.models import Album, db, Photo
from app.forms import CreateAlbumForm

album_routes = Blueprint('albums', __name__)

@album_routes.route('/<int:userId>')
@login_required
def all_albums(userId):
    """Display all albums for the current user"""
    albums = Album.query.filter(Album.user_id == userId).all()

    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:userId>/<int:id>')
@login_required
def one_album(id):
    """
    Query for one album by album id
    """
    one_album = Album.query.get(id)
    return one_album.to_dict()


@album_routes.route('/<int:userId>/new', methods=['POST'])
@login_required
def create_album(userId):
    """
    Create a new album for the current user
    """
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    photo = Photo.query.filter(and_(Photo.preview_img == True, Photo.user_id == userId)).first()

    if form.validate_on_submit():
        new_album = Album(
            title=form.data['title'],
            description=form.data['description'],
            user_id=current_user.id,
            thumbnail_Url=photo.url
        )

        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@album_routes.route('/<int:userId>/edit/<int:id>', methods=['PUT'])
@login_required
def update_album(id):
    """
    Update an album based on album id for the current user
    """
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    album_to_edit = Album.query.get(id)

    if form.validate_on_submit():
        album_to_edit['title'] = form.data['title']
        album_to_edit['description'] = form.data['description']

        db.session.commit()
        return album_to_edit.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@album_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_your_album(id):
    to_delete = Album.query.get(id)
    db.session.delete(to_delete)
    db.session.commit()
    return {"Message": "Album Deleted Successfully"}