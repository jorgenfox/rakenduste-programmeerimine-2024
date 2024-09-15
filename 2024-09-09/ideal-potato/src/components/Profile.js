import React from "react"
import "../styles/Profile.css"

const Profile = ({ name }) => {
  const hobbies = ["Fotograafia", "Videomängud"]

  return (
    <div className="profile-container">
      <h1>Tere, minu nimi on {name}</h1>
      <h2>Minu hobid:</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <form className="contact-form">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
        />

        <label htmlFor="message">Sõnum:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="20"
          required
        ></textarea>

        <button type="submit">Saada sõnum</button>
      </form>
    </div>
  )
}

export default Profile
