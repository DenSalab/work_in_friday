import {instance} from './instance'

export const cardsAPI = {
    getCard(values: CardQueryType) {
        return instance.get<GetCardsResponseType>('cards/card', {params: values})
    },
    createCard(card: CreatedCardType) {
        return instance.post<CreateCardResponseType>('cards/card', {card: card})
    },
    deleteCard(id: string) {
        return instance.delete<DeleteCardResponseType>(`cards/card/?id=${id}`)
    },
    updateCard(card: CardType) {
        return instance.put<UpdateCardResponseType>('cards/card', {card})
    },
    updateCardGrade( grade: number, card_id: string) {
        return instance.put<UpdateGradeResponseType>('cards/grade', { grade, card_id})
    },
}

// types
export type CardQueryType = {
    cardsPack_id: string | undefined

    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}
export type CardsStateType = CardType[]

export type GetCardsResponseType = {
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: string
    packUpdated: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type CreatedCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type CreateCardResponseType = {
    newCard: CardType
    token: string
    tokenDeathTime: number
}
export type DeleteCardResponseType = {
    deletedCard: CardType
    token: string
    tokenDeathTime: number
}
export type UpdateCardResponseType = {
    updatedCard: CardType & {
        answerImg: string
        answerVideo: string
        questionImg: string
        questionVideo: string
    }
    token: string
    tokenDeathTime: number
}

export type UpdateGradeResponseType = {
    updatedGrade: RootObjectUpdateGrade
    token: string
    tokenDeathTime: number
}
export type RootObjectUpdateGrade = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
    more_id: string
    created: string
    updated: string
    __v: number
}
