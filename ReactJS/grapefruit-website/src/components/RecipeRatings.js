import React, { useState } from 'react';

const recipes = [
    {
        id: 1,
        name: "Healthy Salad",
        rating: 4.5,
        reviews: [
            { user: "Alice", comment: "Very fresh and tasty!", rating: 5 },
            { user: "Bob", comment: "Good but needed more dressing.", rating: 4 }
        ]
    },
    {
        id: 2,
        name: "Vegan Smoothie",
        rating: 4,
        reviews: [
            { user: "Charlie", comment: "Delicious and nutritious!", rating: 4 },
        ]
    },
    // Add more recipes here
];

const RecipeRatings = () => {
    const [currentReviews, setCurrentReviews] = useState(recipes);

    const handleReviewSubmit = (recipeId, user, comment, rating) => {
        const updatedReviews = currentReviews.map(recipe => {
            if (recipe.id === recipeId) {
                const newReview = { user, comment, rating };
                recipe.reviews.push(newReview);
                recipe.rating = (
                    recipe.reviews.reduce((acc, review) => acc + review.rating, 0) /
                    recipe.reviews.length
                ).toFixed(1);
            }
            return recipe;
        });
        setCurrentReviews(updatedReviews);
    };

    return (
        <div className="recipe-ratings">
            <h1>Rate Our Recipes</h1>
            <p>We value your feedback! Rate and review our recipes to help others choose the best ones.</p>
            {currentReviews.map(recipe => (
                <div key={recipe.id} className="recipe">
                    <h2>{recipe.name}</h2>
                    <p>Average Rating: {recipe.rating} ⭐</p>
                    <ul>
                        {recipe.reviews.map((review, index) => (
                            <li key={index}>
                                <strong>{review.user}</strong>: {review.comment} ({review.rating} ⭐)
                            </li>
                        ))}
                    </ul>
                    <ReviewForm recipeId={recipe.id} onSubmit={handleReviewSubmit} />
                </div>
            ))}
        </div>
    );
};

const ReviewForm = ({ recipeId, onSubmit }) => {
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(recipeId, user, comment, rating);
        setUser('');
        setComment('');
        setRating(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" value={user} onChange={(e) => setUser(e.target.value)} required />
            <textarea placeholder="Your Review" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                {[1, 2, 3, 4, 5].map(value => (
                    <option key={value} value={value}>{value} Star{value > 1 && 's'}</option>
                ))}
            </select>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default RecipeRatings;
