import s from './PacksList.module.css'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import filter_img from './swg/filter.png'
import teacher_img from './swg/teacher.png'
import edit_img from './swg/edit.png'
import delete_img from './swg/delete.png'
import SuperDoubleRange from '../../../common/components/SuperDoubleRange/SuperDoubleRange'
import { CardPackType } from '../../../api/packAPI'
import Paginator from '../../../common/components/Pagination/Paginator'

const cardPacks: CardPackType[] = [
  {
    _id: '630cdb7b1d127a000430028d',
    user_id: '63066151d1bfa03d9ca3548b',
    user_name: 'iuiu7777765444',
    private: false,
    name: 'new Pack',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-08-29T15:30:03.529Z',
    updated: '2022-08-29T15:30:03.529Z',
    more_id: '63066151d1bfa03d9ca3548b',
    __v: 0,
  },
  {
    _id: '630cd9f01d127a000430028b',
    user_id: '63066151d1bfa03d9ca3548b',
    user_name: 'iuiu7777765444',
    private: false,
    name: 'change name',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-08-29T15:23:28.362Z',
    updated: '2022-08-29T15:24:52.635Z',
    more_id: '63066151d1bfa03d9ca3548b',
    __v: 0,
    deckCover: null,
  },
  {
    _id: '630cd4d062a01103babd46af',
    user_id: '6304af4eac562c0c14798013',
    user_name: 'hihello',
    private: false,
    name: 'Pack changed!',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-08-29T15:01:36.260Z',
    updated: '2022-08-29T15:01:45.617Z',
    more_id: '6304af4eac562c0c14798013',
    __v: 0,
    deckCover: null,
  },
  {
    _id: '630cd4d262a01103babd46b0',
    user_id: '6304af4eac562c0c14798013',
    user_name: 'hihello',
    private: false,
    name: 'Pack changed!',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-08-29T15:01:38.088Z',
    updated: '2022-08-29T15:01:40.385Z',
    more_id: '6304af4eac562c0c14798013',
    __v: 0,
    deckCover: null,
  },
]

export const PacksList = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <SuperButton>Add new pack</SuperButton>
      </div>

      <div className={s.control}>
        <div className={s.search}>
          <label htmlFor="search">Search</label>
          <input id={'search'} placeholder={'Provide your text'} className={s.search} />
        </div>

        <div className={s.selectPacks}>
          <label htmlFor="my">Show packs cards</label>
          <button id={'my'} className={`${s.btn_my} ${s.btn_selected}`}>
            My
          </button>
          <button className={s.btn_all}>All</button>
        </div>

        <div className={s.switch}>
          <input className={s.switch_min} value={2} id={'switch'} />
          <SuperDoubleRange value={[12, 45]} onChangeRange={() => {}} />
          <input className={s.switch_max} value={22} />
        </div>

        <div className={s.filter_remove}>
          <img src={filter_img} alt="swg" onClick={() => alert('asd')} />
        </div>
      </div>

      <div className={s.table}>
        <div className={s.tb_header}>
          <div className={s.tb_name}>Name</div>
          <div className={s.tb_cards}>Cards</div>
          <div className={s.tb_last}>Last Updated</div>
          <div className={s.tb_createdBy}>Created by</div>
          <div className={s.tb_actions}>Actions</div>
        </div>
        <div>
          {cardPacks.map((e) => {
            return (
              <div className={s.tb_main} key={e._id}>
                <div className={s.tb_name}>{e.name}</div>
                <div className={s.tb_cards}>{e.cardsCount}</div>
                <div className={s.tb_last}>{e.updated}</div>
                <div className={s.tb_createdBy}>{e.user_name}</div>
                <div className={s.tb_actions}>
                  <img src={teacher_img} alt="teacher" onClick={() => {}} />
                  <img src={edit_img} alt="edit" onClick={() => {}} />
                  <img src={delete_img} alt="delete" onClick={() => {}} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Paginator totalUsersCount={800} currentPage={2} pageSize={25} onPageChange={() => {}} />
    </div>
  )
}
