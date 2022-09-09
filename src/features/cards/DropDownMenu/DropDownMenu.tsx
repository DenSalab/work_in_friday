import React, { useState } from 'react'
import s from './DropDownMenu.module.css'
import { dropDown } from '../../../common/swg/dropDown'
import { edit } from '../../../common/swg/edit'
import { trash } from '../../../common/swg/trash'
import { teacher } from '../../../common/swg/teacher'
import { CardPackType } from '../../../api/packAPI'
import { useNavigate } from 'react-router-dom'

type DropDownMenuType = {
  editCallback: () => void
  deleteCallBack: () => void
  pack: CardPackType
}

export const DropDownMenu = (props: DropDownMenuType) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const onClickMenu = () => {
    setVisible(!visible)
  }
  const onClickTeacher = () => {
    navigate(`/learn/${props.pack._id}/${props.pack.name}`)
  }
  const onClickEdit = () => {
    props.editCallback()
  }
  const onClickDelete = () => {
    props.deleteCallBack()
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
