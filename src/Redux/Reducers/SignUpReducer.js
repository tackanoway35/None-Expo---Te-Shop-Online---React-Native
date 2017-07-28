const DEFAULT_STATE = {
    isLoading: false,
    error: false
}

export default signUpReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SIGNUP_START":
            return {
                error: false,
                isLoading: true,
            }
        case "SIGNUP_SUCCESS":
            return {
                error: false,
                isLoading: false
            }
        case "SIGNUP_ERROR":
            return {
                error: true,
                isLoading: false
            }

        default:
            return state
    }
}