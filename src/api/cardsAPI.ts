import { instance } from './instance'

export const cardsAPI = {
  getCard(values: CardQueryType) {
    return instance.get<CardsResponseType>('cards/card', { params: values })
  },
  createCard(card: CardType) {
    return instance.post('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete('cards/card', { params: id })
  },
  updateCard(card: UpdateType) {
    return instance.put('cards/card', { card })
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

export type CardsResponseType = {
  cards: CardType[]
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

export type UpdateType = {
  _id: string
  comments?: string
  [key: string]: any
}
