from flask import Blueprint, request, jsonify
import requests, os


yelp = Blueprint("yelp", __name__)  # initialize blueprint

API_KEY = os.getenv('API_KEY')

@yelp.route("/api/find-nearby-restaurants", methods=["POST"])
def generate_restaurants():
    """ API that gets a list of nearby restaurants based off of user's input location
    """

    # TODO: Get user's location and pass that into Yelp's API (make sure format is appropriate)

    ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
    HEADERS = {
        'Authorization': 'Bearer %s' %API_KEY
    }

    res = request.get_json()

    location = res["location"]

    PARAMETERS = {
                'term': 'restaurant',
                'location': location, #spelling mistakes are ok
                'limit': 10
                }

    response = requests.get(url = ENDPOINT, params = PARAMETERS, headers = HEADERS)

    business_data = response.json()

    restaurants = []
    for biz in business_data['businesses']:
        res_data={}
        res_data["name"] = biz["name"]
        res_data["location"] = biz['location']['display_address']
        res_data["rating"] = biz.get('rating', "No Rating")
        res_data["price"] = biz.get("price", "No Price Description")
        restaurants.append(res_data)
        
    # TODO: Potential - find ways to cleanse/parse location so Yelp can use it to find restaurants
    # TODO: Input location into Yelp's API endpoint (/businesses/search --> maybe not too sure)
    # TODO: Parse out a list of locations of restaurants (Restaurant name, location, rating, etc, whatever you think is important)
    # TODO: Return that data as a JSON when data is successfully retrieved and parsed out properly.

    # The above instructions might not be complete, but they are very high-level so please do additional research if necessary.

    return {
        "status": "Success",
        "result": restaurants
    }
    # return {"status": "success"}
