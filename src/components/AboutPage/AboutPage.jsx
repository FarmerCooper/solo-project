import React from "react";

function AboutPage() {
  return (
    <div className="flex-container">
      <div className="flex-child">
          <p>Technologies Used:</p>
          <ul>
            <li>PERN Stack</li>
            <li>MUI</li>
            <li>Google APIs</li>
            <ul>
              <li>Geocoding</li>
              <li>Places</li>
              <li>Photos</li>
              <li>JS Map</li>
            </ul>
          </ul>
          <p>Thanks to the Jemisin Cohort</p>
          <p>Liz Kerber</p>
          <p>Friends & Family</p>
          <p>Survivor Show</p>
      </div>
      <div>
        <img
          className="flex-child"
          src={require("../../images/linkedin.jpeg")}
        />
      </div>
    </div>
  );
}

export default AboutPage;
