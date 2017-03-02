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
            (r"/uploadimg", UploadImg),
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
        self.write("Hello World")

    def post(self):
        lines = int(self.get_argument('lines'))
        pic = self.get_argument('pic')

        img = io.imread('static/' + pic)
        eimg = filters.sobel(color.rgb2gray(img))
        img = _seam_carving(img, eimg, lines)

        name = str(uuid.uuid4()) + '.jpg'
        io.imsave('static/tmp/' + name , img)
        
        self.write("tmp/" + name )

class UploadImg(tornado.web.RequestHandler):

    def get(self):       
        self.write("Hello World")

    def post(self):
        file1 = self.request.files['pic'][0]
        original_fname = file1['filename']
        extension = os.path.splitext(original_fname)[1]
        fname = str(uuid.uuid4())
        final_filename= fname+extension
        output_file = open("static/uploads/" + final_filename, 'w')
        output_file.write(file1['body'])
        output_file.close()

        self.write("uploads/" + final_filename )

if __name__ == "__main__":
    # app = make_app()
    app = Application()
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()
