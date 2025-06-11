import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";


function App() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Vehicle Feedback</h1>
      <FeedbackForm />
      <hr />
      <FeedbackList />
    </div>
  );
}

export default App;
