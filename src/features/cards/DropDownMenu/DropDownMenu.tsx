import React, { useState } from 'react'
import s from './DropDownMenu.module.css'
import { dropDown } from '../../../common/assets/images/svg/dropDown'
import { edit } from '../../../common/assets/images/svg/edit'
import { trash } from '../../../common/assets/images/svg/trash'
import { teacher } from '../../../common/assets/images/svg/teacher'
import { CardPackType } from '../../../api/packAPI'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../common/hooks/hooks'

type DropDownMenuType = {
  editCallback: () => void
  deleteCallBack: () => void
  pack: CardPackType
  isPackEmpty: boolean
}

export const DropDownMenu = (props: DropDownMenuType) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const user_id = useAppSelector((state) => state.profile.user._id)
  const isMyPack = user_id === props.pack.user_id

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
          <div
            className={isMyPack ? s.edit : s.edit_disabled}
            onClick={isMyPack ? onClickEdit : () => {}}
          >
            {edit}
            <span> Edit</span>
          </div>
          <div
            className={isMyPack ? s.delete : s.delete_disabled}
            onClick={isMyPack ? onClickDelete : () => {}}
          >
            {trash}
            <span> Delete</span>
          </div>
          <div
            className={!props.isPackEmpty ? s.teacher : s.teacher_disabled}
            onClick={!props.isPackEmpty ? onClickTeacher : () => {}}
          >
            {teacher}
            <span> Learn</span>
          </div>
        </div>
      )}
    </div>
  )
}
