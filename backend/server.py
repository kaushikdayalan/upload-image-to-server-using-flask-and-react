import os
from flask import Flask, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

upload_folder = "C:/Users/Kaushik/dev/file-upload-using-flask/backend"

ALLOWED_EXTENSIONS = set(['txt','pdf','png','jpg','jpeg'])

app = Flask(__name__)
app.config['upload_folder'] = upload_folder

@app.route('/upload',methods=['POST'])
def uploadFile():
    target = os.path.join(upload_folder, 'images')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload function")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    response = "working successfully"
    return response

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", use_reloader=False)

CORS(app, expose_headers="Authorization")
