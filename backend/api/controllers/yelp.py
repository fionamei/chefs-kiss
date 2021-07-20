from flask import Blueprint, request, jsonify
import requests, os


yelp = Blueprint("yelp", __name__)  # initialize blueprint

API_KEY = os.getenv('API_KEY')

@yelp.route("/api/find-nearby-restaurants", methods=["POST"])
def create_new_order():
    """ API that gets a list of nearby restaurants based off of user's input location
    """

    # TODO: Get user's location and pass that into Yelp's API (make sure format is appropriate)

    ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
    HEADERS = {
        'Authorization': 'bearer %s' %API_KEY
    }
    PARAMETERS = {
                'term': 'restaurant',
                'location': "700comonweth ave", #spelling mistakes are ok
                'limit': 10
                }

    response = requests.get(url = ENDPOINT, params = PARAMETERS, headers = HEADERS)

    business_data = response.json()

    res_data = {}
    for biz in business_data['businesses']:
        res_data[biz['name']] = biz['location']['display_address']
        res_data[biz['name']] += ["Rating: " + str(biz.get('rating', "No Rating"))]
        res_data[biz['name']] += ["Price: " + biz.get("price", "No Price Description")]
        
    # TODO: Potential - find ways to cleanse/parse location so Yelp can use it to find restaurants
    # TODO: Input location into Yelp's API endpoint (/businesses/search --> maybe not too sure)
    # TODO: Parse out a list of locations of restaurants (Restaurant name, location, rating, etc, whatever you think is important)
    # TODO: Return that data as a JSON when data is successfully retrieved and parsed out properly.

    # The above instructions might not be complete, but they are very high-level so please do additional research if necessary.

    return res_data
    # return {"status": "success"}
