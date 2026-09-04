from models import db, User
from flask_jwt_extended import (
    create_access_token, 
    create_refresh_token, 
    get_jwt_identity,
    jwt_required, 
    set_access_cookies, 
    set_refresh_cookies,
    unset_jwt_cookies
)
from flask import Blueprint, jsonify, request

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# registration route
@auth_bp.route("/register", methods=["POST"])
def register():
    # get the input json data
    data = request.get_json() 

    # if the json is not of specified format, return error code 400
    # {"name": "John Doe", "email": "abc@xy.z", "password": "123", "confirmation": "123"}
    if not data or not data.get("name") or not data.get("email") or not data.get("password") or not data.get("confirmation"):
        return jsonify({"error": "Missing required fields"}), 400 
    
    # check if password is same as confirmation password
    if data.get("password") != data.get("confirmation"):
        return jsonify({"error": "Confirm password is not same as password."}), 400
    
    # if email already exists
    if User.query.filter_by(email = data.get("email")).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # register the user
    user = User(name = data.get("name"), email = data.get("email"))
    user.set_password(data.get("password"))

    db.session.add(user)
    db.session.commit()

    # on successfull registration, login the user
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))

    # create response
    response = jsonify({
        "message": "Registration and login successful.",
        "user": user.to_dict()
    })

    # attach httpOnly cookies
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response, 201


# login route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    # if data is not of format
    #{"email": abc.xy@z, "password": 123}
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Username and password required"}), 400
    
    # get user data with provided email
    user = User.query.filter_by(email=data.get("email")).first()

    # if email or password is incorrect
    if not user or not user.check_password(data.get("password")):
        return jsonify({"error": "Invalid login credentials"}), 400
    
    # on successfull verification, create the jwt
    # short lived access token
    access_token = create_access_token(identity=str(user.id))
    # long-lived refresh token
    refresh_token = create_refresh_token(identity=str(user.id))

    # create response
    response = jsonify({"user": user.to_dict()})

    # attach httpOnly cookies
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    
    return response, 200


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successfull"})

    # removes both the cookies from browser
    unset_jwt_cookies(response)

    return response, 200


# verification route
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def check_me():
    # access user id of current user
    current_user_id = get_jwt_identity()

    # get the user with that user id
    user = db.session.get(User, current_user_id)

    # if no user with that user id
    if not user:
        return jsonify({"error": "User not found"}), 400

    return jsonify(user.to_dict()), 200


# access token regeneration route
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    # gets user id from refresh token
    current_user_id = get_jwt_identity()

    print(current_user_id, type(current_user_id))
    
    # creates a new access token from that user id
    new_access_token = create_access_token(identity=current_user_id)

    # create response and attach httpOnly cookie
    response = jsonify({"message": "Token generate successfull"})
    set_access_cookies(response, new_access_token)

    return response, 200
    


'''
TODO:
(Self): Use correct status code
(Aditya): Replace Error response after consulting
(Aditya): Verify the return response on successfull registration
(Aditya): Verify url for each route
(Aditya): Verify refresh method of jwt; frontend checks remaining time and refresh,
frontend check reponse and refresh (current),
backend checks remaining time in each request and refresh accordingly

'''

# axios must include credentials so that browser can send cookies across different ports