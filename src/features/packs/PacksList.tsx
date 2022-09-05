import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { CardPackType } from '../../api/packAPI'
import { ArrowBack } from '../../common/components/ArrowBack/ArrowBack'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useDebounce } from '../../common/hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'

import { FilterPanel } from './FilterPanel/FilterPanel'
import { AddPackModal } from './modals/AddPackModal'
import { DelPackModal } from './modals/DelPackModal'
import { EditPackModal } from './modals/EditPackModal'
import { PackListFooter } from './PackListFooter/PackListFooter'
import { PackListTable } from './PackListTable/PackListTable'
import { getCardsPackTC, PackStateType } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const [addModalActive, setAddModalActive] = useState(false)
  const [editModalActive, setEditModalActive] = useState(false)
  const [delModalActive, setDelModalActive] = useState(false)
  const [editedPack, setEditedPack] = useState({} as CardPackType)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(state => state.auth.isLoggedIn)
  const state: PackStateType = useAppSelector(state => state.packs)

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
        <div className={s.header_title}>
          <ArrowBack title={'Back to Profile'} onClick={() => navigate('/profile')} />
          <h2>Packs list</h2>
        </div>
        <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
      </div>
      <FilterPanel />
      <PackListTable
        cardPacks={state.cardPacks}
        editCallback={editCallback}
        deleteCallBack={deleteCallBack}
      />
      <PackListFooter />
      <AddPackModal active={addModalActive} setActive={setAddModalActive} />
      <EditPackModal active={editModalActive} setActive={setEditModalActive} pack={editedPack} />
      <DelPackModal active={delModalActive} setActive={setDelModalActive} pack={editedPack} />
    </div>
  )
}
