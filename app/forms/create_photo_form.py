from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from app.models import Photo

class CreatePhotoForm(FlaskForm):
    title = StringField('Add a title', validators=[DataRequired(), Length(min=3, max=30)])
    description = TextAreaField('Add a description')
    url = StringField('Choose a photo', validators=[URL()])
    preview_img = BooleanField(default=False)
    album_id = IntegerField('Add to a album')
    submit = SubmitField('Create new photo')
