const DEFAULT_STATE = false;

export default authenticationStatusReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "GO_SIGNIN":
            return true
        case "GO_SIGNUP":
            return false
        default:
            return state;
    }
}