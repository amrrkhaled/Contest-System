import React, { useState, useEffect } from "react";

import "../style/About.css";
import first from "../first.jpg";
import second from "../second.jpg";
import third from "../third.jpg";


const images = [first, second, third];

const About = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="winners-box">
        <h3>LAST YEAR WINNERS</h3>
      </div>
     
        <div className="small-slideshow">
          <img
            src={images[current]}
            alt={`About pic ${current + 1}`}
            className="small-slide-image"
          />
        </div>
      
      <div className="winners-box">
        <h2>ABOUT US </h2>
      </div>
      <div className="about-us-box">
        <p>
          <strong>Why join AleXtreme?</strong>
        </p>
        <ul>
          <li>
            <strong>Teamwork:</strong> Form a team of up to 3 and take on fun,
            challenging problems.
          </li>
          <li>
            <strong>Learning:</strong> Strengthen your coding skills through
            real-world problem-solving.
          </li>
          <li>
            <strong>Prizes:</strong> Win awards, IEEE memberships, and bragging
            rights!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
