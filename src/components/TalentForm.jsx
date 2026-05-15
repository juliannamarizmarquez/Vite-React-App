import "./TalentForm.css";
import React, { useState } from "react";

const TalentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    talent: ""
  });

  // Added loading state to handle the Render "wake up" time
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.talent || formData.talent === "") {
      alert("Please select a talent before submitting.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // REPLACE this URL with your actual Render Backend URL
      const response = await fetch("https://expressnodeapp-r2p81.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Success! Your talent has been recorded.");
        console.log("Saved Data: ", result.data);
        
        // Reset form
        setFormData({
          name: "",
          age: "",
          email: "",
          talent: ""
        });
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Could not connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Talent Form for PUPBC</h1>
        <p>Fill out the details below if you are interested!</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="talent">Talent</label>
            <select
              id="talent"
              name="talent"
              value={formData.talent}
              onChange={handleChange} 
              required
            >
              <option value="">Select your talent</option>
              <option value="Singing">Singing</option>
              <option value="Dancing">Dancing</option>
              <option value="Poetry">Poetry</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="Submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TalentForm;