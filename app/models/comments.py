from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Comment(db.Model):
  __tablename__='comments'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  user_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')))
  comment = db.Column(db.String(100), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.now())

  user = db.relationship('User', back_populates='comments')
  photo = db.relationship('Photo', back_populates='comments')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'photoId': self.photo_id,
      'comment': self.comment,
      'createdAt': self.created_at,
    }
