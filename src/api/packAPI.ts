import { instance } from './instance'

export const packAPI = {
  getCardsPack(values: CardsPackQueryType) {
    return instance.get<CardsPackDomainType>('cards/pack', { params: values })
  },
  createCardsPack(cardsPack: CreatePackType) {
    return instance.post('cards/pack', { cardsPack })
  },
  deleteCardsPack(id: string) {
    return instance.delete('cards/pack', { params: { id } })
  },
  updateCardsPack(cardsPack: CardPackType) {
    return instance.put('cards/pack', { cardsPack })
  },
}

// request types
export type CardsPackQueryType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: number
  page?: number
  pageCount?: number
  user_id?: string | null
}

export type CreatePackType = {
  name: string // если не отправить будет no Name
  deckCover?: string // url or base64
  private: boolean // если не отправить будет false
}

// response type
export type CardsPackDomainType = {
  cardPacks: CardPackType[]
  page: number
  pageCount: number // количество элементов на странице по умолчанию 4
  cardPacksTotalCount: number // количество колод
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CardPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover?: string | null
}
