import React, { ChangeEvent, useState } from 'react'

import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { createCardTC, getCardsTC } from '../cards-reducer'
import { getCardsPackTC } from '../../packs/packs-reducer'

type PropsType = {
  packId: string
  active: boolean
  setActive: (value: boolean) => void
  callback?: () => void
}

export const AddCardModal: React.FC<PropsType> = ({ packId, active, setActive }) => {
  const dispatch = useAppDispatch()
  const [newQuestion, setNewQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.currentTarget.value)
  }
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  const addNewCard = () => {
    dispatch(
      createCardTC({
        cardsPack_id: packId,
        question: newQuestion,
        answer: answer,
      })
    )
    setActive(false)
    setNewQuestion('')
    setAnswer('')
  }

  return (
    <CustomModal
      title={'Add new card'}
      active={active}
      setActive={setActive}
      callback={addNewCard}
      buttonsText={'Add'}
    >
      <div>Тута будем выбирать тип вопроса</div>
      <div>Question:</div>
      <SuperInputText id={'newQuestion'} value={newQuestion} onChange={onChangeQuestionHandler} />
      <div>Answer:</div>
      <SuperInputText id={'newAnswer'} value={answer} onChange={onChangeAnswerHandler} />
    </CustomModal>
  )
}
