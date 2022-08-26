import s from './Login.module.css'
import mainStyles from '../main-styles/Container.module.css'
import SuperInputText from '../../main/ui/common/SuperInputText/SuperInputText'
import SuperCheckbox from '../../main/ui/common/SuperCheckbox/SuperCheckbox'
import SuperButton from '../../main/ui/common/SuperButton/SuperButton'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginTC } from '../../main/bll/login-reducer'
import { useAppDispatch } from '../../main/ui/hooks/hooks'

export const Login = () => {
  const dispatch = useAppDispatch()
  // const status = useSelector<AppRootStateType, LoginStatusType>((state) => state.login)

  const formik = useFormik({
    initialValues: {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
  })
  return (
    <div className={mainStyles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign In</h2>

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

        <div className={s.remember}>
          <SuperCheckbox
            id="rememberMe"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
          />
          <label htmlFor={'rememberMe'}>Remember me</label>
        </div>

        <Link className={s.forgotPass} to={'/forgot'}>
          Forgot password?
        </Link>

        <SuperButton className={mainStyles.mainButton} type={'submit'}>
          Sign in
        </SuperButton>

        <div className={mainStyles.header}>
          <span>Don&apos;t have an account?</span>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
