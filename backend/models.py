from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=True, default=db.func.now())

    profile = db.relationship("UserProfile", backref="user", uselist=False, cascade="all, delete-orphan")
    progress_records = db.relationship("ChapterProgress", backref="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        user = {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at
        }

        if self.profile:
            user["exam"] = self.profile.exam
            user["avatar_url"] = self.profile.avatar_url
            user["streak"] = self.profile.streak
            user["onboarding"] = self.profile.onboarding
        else:
            user["exam"] = None
            user["avatar_url"] = None
            user["streak"] = None
            user["onboarding"] = None
        
        return user
    
class UserProfile(db.Model):
    __tablename__ = "user_profiles"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    exam = db.Column(db.String(20), nullable= True)
    avatar_url = db.Column(db.String(200), nullable=True)
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())
    streak = db.Column(db.Integer, default=0)
    onboarding = db.Column(db.Boolean, default=False) #false means onboarding is incomplete

class Subject(db.Model):
    __tablename__ = "subjects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)

    chapters = db.relationship("Chapter", backref="subject", cascade="all, delete-orphan")

class Chapter(db.Model):
    __tablename__ = "chapters"

    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"))
    title = db.Column(db.String(200))
    sequence_order = db.Column(db.Integer)

    progress_records = db.relationship("ChapterProgress", backref="chapter", cascade="all, delete-orphan")

class ChapterProgress(db.Model):
    __tablename__ = "chapter_progress"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey("chapters.id"), nullable=False)
    progress = db.Column(db.Integer, default=0, nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now(), nullable=False)

class ChapterProgressLog(db.Model):
    __tablename__ = "chapter_progress_log"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey("chapters.id"), nullable=False)
    progress = db.Column(db.Integer, nullable=False)
    event_type = db.Column(db.String(50), default="progress_update", nullable=False)
    created_at = db.Column(db.DateTime,default=lambda: datetime.now(timezone.utc), nullable=False)

    user = db.relationship("User", backref=db.backref("progress_logs", lazy="dynamic"))
    chapter = db.relationship("Chapter", backref="progress_logs")
