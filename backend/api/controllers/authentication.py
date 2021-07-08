from flask import Blueprint

authentication = Blueprint("authentication", __name__)  # initialize blueprint


# function that is called when you visit /
@authentication.route("/api/create-user", methods=['POST'])
def create_new_user():
    """ API that creates a new user
    """
    # TODO: Find a way to receive user data as JSON and store it in a variable
    # https://stackoverflow.com/questions/20001229/how-to-get-posted-json-in-flask


    # TODO: Save the data into the authentication database
    # Documentation: https://flask-pymongo.readthedocs.io/en/latest/
    # https://stackabuse.com/integrating-mongodb-with-flask-using-flask-pymongo

    # TODO: Return a message indicating success
    # https://github.com/lumi-io/whyphi-flask/blob/master/api/controllers/admin_postings.py