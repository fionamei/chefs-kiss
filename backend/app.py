import logging
import json

from flask import Flask
from flask_cors import CORS
from bson.objectid import ObjectId

class JSONEncoder(json.JSONEncoder):
    """ extend json-encoder class """

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.json_encoder = JSONEncoder
    register_blueprints(app)

    return app


def register_blueprints(app):
    """ Helper function to register all the controllers/API into Flask app object
    """

    from api.controllers.sample import sample

    logging.info("Registering blueprints into app.")

    app.register_blueprint(sample)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0")
