from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, reviews_schema, favorite_schema, favorites_schema

    
class UserReviewsResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review = review_schema.load(form_data)
        new_review.user_id = user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201
    
    
class UserFavoriteBookResource(Resource):
    @jwt_required()
    def get(self, favorite_id):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.get_or_404(favorite_id)
        return favorite_schema.dump(user_favorites), 200
    



class UserFavoritesResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.filter_by(user_id=user_id).all()
        return favorites_schema.dump(user_favorites), 200
    


        # # Alternate version where JWT is used, but not required
        # try:
        #     verify_jwt_in_request()
        #     user_id = get_jwt_identity()
        # # Do stuff with token
        # except:
        # # Do stuff without token
        #     return "Unauthorized", 401

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        book_id = form_data.get("book_id")
        favorite = Favorite.query.filter_by(user_id=user_id, book_id=book_id).first()
        if favorite:
            return {"message": "Book is already favorited"}, 400
        new_favorite = Favorite(user_id=user_id, book_id=book_id)
        db.session.add(new_favorite)
        db.session.commit()
        return favorite_schema.dump(new_favorite), 201
    
class GetBookInformationResource(Resource):
    @jwt_required()
    def get(self, book_id):
        user_id = get_jwt_identity()

        reviews = Review.query.filter_by(book_id=book_id).all()
        reviews_data = reviews_schema.dump(reviews)

        ratings_total = 0
        for review in reviews:
            ratings_total += review.rating

        avg_rating = ratings_total / len(reviews) if len(reviews) > 0 else 0

        favorited = Favorite.query.filter_by(user_id=user_id, book_id=book_id).first()
        is_favorited = False
        if favorited is not None:
            is_favorited = True

        response = {
 
            "reviews": reviews_data,
            "average_rating": round(avg_rating, 2),
            "is_favorited": is_favorited
        }

        return response, 200
        # # Alternate version where JWT is used, but not required
        # try:
        #     verify_jwt_in_request()
        #     user_id = get_jwt_identity()
        # # Do stuff with token
        # except:
        # # Do stuff without token
        #     return "Unauthorized", 401


class ReviewDetailResource(Resource):
    @jwt_required()
    def put(self, review_id):
        current_user_id = get_jwt_identity()
        review = Review.query.filter_by(id=review_id, user_id=current_user_id).first()
        if not review:
            return {'message': 'Review not found'}, 404

        data = request.get_json()
        review.text = data.get('text', review.text)
        review.rating = data.get('rating', review.rating)
        db.session.commit()

        return review_schema.dump(review), 200

    @jwt_required()
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {'message': 'Review not found'}, 404
        
        db.session.delete(review)
        db.session.commit()
        
        return '', 204