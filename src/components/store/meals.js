import { fetchRequest } from "../lib/fetchAPI"
import { getBasket } from "./basket"

const initialState = {
    meals: [],

}
export const mealsActionType = {
    GET: "GET"
}
export const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case mealsActionType.GET:
            return {
                ...state,
                meals: action.payload
            }
        default:
            return state
    }
}
export function getFoods() {
    return async (dispatch) => {
        try {
            const response = await fetchRequest('/foods');
            dispatch({ type: mealsActionType.GET, payload: response });
        } catch (error) {
            new Error(error);
            console.log(error);
        }
    }
}
export function addItem(id, amount) {
    return async (dispatch) => {
        try {
            console.log("Hi");
            await fetchRequest(`/foods/${id}/addToBasket`, { method: 'POST', body: { amount } })
            dispatch(getBasket())
        } catch (error) {
            new Error(error)
            console.log(error);
        }

    }

}
