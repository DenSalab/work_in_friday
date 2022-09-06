import React, { useState, ChangeEvent } from 'react'

import pen from '../../images/pen.png'

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
    <input
      size={title.length}
      autoFocus={true}
      onBlur={onBlurInput}
      value={title}
      onChange={onChangeTitleHandler}
      className={style.input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onBlurInput()
        }
      }}
    />
  ) : (
    <span onClick={editSpanHandler} className={style.name}>
      {props.title}
      <img src={pen} className={style.symbols} alt={'pen'} />
    </span>
  )
})
