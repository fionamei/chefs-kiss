from flask import Blueprint, request, jsonify

yelp = Blueprint("yelp", __name__)  # initialize blueprint

@yelp.route("/api/find-nearby-restaurants", methods=["POST"])
def create_new_order():
    """ API that gets a list of nearby restaurants based off of user's input location
    """
    
    # TODO: Get user's location and pass that into Yelp's API (make sure format is appropriate)
    # TODO: Potential - find ways to cleanse/parse location so Yelp can use it to find restaurants
    # TODO: Input location into Yelp's API endpoint (/businesses/search --> maybe not too sure)
    # TODO: Parse out a list of locations of restaurants (Restaurant name, location, rating, etc, whatever you think is important)
    # TODO: Return that data as a JSON when data is successfully retrieved and parsed out properly.
    
    # The above instructions might not be complete, but they are very high-level so please do additional research if necessary.
    
    return
