import React, { useState } from 'react'
import s from './DropDownMenu.module.css'
import { dropDown } from '../../../common/swg/dropDown'
import { edit } from '../../../common/swg/edit'
import { trash } from '../../../common/swg/trash'
import { teacher } from '../../../common/swg/teacher'

export const DropDownMenu = () => {
  const [visible, setVisible] = useState(false)

  const onClickMenu = () => {
    setVisible(!visible)
  }
  const onClickTeacher = () => {
    alert('Learn')
  }
  const onClickEdit = () => {
    alert('Edit')
  }
  const onClickDelete = () => {
    alert('Delete')
  }
  const onMouseLeaveHandler = () => {
    setTimeout(() => setVisible(false), 300)
  }
  return (
    <div className={s.dd_container}>
      <div className={s.dd_menu} onClick={onClickMenu}>
        {dropDown}
      </div>

      {visible && (
        <div className={s.dropDown} onMouseLeave={onMouseLeaveHandler}>
          <div className={s.edit} onClick={onClickEdit}>
            {edit}
            <span> Edit</span>
          </div>
          <div className={s.delete} onClick={onClickDelete}>
            {trash}
            <span> Delete</span>
          </div>
          <div className={s.teacher} onClick={onClickTeacher}>
            {teacher}
            <span> Learn</span>
          </div>
        </div>
      )}
    </div>
  )
}
