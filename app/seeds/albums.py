from app.models import db, Album, environment, SCHEMA

def seed_albums():
    test = Album(
        user_id=1, title='test', description='description for testing', thumbnail_Url='https://www.the-sun.com/wp-content/uploads/sites/6/2022/11/members-brian-roger-taylor-freddie-555539482.jpg'
    )
    nsync = Album(
        user_id=2, title='nsync', description='description for testing', thumbnail_Url='https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjAwMTI2MzYzNjU3NTc3NTgw/nsync-reunion-tour-nsync-reunion.jpg'
    )
    bts = Album(
        user_id=3, title='bts', description='description for testing', thumbnail_Url='https://imageio.forbes.com/specials-images/imageserve/1207828603/0x0.jpg?format=jpg&width=1200.jpg'
    )
    blackpink = Album(
        user_id=4, title='blackpink', description='description for testing', thumbnail_Url='https://www.billboard.com/wp-content/uploads/2023/04/do-not-reuse-blackpink-press-06-2022-billboard-YG-Entertainment-1548.jpg'
    )
    blkswn = Album(
        user_id=5, title='blkswn', description='description for testing', thumbnail_Url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKZWtgUnuj4zGaEETlYSUPpOLoC3ca_gNbQ&usqp=CAU.jpg'
    )


    db.session.add(test)
    db.session.add(nsync)
    db.session.add(bts)
    db.session.add(blackpink)
    db.session.add(blkswn)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
