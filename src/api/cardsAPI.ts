import { instance } from './instance'

export const cardsAPI = {
  getCard(values: CardQueryType) {
    return instance.get<CardsDomainType>('cards/card', { params: values })
  },
  createCard(card: CreateCardType) {
    return instance.post('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete<DeletedCardResponseType>('cards/card', { params: id })
  },
  updateCard(card: UpdateCardType) {
    return instance.put<UpdatedCardResponseType>('cards/card', { card })
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

export type CardsDomainType = {
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

export type CardsStateType = {
  cards: CardType[]
}

export type CreateCardType = {
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
export type DeletedCardResponseType = {
  deletedCard: {
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
  token: string
  tokenDeathTime: number
}
export type UpdatedCardResponseType = {
  updatedCard: {
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
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
  }
  token: string
  tokenDeathTime: number
}

export type UpdateCardType = {
  card: {
    _id: string
    question?: string
    answer?: string
    comments?: string
    [key: string]: any
  }
}
