import React from 'react'
import s from './CheckEmail.module.css'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import icon from './emailIcon.png'

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
