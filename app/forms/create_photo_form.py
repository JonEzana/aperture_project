from flask_wtf import FlaskForm
from wtforms import StringField, IntergerField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Length, URL
from app.models import Photo

class CreatePhotoForm(FlaskForm):
    titile = StringField('Add a title', validators=[DataRequired(), Length(min=3, max=30)])
    description = TextAreaField('Add a description')
    url = StringField('Choose a photo', validators=[URL()])
    preview_img = BooleanField(default=False)
    album_id = IntergerField('Add to a album')
