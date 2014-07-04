__author__ = 'bustamam'

import datetime
import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        message = "<p>The time is: %s</p>" % datetime.datetime.now()
        self.response.out.write("message")

application = webapp2.WSGIApplication([('/glyphs', MainPage)], debug=True)
