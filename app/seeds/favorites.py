from app.models import db, environment, SCHEMA, User, Photo
from sqlalchemy.sql import text

def seed_favorites():
   user1 = User.query.get(1)
   user2 = User.query.get(2)
   photo1 = Photo.query.get(1)
   photo2 = Photo.query.get(2)

   user1.photos.append(photo1)
   user2.photos.append(photo2)
   db.session.commit()






def undo_favorites():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM favorites"))

  db.session.commit()