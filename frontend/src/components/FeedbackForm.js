import React, { useEffect, useState } from "react";
import { getAllMakes, getModelsForMake } from "../api/nhtsa";
import axios from "axios";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const fetchMakes = async () => {
      const data = await getAllMakes();
      setMakes(data);
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    if (!form.make) return;
    const fetchModels = async () => {
      const data = await getModelsForMake(form.make);
      setModels(data);
    };
    fetchModels();
  }, [form.make]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      alert("feedback submitted"); // temp alert
      setForm({ make: "", model: "", rating: 5, comment: "" });
      setModels([]);
    } catch (err) {
      alert("error submitting feedback");
    }
  };
  return (
    <div className="feedback-form">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Make:
          <select
            name="make"
            value={form.make}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Make --</option>
            {makes.map((make) => (
              <option key={make.Make_ID} value={make.Make_Name.toLowerCase()}>
                {make.Make_Name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Model:
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Model --</option>
            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_Name}>
                {model.Model_Name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          >
            {Array.from({ length: 35 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Rating:
          <input
            type="range"
            min="1"
            max="5"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
          <strong>{form.rating}/5</strong>
        </label>

        <label>
          Comment:
          <textarea
            name="comment"
            placeholder="Share your thoughts..."
            value={form.comment}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>
        {form.make && form.model && form.year && (
          <div style={{ marginTop: "1rem" }}>
            <h3>View Car Image</h3>
            <a
              href={`https://www.google.com/search?tbm=isch&q=${form.year}+${form.make}+${form.model}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Click here to view {form.year} {form.make} {form.model} on Google
              Images
            </a>
          </div>
        )}

        <button type="submit" style={{ padding: "0.5rem", fontWeight: "bold" }}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
