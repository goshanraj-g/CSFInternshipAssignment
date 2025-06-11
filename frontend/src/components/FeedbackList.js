import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackList.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // NOTE: use http, not https
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h2>All Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div className="feedback-card" key={fb._id}>
            <h3 className="feedback-title">
              {fb.year || "Year"} {fb.make?.toUpperCase()} {fb.model}
            </h3>

            <div className="feedback-rating">
              <strong>Rating:</strong> {"★".repeat(fb.rating)}
              {"☆".repeat(5 - fb.rating)} ({fb.rating}/5)
            </div>

            <p className="feedback-comment">{fb.comment}</p>

            <div className="feedback-date">
              Submitted on {new Date(fb.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
