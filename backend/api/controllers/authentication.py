from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from app import mongo

authentication = Blueprint("authentication", __name__)  # initialize blueprint


# function that is called when you visit /
@authentication.route("/api/create-user", methods=['POST'])
def create_new_user():
    """ API that creates a new user
    """

    content = request.get_json()

    mongo.db.authentication.insert_one(content)

    response_object = {
        "status": True,
        "message": "Success!"
    }

    return jsonify(response_object)
