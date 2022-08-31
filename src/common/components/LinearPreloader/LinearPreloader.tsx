import React from 'react'
import s from './LinearPreloader.module.css'

type PreloaderType = {
  turnOn: boolean
}
export const LinearPreloader = (props: PreloaderType) => {
  return (
    <div className={s.container}>{props.turnOn ? <div className={s.loader_line}></div> : ''}</div>
  )
}
