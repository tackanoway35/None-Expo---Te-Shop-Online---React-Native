const DEFAULT_STATE = {
    categories: [],
    topProducts: []
}

export default categoriesProductReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES_TOPPRODUCT_SUCCESS":
            return {
                categories: action.categories,
                topProducts: action.topProducts
            }
        default:
            return state;
    }
}