import React, { ChangeEvent, useEffect, useState } from 'react'
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText'
import { CustomModal } from '../../../common/components/CustomModal/CustomModal'
import { useAppDispatch } from '../../../common/hooks/hooks'
import { getCardsTC, updateCardTC } from '../cards-reducer'
import { CardType } from '../../../api/cardsAPI'

type PropsType = {
  packId: string
  card: CardType
  active: boolean
  setActive: (value: boolean) => void
  callback?: () => void
}

export const EditCardModal: React.FC<PropsType> = ({ packId, card, active, setActive }) => {
  const dispatch = useAppDispatch()
  const [newQuestion, setNewQuestion] = useState('question')
  const [answer, setAnswer] = useState('answer')

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.currentTarget.value)
  }
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  const editCard = async () => {
    await dispatch(updateCardTC({ ...card, question: newQuestion, answer: answer }))
    await dispatch(getCardsTC(packId))
    setActive(false)
    setNewQuestion('question')
    setAnswer('answer')
  }

  useEffect(() => {
    setNewQuestion(card.question)
    setAnswer(card.answer)
  }, [card._id, card.question])

  return (
    <CustomModal
      title={'Edit card'}
      active={active}
      setActive={setActive}
      callback={editCard}
      buttonsText={'Save'}
    >
      <div>Тута будем выбирать тип вопроса</div>
      <div>Question:</div>
      <SuperInputText id={'newQuestion'} value={newQuestion} onChange={onChangeQuestionHandler} />
      <div>Answer:</div>
      <SuperInputText id={'newAnswer'} value={answer} onChange={onChangeAnswerHandler} />
    </CustomModal>
  )
}
