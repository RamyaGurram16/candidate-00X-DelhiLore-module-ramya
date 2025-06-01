import React from 'react';
import './StoryCard.css';

const StoryCard = ({ title, snippet, img }) => {
  return (
    <div className="card">
      <img src={img} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-snippet">{snippet}</p>
      
    </div>
  );
};

export default StoryCard;
