import { useEffect, useState } from 'react'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { AddPackModal } from './modals/AddPackModal'
import { DelPackModal } from './modals/DelPackModal'
import { EditPackModal } from './modals/EditPackModal'
import s from './PacksList.module.css'
import { getCardsPackTC, setPage } from './packs-reducer'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import { useDebounce } from '../../common/hooks/debounce'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { CardPackType } from '../../api/packAPI'
import { PackListFooter } from './PackListFooter/PackListFooter'
import { PackListTable } from './PackListTable/PackListTable'

export const PacksList = () => {
  const [addModalActive, setAddModalActive] = useState(false)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)

  // временная заглушка. Если передать пустой объект, инпут перестает быть контролируемым
  const temp = {
    _id: 'string',
    user_id: 'string',
    user_name: 'string',
    private: false,
    name: 'string',
    path: 'string',
    grade: 1,
    shots: 1,
    cardsCount: 1,
    type: 'string',
    rating: 1,
    created: 'string',
    updated: 'string',
    more_id: 'string',
    __v: 1,
    deckCover: 'string',
  }
  const [editedPack, setEditedPack] = useState(temp as CardPackType)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const searchedPackName = useAppSelector((state) => state.packs.searchedPackName)
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)

  const isEmptyState = cardPacksTotalCount === 0

  const addNewPackHandler = () => {
    setAddModalActive(true)
  }

  const editCallback = (pack: CardPackType) => {
    setEditedPack(pack)
    setEditModalActive(true)
  }

  const deleteCallBack = (pack: CardPackType) => {
    setEditedPack(pack)
    setDelModalActive(true)
  }

  useDebounce(searchedPackName, 500)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsPackTC())
    }
    return () => {
      dispatch(setPage(1))
    }
  }, [searchedPackName])

  if (!isLoggedIn) {
    navigate('/login')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.header_title}>
          <ArrowBack title={'Back to Profile'} onClick={() => navigate('/profile')} />
          <h2>Packs list</h2>
        </div>
        <SuperButton onClick={addNewPackHandler}>Add new pack</SuperButton>
      </div>

      <FilterPanel />

      {!isEmptyState && (
        <PackListTable editCallback={editCallback} deleteCallBack={deleteCallBack} />
      )}
      {!isEmptyState && <PackListFooter />}

      {isEmptyState && 'Packs not found...'}

      <AddPackModal active={addModalActive} setActive={setAddModalActive} />
      <EditPackModal active={editModalActive} setActive={setEditModalActive} pack={editedPack} />
      <DelPackModal active={delModalActive} setActive={setDelModalActive} pack={editedPack} />
    </div>
  )
}
