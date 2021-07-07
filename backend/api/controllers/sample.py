from flask import Blueprint

sample = Blueprint("sample", __name__)  # initialize blueprint


# function that is called when you visit /
@sample.route("/")
def index():
    return "Hit"


@sample.route("/api/health-check")
def health_check():
    return "Success."