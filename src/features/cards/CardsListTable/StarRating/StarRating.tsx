import React from 'react'
import s from './StarRating.module.css'

export type StarRatingType = {
  grade: number
}
export const StarRating: React.FC<StarRatingType> = ({ grade }) => {
  const ceilGrade = Math.ceil(grade)

  return (
    <div className={s.star}>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <span
            key={index}
            className={
              index < ceilGrade || index === grade
                ? s.on
                : index === ceilGrade && ceilGrade !== grade
                ? s.half
                : s.off
            }
          >
            &#9733;
          </span>
        )
      })}
    </div>
  )
}
