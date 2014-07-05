from google.appengine.ext import db

class Glyph(db.Model):
    glyph_id = db.IntegerProperty(indexed=True)
    page_number = db.IntegerProperty()
    line_number = db.IntegerProperty()
    sura_number = db.IntegerProperty()
    ayah_number = db.IntegerProperty()
    position = db.IntegerProperty()
    min_x = db.IntegerProperty()
    max_x = db.IntegerProperty()
    min_y = db.IntegerProperty()
    max_y = db.IntegerProperty()
    resolution = db.IntegerProperty()
