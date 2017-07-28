const DEFAULT_STATE = {
    topProductDetail: {
        photos: [],
        stock: {}
    },
}

export default topProductDetailReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "GET_TOP_PRODUCT_DETAIL":
            return {
                topProductDetail: action.topProductDetail
            }

        default:
            return state;
    }

}