import s from './Login.module.css'
import SuperInputText from '../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText'
import SuperCheckbox from '../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox'
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton'

export const Login = () => {
  return (
    <div className={s.container}>
      <h2>Sign in</h2>
      <div className={s.inputs}>
        <label>Email</label>
        <SuperInputText type="email" placeholder={'email'} />
        <label htmlFor={'pass'}>Password</label>
        <SuperInputText type="password" id={'pass'} placeholder={'password'} />
      </div>
      <div className={s.remember}>
        <SuperCheckbox id="remember" />
        <label htmlFor={'remember'}>Remember me</label>
      </div>
      <div className={s.forgotPass}>
        <SuperButton>Forgot password?</SuperButton>
      </div>

      <div className={s.signIn}>
        <SuperButton>Sign in</SuperButton>
      </div>
      <div className={s.signUp}>
        <span className={s.question}>Already have an account?</span>
        <SuperButton>Sign Up</SuperButton>
      </div>
    </div>
  )
}
