import React, {ChangeEvent, useState} from 'react';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import {CustomModal} from '../../../common/components/CustomModal/CustomModal';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {createCardTC, getCardsTC} from '../cards-reducer';

type PropsType = {
    packId: string
    active: boolean
    setActive: (value: boolean) => void
    callback?: () => void
}

export const AddCardModal: React.FC<PropsType> = ({packId, active, setActive}) => {

    const dispatch = useAppDispatch()
    const [newQuestion, setNewQuestion] = useState('question')
    const [answer, setAnswer] = useState('answer')

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const addNewCard = async () => {
        await dispatch(createCardTC({
                cardsPack_id: packId,
                question: newQuestion,
                answer: answer,
              }))
        await dispatch(getCardsTC(packId))
        setActive(false)
        setNewQuestion('question')
        setAnswer('answer')
    }

    return (
        <CustomModal title={'Add new card'} active={active} setActive={setActive}
                     callback={addNewCard} buttonsText={'Add'}>
            <div>Тута будем выбирать тип вопроса</div>
            <div>Question:</div>
            <SuperInputText id={'newQuestion'} value={newQuestion} onChange={onChangeQuestionHandler}/>
            <div>Answer:</div>
            <SuperInputText id={'newAnswer'} value={answer} onChange={onChangeAnswerHandler}/>

        </ CustomModal>
    )
}