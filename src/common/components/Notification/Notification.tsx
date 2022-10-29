import React, { useState } from 'react'

import { useAppSelector } from '../../hooks/hooks'

import errorImg from '../../assets/images/error_notification.png'
import s from './Notification.module.css'

const Notification = () => {
  const error = useAppSelector((state) => state.app.error)
  const [on, setOn] = useState(true)

  setTimeout(() => {
    setOn(false)
  }, 3000)

  return (
    <div className={s.error}>
      {on && (
        <div className={s.error_body}>
          <img src={errorImg} className={s.error_img} alt={'errorImg'} />
          <div className={s.error_content}>
            ERROR!
            <span className={s.error_message}>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification
