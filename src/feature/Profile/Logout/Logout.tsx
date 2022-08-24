import React from 'react'
import s from '../Profile.module.css'
import logout from '../../../main/ui/images/logout_FILL0_wght400_GRAD0_opsz48.png'
import { useDispatch } from 'react-redux'
import { logoutTC } from '../../../main/bll/login-reducer'

export const Logout = () => {
  const dispatch: any = useDispatch()
  return (
    <div className={s.button} onClick={() => dispatch(logoutTC())}>
      <img src={logout} className={s.symbols} alt="logout" />
      <span className={s.title}>Log out</span>
    </div>
  )
}
