const DEFAULT_STATE = []

export default cartReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "GET_CART_SUCCESS":
            return action.cart;
        case "GET_CART_ERROR":
            return state;

        case "ADD_TO_CART":
            return action.newCart;

        case "UPDATE_CART":
            return action.newCart

        case "DELETE_FROM_CART":
            return state.filter((cart, index) => index != action.cartId)

        case "INCREASE_QUANTITY_CART":
            return state.map((e, index) => {
                if (action.cartId == index) {
                    return { ...e, quantity: e.quantity + 1 }
                }
                return e;
            })

        case "DECREASE_QUANTITY_CART":
            return state.map((e, index) => {
                if (action.cartId == index) {
                    if (e.quantity > 1) {
                        return {
                            ...e,
                            quantity: e.quantity - 1
                        }
                    }
                }
                return e;
            })

        default:
            return state;
    }
}