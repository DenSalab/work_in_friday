import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import s from './SuperCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeChecked) {
      // onChangeChecked(!restProps.checked);
      onChangeChecked(e.currentTarget.checked)
    }
    if (onChange) {
      onChange(e)
    }

    // onChange && onChange(e);
    // onChangeChecked && onChangeChecked(e.currentTarget.checked);
  }

  const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

  return (
    <label style={{ opacity: '1' }}>
      <input
        type={'checkbox'}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </label> // благодаря label нажатие на спан передастся в инпут
  )
}

export default SuperCheckbox
