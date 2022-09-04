import { CardPackType } from '../../../api/packAPI'
import s from './PackListTable.module.css'
import { teacher } from '../../../common/swg/teacher'
import { edit } from '../../../common/swg/edit'
import { trash } from '../../../common/swg/trash'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { deleteCardsPackTC, getCardsPackTC, setSortPacks } from '../packs-reducer'
import { useState } from 'react'

type PackListTableType = {
  cardPacks: CardPackType[]
}
export const PackListTable = (props: PackListTableType) => {
  const user_id: string = useAppSelector((state) => state.profile.user._id)
  const dispatch = useAppDispatch()

  // sort
  type sortType = 'name' | 'cardsCount' | 'updated' | 'user_name'

  const [sort, setSort] = useState<sortType>('updated')
  const onClickSortHandler = (sortType: sortType) => {
    setSort(sortType)
    dispatch(getCardsPackTC())
  }

  const filterArrow = (sort: sortType) => {
    const [dirUp, setDirUp] = useState(0)
    return (
      <span
        className={s.arrowDown}
        onClick={() => {
          setDirUp(dirUp === 0 ? 1 : 0)
          dispatch(setSortPacks(dirUp + sort))
          dispatch(getCardsPackTC())
        }}
      >
        {dirUp ? '▲' : '▼'}
      </span>
    )
  }

  return (
    <div className={s.table}>
      <div className={s.tb_header}>
        <div className={s.tb_name} onClick={() => onClickSortHandler('name')}>
          <span>Name {sort === 'name' ? filterArrow('name') : ''}</span>
        </div>
        <div className={s.tb_cards} onClick={() => onClickSortHandler('cardsCount')}>
          <span>Cards {sort === 'cardsCount' ? filterArrow('cardsCount') : ''}</span>
        </div>
        <div className={s.tb_last} onClick={() => onClickSortHandler('updated')}>
          <span>Last Updated {sort === 'updated' ? filterArrow('updated') : ''}</span>
        </div>
        <div className={s.tb_createdBy} onClick={() => onClickSortHandler('user_name')}>
          <span>Created by {sort === 'user_name' ? filterArrow('user_name') : ''}</span>
        </div>
        <div className={s.tb_actions}>
          <span>Actions</span>
        </div>
      </div>
      {props.cardPacks.map((e) => {
        const onClickTeacher = () => {
          alert('teacher')
        }
        const onClickEdit = () => {
          alert('edit')
        }
        const onClickDelete = () => {
          dispatch(deleteCardsPackTC(e._id))
        }

        return (
          <div className={s.tb_main} key={e._id}>
            <div className={s.tb_name}>{e.name}</div>
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
