import React from "react";
import ProfileLayout from "../../Layout/ProfileLayout";

const myReviews = [
  {
    company: "Walsis eConnect India Private Limited",
    location: "Patna, Bihar",
    rating: 4,
    title: "Great place for learning",
    content: "The work environment is supportive, and I learned a lot during my time here.",
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
];

const renderStars = (count) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.964c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.964a1 1 0 00-.364-1.118L2.045 9.391c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.964z" />
      </svg>
    ));
};

const MyReviews = () => {
  return (
    <ProfileLayout>
      <div className="bg-cream p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold mb-6">My Reviews</h1>

        {myReviews.length === 0 ? (
          <p className="text-gray-500">You haven’t reviewed any companies yet.</p>
        ) : (
          <div className="space-y-6">
            {myReviews.map((review, index) => (
              <div
                key={index}
                className="bg-light-cream p-4 rounded shadow border space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{review.company}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>

                <h4 className="text-md font-medium text-gray-700 mt-2">{review.title}</h4>
                <p className="text-sm text-gray-600">{review.content}</p>
                <p className="text-xs text-gray-400 mt-1">Reviewed on {review.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default MyReviews;
