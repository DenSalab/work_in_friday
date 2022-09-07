import React, { useState } from 'react'
import s from './StarRating.module.css'

export type StarRatingType = {
  grade: number
}
export const StarRating: React.FC<StarRatingType> = ({ grade }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const cardGrade = Math.round(grade)
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={index <= cardGrade ? s.on : s.off}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}
