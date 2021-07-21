import logging
import json
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

mongo = PyMongo()

class JSONEncoder(json.JSONEncoder):
    """ extend json-encoder class 
    """

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


def create_app():
    """ Creates and initializes a Flask object to be used
    """

    app = Flask(__name__)
    configure_mongo_uri(app)
    CORS(app, supports_credentials=True)
    app.json_encoder = JSONEncoder
    register_blueprints(app)

    return app


def configure_mongo_uri(app):
    """ Helper function to configure MongoDB URI 
    """
    # Setting up configurtion based on environment
    app.config.from_pyfile('config.py')

    # Connecting Flask App with DB
    app.config["MONGO_URI"] = "mongodb+srv://"+app.config["MONGODB_USERNAME"] + \
        ":"+app.config["MONGODB_PASSWORD"]+"@"+app.config["MONGODB_HOST"]
    try:
        mongo.init_app(app)
        print("MongoDB connected.")
    except Exception as e:
        print(e)


def register_blueprints(app):
    """ Helper function to register all the controllers/API into Flask app object
    """

    from api.controllers.sample import sample
    from api.controllers.authentication import authentication
    from api.controllers.yelp import yelp
    from api.controllers.orders import orders

    logging.info("Registering blueprints into app.")

    app.register_blueprint(sample)
    app.register_blueprint(authentication)
    app.register_blueprint(yelp)
    app.register_blueprint(orders)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
