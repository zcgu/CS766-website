import os.path
import tornado.ioloop
import tornado.web
import os, sys
lib_path = os.path.abspath(os.path.join('code'))
sys.path.append(lib_path)
import uuid

from skimage import data, io, filters, transform, color
import skimage as skimage
import numpy as np
from c_seam_carving import _seam_carving, _get_eimg

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/seamcarving1d", SeamCarving1d),
        ]
        settings = dict(
            # template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
        )
        super(Application, self).__init__(handlers, **settings)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class SeamCarving1d(tornado.web.RequestHandler):

    def get(self):       
        lines = int(self.get_argument('lines'))

        img = io.imread('static/pic3.jpg')
        eimg = filters.sobel(color.rgb2gray(img))
        img = _seam_carving(img, eimg, lines)

        name = str(uuid.uuid4()) + '.jpg'
        io.imsave('static/tmp/' + name , img)
        
        self.write("tmp/" + name )

    def post(self):
        username = self.get_argument('username')
        designation = self.get_argument('designation')
        self.write("Wow " + username + " you're a " + designation)

if __name__ == "__main__":
    # app = make_app()
    app = Application()
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()
