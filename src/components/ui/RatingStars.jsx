import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, totalStars = 5, className = 'text-accent-gold' }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={16}
            className={`${className} ${starValue <= rating ? 'fill-current' : 'fill-none'}`}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
