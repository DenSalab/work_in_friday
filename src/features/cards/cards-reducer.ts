import { AxiosError } from 'axios'

import { cardsAPI, CardsStateType, CardType, CreatedCardType } from '../../api/cardsAPI'
import { setAppStatusAC } from '../../app/app-reducer'
import { ActionsType, AppRootStateType, AppThunk } from '../../app/store'
import { serverErrorHandler } from '../../common/utils/serverErrorHandler'

const initialState = {
  cards: [] as CardsStateType,
  cardsPack_id: '',
  cardAnswer: '',
  cardQuestion: '',
  min: 0,
  max: 5,
  sortCards: '0updated',
  page: 1,
  pageCount: 5,
  cardsTotalCount: 0,
}

export const cardsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS': {
      return { ...state, cards: action.cards }
    }
    case 'cards/SET_CARDS_LIST_PAGE': {
      return { ...state, page: action.page }
    }
    case 'cards/SET_CARDS_TOTAL_COUNT': {
      return { ...state, cardsTotalCount: action.count }
    }
    case 'cards/SET_PAGE_COUNT': {
      return { ...state, pageCount: action.count }
    }
    case 'cards/SET_SEARCHED_QUESTION':
      return { ...state, cardQuestion: action.cardQuestion }
    case 'cards/SET_SORT_CARDS':
      return { ...state, sortCards: action.value }
    default:
      return state
  }
}

// action creators
export const setCardsAC = (cards: CardsStateType) => ({ type: 'cards/SET_CARDS', cards } as const)
export const setCardsListPageAC = (page: number) =>
  ({ type: 'cards/SET_CARDS_LIST_PAGE', page } as const)
export const setCardsTotalCountAC = (count: number) =>
  ({ type: 'cards/SET_CARDS_TOTAL_COUNT', count } as const)
export const setPageCountAC = (count: number) => ({ type: 'cards/SET_PAGE_COUNT', count } as const)
export const setSearchedQuestionAC = (cardQuestion: string) =>
  ({ type: 'cards/SET_SEARCHED_QUESTION', cardQuestion } as const)
export const setSortCardsAC = (value: string) => ({ type: 'cards/SET_SORT_CARDS', value } as const)

// thunk creators
export const getCardsTC =
  (cardsPack_id: string, count?: number): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const page = getState().cards.page
    const pageCount = getState().cards.pageCount
    const cardQuestion = getState().cards.cardQuestion
    const sortCards = getState().cards.sortCards

    dispatch(setAppStatusAC('loading'))

    try {
      const res = count ?
          await cardsAPI.getCard({ cardsPack_id, page:1, pageCount: count }) :
          await cardsAPI.getCard({ cardsPack_id, page, pageCount, cardQuestion, sortCards })

      dispatch(setCardsAC(res.data.cards))
      dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
      dispatch(setPageCountAC(res.data.pageCount))
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
      await cardsAPI.createCard(card)
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const deleteCardTC =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      await cardsAPI.deleteCard(id)
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const updateCardTC =
  (card: CardType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      await cardsAPI.updateCard(card)

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

export const updateCardGradeTC =
  (packId: string, grade: number, cardId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      await cardsAPI.updateCardGrade(grade, cardId)
      await dispatch(getCardsTC(packId))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      serverErrorHandler(e as AxiosError | Error, dispatch)
    }
  }

//types
type InitialStateType = typeof initialState
