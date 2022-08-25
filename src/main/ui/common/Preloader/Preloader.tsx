import React from 'react'
import preloader from './../../images/Eclipse-1s-200px.gif'
import s from './Preloader.module.css'

export const Preloader = () => {
  return (
    <div className={s.preloader}>
      <img src={preloader} />
    </div>
  )
}
