from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .photos import Photo

favorites = db.Table(
    "favorites",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("photo_id", db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True)
)

if environment == "production":
    favorites.schema = SCHEMA


# class Fav(db.Model):
#     __tablename__ = 'favorites'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')))

#     users = db.relationship('User', back_populates='favorites')
#     photo = db.relationship('Photo', back_populates='favorites')


    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'userId': self.user_id,
    #         'photoId': self.photo_id,
    #     }
