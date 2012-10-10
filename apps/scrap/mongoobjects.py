
from mongoengine import *

import datetime


class User(Document):
    email =StringField(required=True)
    name = StringField(required=True)
    password = StringField(required=True)
    created = DateTimeField(required=True, default = datetime.datetime.utcnow)

class Scrap(Document):
    owner = ReferenceField(User)
    created = DateTimeField(required=True, default = datetime.datetime.utcnow)
    url = StringField(required=True)
    text = StringField(required=False)
    imagepath = StringField(required=False)
    meta = {
        'ordering': ['-created']
    }
