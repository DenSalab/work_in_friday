import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPackType } from '../../../api/packAPI'
import s from './PackListTable.module.css'
import { teacher } from '../../../common/swg/teacher'
import { getCardsPackTC, setSortPacks } from '../packs-reducer'
import { edit } from '../../../common/swg/edit'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { trash } from '../../../common/swg/trash'

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
  const user_id: string = useAppSelector((state) => state.profile.user._id)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // sort
  type sortType = 'name' | 'cardsCount' | 'updated' | 'user_name'

  const [sort, setSort] = useState<sortType>('updated')
  const [directionUp, setDirectionUp] = useState(0)

  const onClickSortHandler = (sortType: sortType) => {
    setSort(sortType)
    dispatch(getCardsPackTC())
  }

  const sortArrows = (sort: sortType) => {
    return (
      <span
        className={s.arrowDown}
        onClick={() => {
          setDirectionUp(!directionUp ? 1 : 0)
          dispatch(setSortPacks(directionUp + sort))
          dispatch(getCardsPackTC())
        }}
      >
        {directionUp ? '▲' : '▼'}
      </span>
    )
  }

  return (
    <div className={s.table}>
      <div className={s.tb_header}>
        <div className={s.tb_name} onClick={() => onClickSortHandler('name')}>
          <span>Name {sort === 'name' ? sortArrows('name') : ''}</span>
        </div>
        <div className={s.tb_cards} onClick={() => onClickSortHandler('cardsCount')}>
          <span>Cards {sort === 'cardsCount' ? sortArrows('cardsCount') : ''}</span>
        </div>
        <div className={s.tb_last} onClick={() => onClickSortHandler('updated')}>
          <span>Last Updated {sort === 'updated' ? sortArrows('updated') : ''}</span>
        </div>
        <div className={s.tb_createdBy} onClick={() => onClickSortHandler('user_name')}>
          <span>Created by {sort === 'user_name' ? sortArrows('user_name') : ''}</span>
        </div>
        <div className={s.tb_actions}>
          <span>Actions</span>
        </div>
      </div>

      {cardPacks.map((e) => {
        const onClickNamePack = () => {
          navigate(`/cards_list/${e._id}`)
        }
        const onClickTeacher = () => {
          navigate(`/learn/${e._id}/${e.name}`)
        }
        const onClickEdit = () => {
          editCallback(e)
        }
        const onClickDelete = () => {
          deleteCallBack(e)
        }

        return (
          <div className={`${s.tb_main} ${loading ? s.tb_disabled : ''}`} key={e._id}>
            <div className={s.tb_name} onClick={onClickNamePack} aria-disabled={true}>
              {e.name}
            </div>
            <div className={s.tb_cards}>{e.cardsCount}</div>
            <div className={s.tb_last}>{e.updated.slice(0, 10)}</div>
            <div className={s.tb_createdBy}>{e.user_name}</div>
            <div className={s.tb_actions}>
              <button className={s.teacher} disabled={loading} onClick={onClickTeacher}>
                {teacher}
              </button>
              {e.user_id === user_id && (
                <button className={s.edit} disabled={loading} onClick={onClickEdit}>
                  {edit}
                </button>
              )}
              {e.user_id === user_id && (
                <button className={s.trash} disabled={loading} onClick={onClickDelete}>
                  {trash}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
