import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import SuperButton from '../../../common/components/SuperButton/SuperButton'
import SuperCheckbox from '../../../common/components/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import mainStyles from '../../../common/styles/Container.module.css'

import { loginTC } from './login-reducer'
import s from './Login.module.css'

export const Login = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.login)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: 'testaccbenchuk@gmail.com', //'nya-admin@nya.nya'
      password: 'password', //'1qazxcvBG'
      rememberMe: true,
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign in</h2>

        <div>
          <label htmlFor={'email'}>Email</label>

          <SuperInputText
            type="email"
            id="email"
            placeholder={'email'}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor={'password'}>Password</label>

          <SuperInputText
            type="password"
            id={'password'}
            placeholder={'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>

        <div className={s.remember}>
          <SuperCheckbox
            id="rememberMe"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
          />
          <label htmlFor={'rememberMe'}>Remember me</label>
        </div>

        <div className={mainStyles.header}>
          <Link to={'/forgot'}>Forgot password?</Link>
        </div>

        <SuperButton type={'submit'} className={mainStyles.mainButton}>
          Sign in
        </SuperButton>

        <div className={mainStyles.header}>
          <span>Don&apos;t have an account?</span>

          <Link to="/register">Sign Up</Link>
        </div>
      </form>
      {status.loading ? 'КРУТИЛКА' : status.error}
    </div>
  )
}
