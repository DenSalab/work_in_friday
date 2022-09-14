import React, { useState } from 'react'
import s from './DropDownMenu.module.css'
import { dropDown } from '../../../common/swg/dropDown'
import { edit } from '../../../common/swg/edit'
import { trash } from '../../../common/swg/trash'
import { teacher } from '../../../common/swg/teacher'
import {CardPackType} from '../../../api/packAPI';
import {getCardsTC} from '../cards-reducer';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {useNavigate} from 'react-router-dom';

type DropDownMenuType = {
  pack: CardPackType
  editCallback: () => void
  deleteCallBack: () => void
}

export const DropDownMenu = (props: DropDownMenuType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const onClickMenu = () => {
    setVisible(!visible)
  }
  const onClickTeacher = async () => {
    if (props.pack.cardsCount === 0) alert('Нет карточек для изучения')
    else {
      await dispatch(getCardsTC(props.pack._id, props.pack.cardsCount));
      navigate(`/learn/${props.pack._id}/${props.pack.name}`)
    }
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
