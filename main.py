__author__ = 'bustamam'

import rest
import webapp2
from google.appengine.ext import db

class Glyph(db.Model):
    glyph_id = db.IntegerProperty()
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

application = webapp2.WSGIApplication([('/rest/.*', rest.Dispatcher)], debug=True)

# configure the rest dispatcher to know what prefix to expect on request urls
rest.Dispatcher.base_url = "/rest"

rest.Dispatcher.model_handlers = {}

# add glyph model
rest.Dispatcher.add_models({
    'Glyph' : (Glyph, rest.READ_ONLY_MODEL_METHODS)})
