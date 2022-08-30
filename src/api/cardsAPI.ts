import { instance } from './instance'

export const cardsAPI = {
  getCard(values: CardQueryType) {
    return instance.get<GetCardsResponseType>('cards/card', { params: values })
  },
  createCard(card: CreatedCardType) {
    return instance.post<CreateCardResponseType>('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete<DeleteCardResponseType>('cards/card', { params: id })
  },
  updateCard(card: UpdatedCardType) {
    return instance.put<UpdateCardResponseType>('cards/card', { card })
  },
}

// types
export type CardQueryType = {
  cardsPack_id: string

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
  cardsPack_id?: string
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
  card: {
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

export type UpdatedCardType = {
  card: {
    _id: string
    question?: string
    answer?: string
    comments?: string
    [key: string]: any
  }
}
