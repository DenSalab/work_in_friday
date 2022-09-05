import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { CardPackType } from '../../../api/packAPI'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { edit } from '../../../common/swg/edit'
import { teacher } from '../../../common/swg/teacher'
import { trash } from '../../../common/swg/trash'

import s from './PackListTable.module.css'

type PackListTableType = {
  cardPacks: CardPackType[]
  editCallback: (pack: CardPackType) => void
  deleteCallBack: (pack: CardPackType) => void
}
export const PackListTable: React.FC<PackListTableType> = ({
  cardPacks,
  editCallback,
  deleteCallBack,
}) => {
  const user_id: string = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className={s.table}>
      <div className={s.tb_header}>
        <div className={s.tb_name}>Name</div>
        <div className={s.tb_cards}>Cards</div>
        <div className={s.tb_last}>Last Updated</div>
        <div className={s.tb_createdBy}>Created by</div>
        <div className={s.tb_actions}>Actions</div>
      </div>

      {cardPacks.map(e => {
        const onClickNamePack = () => {
          if (e.user_id === user_id) navigate(`/cards_list/${e._id}`)
        }
        const onClickTeacher = () => {
          alert('teacher')
        }
        const onClickEdit = () => {
          editCallback(e)
        }
        const onClickDelete = () => {
          deleteCallBack(e)
        }

        return (
          <div className={s.tb_main} key={e._id}>
            <div className={s.tb_name} onClick={onClickNamePack}>
              {e.name}
            </div>
            <div className={s.tb_cards}>{e.cardsCount}</div>
            <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>
            <div className={s.tb_createdBy}>{e.user_name}</div>
            <div className={s.tb_actions}>
              <div className={s.swg} onClick={onClickTeacher}>
                <div className={s.teacher}>{teacher}</div>
              </div>
              <div className={s.swg} onClick={onClickEdit}>
                {e.user_id === user_id ? <div className={s.edit}>{edit}</div> : ''}
              </div>
              <div className={s.swg} onClick={onClickDelete}>
                {e.user_id === user_id ? <div className={s.trash}>{trash}</div> : ''}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
