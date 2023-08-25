from app.models import db, Photo, environment, SCHEMA
import random
from sqlalchemy.sql import text

photos = ["https://w7.pngwing.com/pngs/132/187/png-transparent-cheems-dog-thumbnail.png", "https://w7.pngwing.com/pngs/297/760/png-transparent-dog-puppy-dog-sad-carnivoran-pet-dog-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/868/112/png-transparent-dog-dog-6-animals-carnivoran-dog-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/664/275/png-transparent-himalayan-cat-thai-cat-siamese-cat-balinese-cat-birman-ragdoll-cat-mammal-animals-cat-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/83/441/png-transparent-cat-kitten-dog-pet-sitting-cat-mammal-cat-like-mammal-animals-thumbnail.png", "https://w7.pngwing.com/pngs/979/237/png-transparent-cat-food-chicken-as-food-cat-mammal-food-cat-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/584/499/png-transparent-silver-tabby-cat-kitten-whiskers-cat-food-cat-person-kitten-mammal-animals-cat-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/387/683/png-transparent-why-paint-cats-drawing-painting-art-cat-multicolored-cat-painting-tshirt-blue-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/934/403/png-transparent-persian-cat-siberian-cat-norwegian-forest-cat-maine-coon-kitten-cats-mammal-animals-cat-like-mammal-thumbnail.png", "https://w7.pngwing.com/pngs/379/263/png-transparent-gray-mountain-range-mountain-icon-mountain-computer-wallpaper-desktop-wallpaper-elevation-thumbnail.png", "https://w7.pngwing.com/pngs/502/373/png-transparent-selective-focus-graphy-body-of-water-light-ocean-underwater-deep-sea-beautiful-ocean-views-of-the-ocean-cloud-photography-teal-thumbnail.png", "https://w7.pngwing.com/pngs/873/806/png-transparent-underwater-underwater-sea-ocean-submarine-volcano-sea-texture-photography-computer-wallpaper-thumbnail.png", "https://w7.pngwing.com/pngs/235/749/png-transparent-body-of-water-during-daytime-the-blue-economy-light-ocean-sea-ocean-blue-landscape-computer-wallpaper-thumbnail.png", "https://w7.pngwing.com/pngs/754/79/png-transparent-island-light-natural-landscape-ocean-nature-sarawati-landscape-computer-wallpaper-sunlight-thumbnail.png", "https://w7.pngwing.com/pngs/689/17/png-transparent-ramen-tempura-sushi-miso-soup-ramen-thumbnail.png", "https://w7.pngwing.com/pngs/994/460/png-transparent-tteok-bokki-ramen-rice-cake-nian-gao-korean-pasta-ramen-cake-food-seafood-recipe-thumbnail.png", "https://w7.pngwing.com/pngs/75/803/png-transparent-brenebon-ramen-soup-food-cornerstone-family-restaurant-soup-miscellaneous-soup-food-thumbnail.png", "https://w7.pngwing.com/pngs/225/476/png-transparent-ramen-in-bowl-illustration-ramen-thukpa-okinawa-soba-laksa-japanese-cuisine-japanese-style-ramen-bowl-with-spoon-soup-food-chinese-style-thumbnail.png", "https://w7.pngwing.com/pngs/588/319/png-transparent-sushi-doughnut-japanese-cuisine-sushi-food-recipe-green-tea-thumbnail.png", "https://w7.pngwing.com/pngs/882/896/png-transparent-yakisoba-sushi-japanese-cuisine-jiaozi-restaurant-sushi-food-recipe-chinese-noodles-thumbnail.png", "https://w7.pngwing.com/pngs/56/985/png-transparent-pizza-margherita-sushi-pizza-pizza-delivery-pizza-thumbnail.png", "https://w7.pngwing.com/pngs/686/527/png-transparent-fast-food-hamburger-sushi-pizza-fast-food-food-breakfast-fast-food-restaurant-thumbnail.png"]


def seed_photos():
  Photo1 = Photo(
    user_id=1, album_id=1, url=random.choice(photos), title='Photo1', description='description1', preview_img=True
  )
  Photo2 = Photo(
    user_id=2, album_id=2, url=random.choice(photos), title='Photo2', description='description2', preview_img=True
  )
  Photo3 = Photo(
    user_id=3, album_id=3, url=random.choice(photos), title='Photo3', description='description3', preview_img=True
  )
  Photo4 = Photo(
    user_id=4, album_id=4, url=random.choice(photos), title='Photo4', description='description4', 
    preview_img=True
  )
  Photo5 = Photo(
    user_id=5, album_id=1, url=random.choice(photos), title='Photo5', description='description5',
    preview_img=True
  )
  Photo6 = Photo(
    user_id=6, album_id=2, url=random.choice(photos), title='Photo6', description='description6', 
  )
  Photo7 = Photo(
    user_id=7, album_id=3, url=random.choice(photos), title='Photo7', description='description7', 
  )
  Photo8 = Photo(
    user_id=1, album_id=4, url=random.choice(photos), title='Photo8', description='description8', 
  )
  Photo9 = Photo(
    user_id=2, album_id=5, url=random.choice(photos), title='Photo9', description='description9', 
  )
  Photo10 = Photo(
    user_id=3, album_id=1, url=random.choice(photos), title='Photo10', description='description10', 
  )
  Photo11 = Photo(
    user_id=4, album_id=2, url=random.choice(photos), title='Photo11', description='description11', 
  )
  Photo12 = Photo(
    user_id=5, album_id=3, url=random.choice(photos), title='Photo12', description='description12', 
  )
  Photo13 = Photo(
    user_id=6, album_id=4, url=random.choice(photos), title='Photo13', description='description13', 
  )
  Photo14 = Photo(
    user_id=7, album_id=5, url=random.choice(photos), title='Photo14', description='description14', 
  )
  Photo15 = Photo(
    user_id=1, album_id=1, url=random.choice(photos), title='Photo15', description='description15', 
  )


  db.session.add(Photo1)
  db.session.add(Photo2)
  db.session.add(Photo3)
  db.session.add(Photo4)
  db.session.add(Photo5)
  db.session.add(Photo6)
  db.session.add(Photo7)
  db.session.add(Photo8)
  db.session.add(Photo9)
  db.session.add(Photo10)
  db.session.add(Photo11)
  db.session.add(Photo12)
  db.session.add(Photo13)
  db.session.add(Photo14)
  db.session.add(Photo15)
  db.session.commit()

def undo_photos():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM photos"))

  db.session.commit()