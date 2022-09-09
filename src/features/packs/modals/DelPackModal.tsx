import React from 'react'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { deleteCardsPackTC } from '../packs-reducer'
import { CardPackType } from '../../../api/packAPI'
import { useNavigate } from 'react-router-dom'

export const DelPackModal: React.FC<PropsType> = ({ active, setActive, pack }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const deleteNamePack = () => {
    dispatch(deleteCardsPackTC(pack._id))
    setActive(false)
    navigate('/packs_list')
  }

  return (
    <CustomModal
      title={'Delete pack'}
      active={active}
      setActive={setActive}
      callback={deleteNamePack}
      buttonsText={'Delete'}
    >
      <div>Do you really want to remove &ldquo;{pack.name}&rdquo;?</div>
      <div>All cards will be excluded from this course!</div>
    </CustomModal>
  )
}

// types

type PropsType = {
  active: boolean
  setActive: (value: boolean) => void
  pack: CardPackType
  callback?: () => void
}
