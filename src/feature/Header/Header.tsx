import {Link, Route, Routes} from "react-router-dom";
import React from "react";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Profile} from "../Profile/Profile";
import {Page404} from "../Page404/Page404";
import {PasswordRecovery} from "../PasswordRecovery/PasswordRecovery";
import {SetNewPassword} from "../SetNewPassword/SetNewPassword";
import {CheckEmail} from "../CheckEmail/CheckEmail";
import s from './Header.module.css'

export const Header = () => {
  return <div>
    <div className={s.header}>
      <Link to={'/'} className={s.linkItem}>main</Link>
      <Link to={'/login'} className={s.linkItem}>login</Link>
      <Link to={'/register'} className={s.linkItem}>register</Link>
      <Link to={'/profile'} className={s.linkItem}>profile</Link>
      <Link to={'/404'} className={s.linkItem}>error404</Link>
      <Link to={'/password_recovery'} className={s.linkItem}>password_recovery</Link>
      <Link to={'/set_new_password'} className={s.linkItem}>new_password</Link>
      <Link to={'/test'} className={s.linkItem}>test</Link>
      <br/>
    </div>
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/404'} element={<Page404 />} />
      <Route path={'/password_recovery'} element={<PasswordRecovery />} />
      <Route path={'/set_new_password'} element={<SetNewPassword />} />
      <Route path={'/test'} element={<CheckEmail />} />
    </Routes>
  </div>
}