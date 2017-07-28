const DEFAULT_STATE = {
    isLoading: false,
    error: false,
    orders: []
}

export default orderReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CONFIRM_ORDER_START":
            return {
                ...state,
                isLoading: true,
            }

        case "CONFIRM_ORDER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                orders: action.order.concat(state.orders)
            }

        case "CONFIRM_ORDER_ERROR":
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default:
            return state;
    }
}