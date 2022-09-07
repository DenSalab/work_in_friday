import React, { useEffect, useState } from 'react'

import { CardType } from '../../../api/cardsAPI'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { deleteCardTC, getCardsTC } from '../cards-reducer'

type PropsType = {
  packId: string
  card: CardType
  active: boolean
  setActive: (value: boolean) => void
  callback?: () => void
}

export const DelCardModal: React.FC<PropsType> = ({ packId, card, active, setActive }) => {
  const dispatch = useAppDispatch()

  const [newQuestion, setNewQuestion] = useState('')

  const deleteCard = async () => {
    await dispatch(deleteCardTC(card._id))
    setActive(false)
    await dispatch(getCardsTC(packId))
    setNewQuestion('')
  }

  useEffect(() => {
    setNewQuestion(card.question)
  }, [card._id, card.question])

  return (
    <CustomModal
      title={'Delete card'}
      active={active}
      setActive={setActive}
      callback={deleteCard}
      buttonsText={'Delete'}
    >
      <div>Do you really want to remove "{newQuestion}" card?</div>
    </CustomModal>
  )
}
