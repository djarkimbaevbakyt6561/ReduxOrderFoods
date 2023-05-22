import { fetchRequest } from "../lib/fetchAPI"

const initialState = {
    items: [],
    totalAmount: 0,
}
export const basketActionTypes = {
    GET_BASKET: "GET_BASKET",
    TOTAL_AMOUNT: "TOTAL_AMOUNT",
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"

}
export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case basketActionTypes.GET_BASKET:
            console.log(state.items);
            return {
                ...state,
                items: action.payload
            }
        case basketActionTypes.TOTAL_AMOUNT:
            return {
                ...state,
                totalAmount: state.items.reduce((prev, current) => prev + current.amount, 0)
            }
        case basketActionTypes.INCREMENT:
            const updatedItemsIncrement = state.items.map((el) => {
                if (el._id === action.payload) {
                    return { ...el, amount: el.amount + 1 }
                }
                return el;
            })
            return {
                ...state,
                items: updatedItemsIncrement,
            };
            case basketActionTypes.DECREMENT:
                const updatedItemsDecrement = state.items.map((el) => {
                    if (el._id === action.payload) {
                        return { ...el, amount: el.amount - 1 }
                    }
                    return el;
                })
                return {
                    ...state,
                    items: updatedItemsDecrement,
                };
        default:
            return state

    }
}
export function getBasket() {
    return async (dispatch) => {
        try {
            const response = await fetchRequest(`/basket`)
            dispatch({ type: "GET_BASKET", payload: response.items })
        } catch (error) {
            new Error(error)
            console.log(error);
        }
    }
}
export function incrementAmount(id, amount) {
    return async (dispatch) => {
        await dispatch({ type: basketActionTypes.INCREMENT, payload: id })
        await fetchRequest(`/basketItem/${id}/update`, { method: "PUT", body: { amount: amount + 1 } });
        await dispatch(getBasket())
    }
}
export function decrementAmount(id, amount) {
    return async (dispatch) => {
        await dispatch({ type: basketActionTypes.DECREMENT, payload: id })
        await fetchRequest(`/basketItem/${id}/update`, { method: "PUT", body: { amount: amount - 1 } });
        await dispatch(getBasket())
        if (amount <= 1) {
            console.log("hi");
            await fetchRequest(`/basketItem/${id}/delete`, { method: "DELETE" })
            await dispatch(getBasket())
        }
    }
}
