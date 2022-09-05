import React from 'react'

import arrow from './../../images/arrow-left.svg.png'
import s from './ArrowBack.module.css'

type ArrowBackType = {
  title: string
  onClick: () => void
}
export const ArrowBack: React.FC<ArrowBackType> = ({ title, onClick }) => {
  return (
    <div className={s.return} onClick={onClick}>
      <img src={arrow} className={s.img} />
      <div>{title}</div>
    </div>
  )
}
