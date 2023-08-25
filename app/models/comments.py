from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



comments = db.Table(

  if environment == "production":
    __table_args__ = {'schema': SCHEMA} 

  "comments",
  db.Model.metadata,
  db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
  db.Column("photo_id", db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True),
  comment = db.Column(db.String(500), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.now())
)


  # relationships
  # user = db.relationship('User', back_populates='comments')
  # photo = db.relationship('Photo', back_populates='comments')

  # user = db.relationship(
  #   "User",
  #   secondary=comments,
  #   back_populates="comments"
  # )