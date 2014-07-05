__author__ = 'bustamam'

import rest
from google.appengine.ext import webapp2
from google.appengine.ext import db

class Glyph(db.Model):
    glyphId = db.IntegerProperty(indexed=True)
    pageNumber = db.IntegerProperty()
    lineNumber = db.IntegerProperty()
    suraNumber = db.IntegerProperty()
    ayahNumber = db.IntegerProperty()
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
