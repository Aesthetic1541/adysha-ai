from flask import Flask
from routes.auth import auth_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from models import db
from flask_migrate import Migrate
from datetime import timedelta
from dotenv import load_dotenv


app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
load_dotenv()

# configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=5)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = False  
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(auth_bp)



if __name__ == "__main__":
    app.run(debug=True, port=5000)
