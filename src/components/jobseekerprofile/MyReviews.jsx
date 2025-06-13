import React, { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import MyReviewSkel from "../skeleton/jobseeker/MyReviewSkel";

const MyReviews = () => {
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [myReviews, setMyReviews] = useState([
    {
      company: "Walsis eConnect India Private Limited",
      location: "Patna, Bihar",
      rating: 4,
      title: "Great place for learning",
      content:
        "The work environment is supportive, and I learned a lot during my time here.",
      date: "12 May 2024",
    },
    {
      company: "Codequery",
      location: "Kankarbagh, Patna, Bihar",
      rating: 3,
      title: "Good but needs improvement",
      content: "Team is talented but communication could be better.",
      date: "15 April 2024",
    },
  ]);

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchReviewsData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchReviewsData();
  }, []);

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < count ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.964c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.964a1 1 0 00-.364-1.118L2.045 9.391c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.964z" />
        </svg>
      ));
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <MyReviewSkel />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Reviews</h1>
          <button
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
            title="Add Review"
          >
            Add Review
          </button>
        </div>

        {myReviews.length === 0 ? (
          <p className="text-gray-600 text-sm">
            You haven’t reviewed any companies yet.
          </p>
        ) : (
          <div className="space-y-6">
            {myReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-sm border border-gray-300 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.company}
                    </h3>
                    <p className="text-sm text-gray-400">{review.location}</p>
                  </div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <h4 className="text-md font-medium text-gray-700">
                  {review.title}
                </h4>
                <p className="text-sm text-gray-600">{review.content}</p>
                <p className="text-xs text-gray-400">
                  Reviewed on {review.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default MyReviews;
