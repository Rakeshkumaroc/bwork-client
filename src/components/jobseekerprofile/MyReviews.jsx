import  { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout"; 
import MyReviewSkel from "../skeleton/jobseeker/MyReviewSkel"
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

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewIndex, setEditingReviewIndex] = useState(null); // null for add, index for edit
  const [reviewFormData, setReviewFormData] = useState({
    company: "",
    location: "",
    rating: 0,
    title: "",
    content: "",
    date: "", // Will be set automatically or pre-filled for edit
  });

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

  const handleAddReviewClick = () => {
    setShowReviewForm(true);
    setEditingReviewIndex(null); // Indicate adding a new review
    // Reset form data for new review
    setReviewFormData({
      company: "",
      location: "",
      rating: 0,
      title: "",
      content: "",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  };

  const handleEditReviewClick = (index) => {
    setShowReviewForm(true);
    setEditingReviewIndex(index); // Set index for editing
    setReviewFormData(myReviews[index]); // Load current review data into form
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setReviewFormData((prev) => ({ ...prev, rating }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingReviewIndex !== null) {
      // Update existing review
      const updatedReviews = [...myReviews];
      updatedReviews[editingReviewIndex] = reviewFormData;
      setMyReviews(updatedReviews);
    } else {
      // Add new review
      setMyReviews((prev) => [...prev, reviewFormData]);
    }
    setShowReviewForm(false);
    setEditingReviewIndex(null);
  };

  const handleCancelReviewForm = () => {
    setShowReviewForm(false);
    setEditingReviewIndex(null);
    setReviewFormData({
      company: "",
      location: "",
      rating: 0,
      title: "",
      content: "",
      date: "",
    });
  };

  if (isLoading) {
    return (
      <ProfileLayout>
     <MyReviewSkel/>
     </ProfileLayout>
    );
  }

  const renderReviewForm = () => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {editingReviewIndex !== null ? "Edit Review" : "Add New Review"}
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
        <div>
          <label htmlFor="company" className="block font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            value={reviewFormData.company}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={reviewFormData.location}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Rating</label>
          <div className="flex space-x-1 mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i < reviewFormData.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  onClick={() => handleStarClick(i + 1)}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.964c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.964a1 1 0 00-.364-1.118L2.045 9.391c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.964z" />
                </svg>
              ))}
          </div>
        </div>
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Review Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={reviewFormData.title}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium text-gray-700">Review Content</label>
          <textarea
            id="content"
            name="content"
            value={reviewFormData.content}
            onChange={handleFormChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancelReviewForm}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            Save Review
          </button>
        </div>
      </form>
    </div>
  );

  return (
   <ProfileLayout>
    <div className="bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Reviews</h1>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Review"
          onClick={handleAddReviewClick}
        >
          Add Review
        </button>
      </div>

      {showReviewForm ? (
        renderReviewForm()
      ) : myReviews.length === 0 ? (
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
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <button
                    onClick={() => handleEditReviewClick(index)}
                    className="p-1 text-gray-500 hover:text-yellow-400 transition"
                    title="Edit Review"
                  >
                    {/* SVG for edit icon (FaPen replacement) */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 fill-current">
                      <path d="M410.3 231.9L376.1 266.1 245.9 135.9 280.1 101.7C293.4 88.4 314.6 88.4 327.9 101.7L410.3 184.1C423.6 197.4 423.6 218.6 410.3 231.9zM193.3 284.1L306.9 170.5 341.1 204.7 227.5 318.3 180.7 334.3C174.5 336.5 167.6 335.7 162.9 330.9L137.1 305.1C132.3 300.3 131.5 293.4 133.7 287.1L193.3 284.1zm118.8 206.2L116 480 32 396 235.7 292.2 312.1 368.6 416 264.7 480 328.6 376.1 432.5 312.1 368.6z"/>
                    </svg>
                  </button>
                </div>
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
