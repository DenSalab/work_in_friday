import React from 'react'
import s from './CheckEmail.module.css'
import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import icon from './emailIcon.png'
import { useFormik } from 'formik'
import { registerTC } from '../../n1-main/m2-bll/auth-reducer'
import { useAppDispatch } from '../../n1-main/m1-ui/hooks/hooks'

export const CheckEmail = () => {
  // const dispatch = useAppDispatch();

  return (
    <div className={s.checkEmail}>
      <div className={s.form}>
        <div className={s.formName}>Check Email</div>
        <div className={s.icon}>
          <img src={icon} alt="icon" />
        </div>
        <div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
        <div className={s.buttonWrapper}>
          <SuperButton width100pr={true} type={'submit'}>
            Back to login
          </SuperButton>
        </div>
      </div>
    </div>
  )
}
