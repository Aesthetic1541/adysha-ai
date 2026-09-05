from models import db, User, UserProfile, Subject, Chapter, ChapterProgress, ChapterProgressLog
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

onboard_bp = Blueprint("onboarding", __name__, url_prefix="/api/onboarding")


@onboard_bp.route("/progress", methods=["GET", "POST"])
@jwt_required()
def progress():
    user_id = get_jwt_identity()

    if request.method == "GET":
        # check if any progress exist for that user
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return "User does not exist."
        
        # if chapter progress exist
        if user.profile.onboarding:
            print("exist")
        
        subjects = Subject.query.all()
        result = []
        for subject in subjects:
            results = (
                db.session.query(
                    ChapterProgress.id,
                    Chapter.title,
                    Chapter.sequence_order,
                    ChapterProgress.progress
                )
                .join(Chapter)
                .join(User)
                .filter(
                    User.id == user.id,
                    Chapter.subject_id == subject.id
                )
                .all()
            )
            json_data = [
                {
                    "id": row.id,
                    "title": row.title,
                    "order": row.sequence_order,
                    "progress": row.progress
                }
                for row in results
            ]

            result.append({
                "id": subject.id, "name": subject.name, "chapters": json_data
            })
        return jsonify(result), 200
    
    elif request.method == "POST":
        data = request.get_json() or {}

        if not data or "subjects" not in data:
            return jsonify({"message": "Missing parameters."}), 400
        
        subjects = data.get("subjects", [])

        try:
            for subject in subjects:
                chapters = subject.get("chapters", [])

                for chapter in chapters:
                    chapter_id = chapter.get("id")
                    chapter_progress = chapter.get("progress")

                    if chapter_id is not None and progress is not None:
                        db.session.execute(
                            db.update(ChapterProgress)
                            .where(ChapterProgress.id == chapter_id)
                            .values(progress=chapter_progress))

                db.session.commit()

            return jsonify({"message": "Progress updated successfully."})
        except Exception as e:
            return jsonify({"error": e}), 400


@onboard_bp.route("/exams", methods=["GET", "POST"])
@jwt_required()
def exams():
    if request.method == "GET":
        return jsonify([{
                "id": "mains", 
                "name": "Jee Mains"
                }, {
                "id": "advanced",
                "name": "Jee Advanced"
            }]
        ), 200

    else:
        data = request.get_json() or {}
        user_id = get_jwt_identity()

        if not data.get("exam"):
            return jsonify({"error": "Select valid exam."}), 404

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # add exam to user's profile
        try:
            user.profile.exam = data.get("exam")
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Database error", "details": str(e)}), 500

        # create chapter progress for user (if does not exist)
        if user.progress_records:
            print("Record already exist")
            return jsonify({"message": "Exam added successfully"}), 200

        print("Chapter add start.")
        try:
            print("Adding chapters. ")
            chapters = db.session.execute(db.select(Chapter)).scalars().all()
            print(user.id)
            for chapter in chapters:
                q = ChapterProgress(user_id=user.id, chapter_id=chapter.id)
                db.session.add(q)
                db.session.flush()
                print("Progress Added.")
                print("Adding log")
                l = ChapterProgressLog(user_id=q.user_id, chapter_id=q.chapter_id, progress=q.progress, event_type="progress_add")
                db.session.add(l)
                db.session.flush()
                db.session.commit()
            print("Chapters added.")
            return jsonify({"message": "Exam added successfully"}), 200
        except Exception as e:
            print("Error adding chapters: ", e)
            db.session.rollback()
            return jsonify({"error": "Database error", "details": str(e)}), 500


def ex_command():
    print("===================== RESPONSE ============================================================================")
    subjects = Subject.query.all()
    result = []
    for subject in subjects:
        results = (
            db.session.query(
                ChapterProgress.id,
                Chapter.title,
                Chapter.sequence_order,
                ChapterProgress.progress
            )
            .join(Chapter)
            .join(User)
            .filter(
                User.id == 11,
                Chapter.subject_id.in_(
                    db.session.query(Subject.id).filter(Subject.slug == subject.slug)
                )
            )
            .all()
        )
        json_data = [
            {
                "id": row.id,
                "title": row.title,
                "order": row.sequence_order,
                "progress": row.progress
            }
            for row in results
        ]

        result.append({
            "id": subject.id, "name": subject.name, "chapters": json_data
        })

    print("===========================================================================================================")