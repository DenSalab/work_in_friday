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
  card: CardType[]
}

export type CardType = {
  cardsPack_id: string
  question?: string //"no question" если не отправить будет таким
  answer?: string //"no answer" // если не отправить будет таким
  grade?: number // 0..5, не обязателен
  shots?: number // не обязателен
  answerImg?: string //'url or base 64' // не обязателен
  questionImg?: string //'url or base 64' // не обязателен
  questionVideo?: string //'url or base 64' // не обязателен
  answerVideo?: string //'url or base 64' // не обязателен
}

export type UpdateType = {
  _id: string
  comments?: string
  [key: string]: any
}
