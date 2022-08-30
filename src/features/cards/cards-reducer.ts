import { AxiosError } from 'axios'

import {
  CardQueryType,
  cardsAPI,
  GetCardsResponseType,
  CreatedCardType,
  UpdatedCardType,
} from '../../api/cardsAPI'
import { setAppStatusAC } from '../../app/app-reducer'
import { ActionsType, AppThunk } from '../../app/store'
import { serverErrorHandler } from '../../common/utils/serverErrorHandler'

const initialState = {} as GetCardsResponseType

export const cardsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS': {
      return { ...state, cards: action.data.cards }
    }
    case 'cards/SET_PAGE': {
      return { ...state, page: action.page }
    }
    case 'cards/SET_PAGE_COUNT': {
      return { ...state, pageCount: action.pageCount }
    }
    default:
      return state
  }
}

// action creators
export const setCardsAC = (data: GetCardsResponseType) =>
  ({ type: 'cards/SET_CARDS', data } as const)
export const setPageAC = (page: number) => ({ type: 'cards/SET_PAGE', page } as const) // need to delete, use query params
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'cards/SET_PAGE_COUNT', pageCount } as const) // need to delete, use query params in getCardsTC

// thunk creators
export const getCardsTC =
  (data: CardQueryType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCard(data)

      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const createCardTC =
  (card: CreatedCardType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.createCard(card)

      dispatch(setAppStatusAC('succeeded'))
      getCardsTC({ cardsPack_id: res.data.newCard.cardsPack_id })
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const deleteCardTC =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.deleteCard(id)

      dispatch(setAppStatusAC('succeeded'))
      getCardsTC({ cardsPack_id: res.data.deletedCard.cardsPack_id })
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const updateCardTC =
  (card: UpdatedCardType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateCard(card)

      dispatch(setAppStatusAC('succeeded'))
      getCardsTC({ cardsPack_id: res.data.updatedCard.cardsPack_id })
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

//types
type InitialStateType = typeof initialState
