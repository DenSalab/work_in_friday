import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'
import { useAppSelector } from '../../hooks/hooks'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  monochrome?: boolean
  red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  monochrome,
  red,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${red ? s.red : ''} ${monochrome ? s.cancel : ''} ${s.default} ${className}`
  const isLoggedIn = useAppSelector((state) => state.app.status)
  return (
    <button
      className={finalClassName}
      disabled={isLoggedIn === 'loading'}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton
