import { CardPackType } from '../../../api/packAPI'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { deleteCardsPackTC } from '../packs-reducer'

import { edit } from './../../../common/swg/edit'
import { teacher } from './../../../common/swg/teacher'
import { trash } from './../../../common/swg/trash'
import s from './PackListTable.module.css'

type PackListTableType = {
  cardPacks: CardPackType[]
}
export const PackListTable = (props: PackListTableType) => {
  const user_id: string = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()

  return (
    <div className={s.table}>
      <div className={s.tb_header}>
        <div className={s.tb_name}>Name</div>
        <div className={s.tb_cards}>Cards</div>
        <div className={s.tb_last}>Last Updated</div>
        <div className={s.tb_createdBy}>Created by</div>
        <div className={s.tb_actions}>Actions</div>
      </div>

      {props.cardPacks.map(e => {
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
