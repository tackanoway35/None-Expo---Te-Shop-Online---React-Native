const DEFAULT_STATE = {
    profile: {},
    isLoadingSaveProfile: false,
    isLoading: false,
    isLoadingSignOut: false,
    error: false
}

export default signInReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SIGNIN_START":
            return {
                ...state,
                isLoading: true,
            }
        case "SIGNIN_SUCCESS":
            return {
                ...state,
                isLoading: false
            }
        case "SIGNIN_ERROR":
            return {
                ...state,
                isLoading : false,
                error: true,
            }

        case "SIGNOUT_START":
            return {
                ...state,
                isLoadingSignOut: true,
            }

        case "SIGNOUT_SUCCESS":
            return {
                ...state,
                isLoadingSignOut: false,
                profile : {}
            }

        case "SIGNOUT_ERROR":
            return {
                ...state,
                isLoadingSignOut : false,
                error: true
            }
        case "SAVE_PROFILE_START":
            return {
                ...state,
                isLoadingSaveProfile: true,
            }

        case "SAVE_PROFILE_SUCCESS":
            return {
                ...state,
                isLoadingSaveProfile: false,
            }

        case "SAVE_PROFILE_ERROR":
            return {
                ...state,
                isLoadingSaveProfile : false,
                error: true,
            }
        case "GET_PROFILE_SUCCESS":
            return {
                ...state,
                profile: action.profile,
            }

        case "GET_PROFILE_ERROR":
            return {
                ...state,
                error: true,
            }
        default:
            return state;
    }
}