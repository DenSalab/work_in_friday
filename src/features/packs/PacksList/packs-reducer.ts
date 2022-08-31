import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/app-reducer'
import { ActionsType, AppThunk } from '../../../app/store'
import { serverErrorHandler } from '../../../common/utils/serverErrorHandler'
import { setServerErrorAC } from '../../auth/auth-reducer'
import { CardPackType, CardsPackQueryType, CreatePackType, packAPI } from '../../../api/packAPI'

const initialState = {
  searchedPackName: '' as string,
  onlyMyPacks: false,
  page: 1,
  pageCount: 8, // количество элементов на странице
  packsTotalCount: 0, // количество колод
  minCardsCount: 0,
  maxCardsCount: 100,
  cardPacks: [] as CardPackType[],
  cardPacksTotalCount: 0,
  // token: '',
  // tokenDeathTime: 0,
}

export const packsReducer = (
  state: PackStateType = initialState,
  action: ActionsType
): PackStateType => {
  switch (action.type) {
    case 'packs/SET_SEARCHED_PACK_NAME': {
      console.log(action.value)
      return { ...state, searchedPackName: action.value }
    }
    case 'packs/SET_ONLY_MY_PACKS': {
      return { ...state, onlyMyPacks: action.value }
    }
    case 'packs/SET_PAGE': {
      return { ...state, page: action.value }
    }
    case 'packs/SET_PAGE_COUNT': {
      return { ...state, pageCount: action.value }
    }
    case 'packs/SET_PACKS_TOTAL_COUNT': {
      return { ...state, cardPacksTotalCount: action.value }
    }
    case 'packs/SET_MIN_CARDS_COUNT': {
      return { ...state, minCardsCount: action.value }
    }
    case 'packs/SET_MAX_CARDS_COUNT': {
      return { ...state, maxCardsCount: action.value }
    }
    case 'packs/SET__CARD_PACKS': {
      return { ...state, cardPacks: action.cardPacks }
    }
  }

  return state
}

// action creators
export const setSearchedPackName = (value: string) =>
  ({ type: 'packs/SET_SEARCHED_PACK_NAME', value } as const)
export const setOnlyMyPacks = (value: boolean) =>
  ({ type: 'packs/SET_ONLY_MY_PACKS', value } as const)
export const setPage = (value: number) => ({ type: 'packs/SET_PAGE', value } as const)
export const setPageCount = (value: number) => ({ type: 'packs/SET_PAGE_COUNT', value } as const)
export const setPacksTotalCount = (value: number) =>
  ({ type: 'packs/SET_PACKS_TOTAL_COUNT', value } as const)
export const setMinCardsCount = (value: number) =>
  ({ type: 'packs/SET_MIN_CARDS_COUNT', value } as const)
export const setMaxCardsCount = (value: number) =>
  ({ type: 'packs/SET_MAX_CARDS_COUNT', value } as const)
export const setCardPacks = (cardPacks: Array<CardPackType>) =>
  ({ type: 'packs/SET__CARD_PACKS', cardPacks } as const)

// thunk creators
export const getCardsPackTC =
  (data: CardsPackQueryType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packAPI.getCardsPack(data)
      dispatch(setCardPacks(res.data.cardPacks))
      dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
      dispatch(setServerErrorAC(''))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const createCardsPackTC =
  (data: CreatePackType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packAPI.createCardsPack(data)
      dispatch(setServerErrorAC(''))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const deleteCardsPackTC =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packAPI.deleteCardsPack(id)
      dispatch(setServerErrorAC(''))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const updateCardsPackTC =
  (cardsPack: CardPackType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packAPI.updateCardsPack(cardsPack)
      dispatch(setServerErrorAC(''))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

//types
export type PackStateType = typeof initialState
