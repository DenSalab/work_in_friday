import { useEffect, useState } from 'react'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { AddPackModal } from './modals/AddPackModal'
import { DelPackModal } from './modals/DelPackModal'
import { EditPackModal } from './modals/EditPackModal'
import s from './PacksList.module.css'
import { setSearchedPackName } from './packs-reducer'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { CardPackType } from '../../api/packAPI'
import { PackListFooter } from './PackListFooter/PackListFooter'
import { PackListTable } from './PackListTable/PackListTable'

export const PacksList = () => {
  const [addModalActive, setAddModalActive] = useState(false)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [editedPack, setEditedPack] = useState({} as CardPackType)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
  const loading = useAppSelector((state) => state.app.status) === 'loading'

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

  useEffect(() => {
    return () => {
      dispatch(setSearchedPackName(''))
    }
  }, [])

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
        <SuperButton onClick={addNewPackHandler} disabled={loading}>
          Add new pack
        </SuperButton>
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
