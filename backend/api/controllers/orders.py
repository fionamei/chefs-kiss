from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from app import mongo
import time
from bson.objectid import ObjectId

orders = Blueprint("orders", __name__)  # initialize blueprint

orders_db = mongo.db.orders

@orders.route("/api/create-order", methods=["POST"])
def create_new_order():
    """ API that creates a new order in which user
    """
    # Example of user input (this can be changed)
    """
    {
        "order_id": automatically generated,
        "name": this could be a name which the user decides,
        "timeCreated": automatically generated - indicates when the order was created and saved into the DB,
        "restaurant": name of the restaurant,
        "itemsOrdered": could be a list of items [item1, item2, etc],
    }
    """
    
    # TODO: Receive user inputted order as a JSON and save it in the database.
    order = request.get_json()
    order['time'] = time.ctime(time.time())
    orders_db.insert_one(order)
    response_object = {
        "status": True,
        "message": "Success!"
    }
    return jsonify(response_object)
   

@orders.route("/api/update-order/<order_id>", methods=["PATCH"])
def update_order(order_id):
    """ API that updates an existing order with new data
    """
    # Would recommend reading this: https://stackoverflow.com/questions/28229668/python-flask-how-to-get-route-id-from-url
    
    # TODO: Take in order_id and update the keys of the dictionary with new user inputted data and then saved it in DB.
    order = request.get_json()
    updated = orders_db.update_one(
        {"_id": ObjectId(order_id)}, 
        {"$set": order}
        )
    response_object = {
        "status": True,
        "message": "Success!"
    }
    return jsonify(response_object)

@orders.route("/api/delete-order/<order_id>", methods=["DELETE"])
def delete_order(order_id):
    """ API that deletes an existing order
    """
    
    # Would recommend reading this: https://stackoverflow.com/questions/28229668/python-flask-how-to-get-route-id-from-url
    
    # TODO: Takes in order_id as an input and deletes the corresponding order with that order_id off the DB.
    
    # TODO: You might want to check if the id even exists in the DB --> in this case, return an error back to the user.
    order = orders_db.find_one({"_id": ObjectId(order_id)})
    if not order:
        response_object = {
            "status": False,
            "message": "Fail!"
        }
        return jsonify(response_object)
    orders_db.delete_one({"_id": ObjectId(order_id)})
    response_object = {
        "status": True,
        "message": "Success!"
    }
    return jsonify(response_object)

@orders.route("/api/get-all-orders", methods=["GET"])
def get_all_orders():
    """ API that creates a new order in which user
    """
    
    # TODO: Gets every single order in the database and return as a JSON for display purposes
    all_orders = []
    for order in orders_db.find():
        all_orders += [order]
    response_object = {
        "status": True,
        "message": "Success!",
        "result": all_orders
    }
    return jsonify(response_object)


@orders.route("/api/get-all-orders/<order_id>", methods=["GET"])
def get_specific_order(order_id):
    """ API that creates a new order in which user
    """
    # Would recommend reading this: https://stackoverflow.com/questions/28229668/python-flask-how-to-get-route-id-from-url
    # TODO: Gets a specific order based off given order_id
    order = orders_db.find_one({"_id": ObjectId(order_id)})
    if not order:
        response_object = {
            "status": False,
            "message": "Fail!"
        }
        return jsonify(response_object)
    response_object = {
        "status": True,
        "message": "Success!"
    }
    return jsonify(response_object)