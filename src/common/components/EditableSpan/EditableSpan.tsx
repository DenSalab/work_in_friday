import React, { useState, ChangeEvent } from 'react'

import pen from '../../images/edit_FILL0_wght400_GRAD0_opsz48.png'

import style from './EditableSpan.module.css'

type EditableSpanPropsSpan = {
  title: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}
export const EditableSpan = React.memo((props: EditableSpanPropsSpan) => {
  const [title, setTitle] = useState('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const editSpanHandler = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const onBlurInput = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode && !props.disabled ? (
    <input autoFocus={true} onBlur={onBlurInput} value={title} onChange={onChangeTitleHandler} />
  ) : (
    <span onDoubleClick={editSpanHandler} className={style.name}>
      {props.title}
      <img src={pen} className={style.symbols} alt={'pen'} />
    </span>
  )
})
