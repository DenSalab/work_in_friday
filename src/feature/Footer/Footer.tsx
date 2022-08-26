import React from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../main/bll/store'
import s from './Footer.module.css'

export const Footer = () => {

  return (
    <div className={s.footer}>
        <span>
          2022 Created by Denis Salabash, Julie Benchuk, Andrei Averkin
        </span>
    </div>
  )
}
