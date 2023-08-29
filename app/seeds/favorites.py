from app.models import db, environment, SCHEMA, User, Photo
from sqlalchemy.sql import text

def seed_favorites():
   user1 = User.query.get(1)


  #  user2 = User.query.get(2)
   photo1 = Photo.query.get(1)
   photo2 = Photo.query.get(2)
   photo3 = Photo.query.get(3)
   photo4 = Photo.query.get(4)
   photo5 = Photo.query.get(5)
   photo2.favorite_count += 1
   photo1.favorite_count += 1
   photo3.favorite_count += 1
   photo4.favorite_count += 1
   photo5.favorite_count += 1

   user1.photos.append(photo1)
   user1.photos.append(photo2)
   user1.photos.append(photo3)
   user1.photos.append(photo4)
   user1.photos.append(photo5)



   db.session.commit()






def undo_favorites():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM favorites"))

  db.session.commit()
