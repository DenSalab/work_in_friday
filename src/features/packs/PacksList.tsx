import s from './PacksList.module.css'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { getCardsPackTC, PackStateType } from '../packs-reducer'
import {useEffect, useState} from 'react'
import { useDebounce } from '../../../common/hooks/debounce'
import { PackListTable } from './PackListTable/PackListTable'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { PackListFooter } from './PackListFooter/PackListFooter'
import {AddPackModal} from '../modals/AddPackModal';
import {EditPackModal} from '../modals/EditPackModal';
import {CardPackType} from '../../../api/packAPI';
import {DelPackModal} from '../modals/DelPackModal';

export const PacksList = () => {

  const [addModalActive, setAddModalActive] = useState(false)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [editedPack, setEditedPack] = useState({} as CardPackType)


  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn)
  const state: PackStateType = useAppSelector((state) => state.packs)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCardsPackTC())
    }
  }, [])

  const debouncedSearchTerm = useDebounce(state.searchedPackName, 500)
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getCardsPackTC())
    }
  }, [debouncedSearchTerm])

  const addNewPack = () => {
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

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
      </div>
      <FilterPanel />
      <PackListTable cardPacks={state.cardPacks} editCallback={editCallback} deleteCallBack={deleteCallBack}/>
      <PackListFooter />
        <AddPackModal active={addModalActive} setActive={setAddModalActive} />
        <EditPackModal active={editModalActive} setActive={setEditModalActive} pack={editedPack}/>
        <DelPackModal active={delModalActive} setActive={setDelModalActive} pack={editedPack}/>
    </div>
  )
}
