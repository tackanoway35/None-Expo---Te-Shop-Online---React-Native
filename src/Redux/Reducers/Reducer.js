import cart from './CartReducer';
import categoriesProduct from './CategoriesProductReducer';
import signIn from './SignInReducer';
import signUp from './SignUpReducer';
import topProductDetail from './TopProductDetail';
import authenticationStatus from './AuthenticationStatusReducer';
import order from './OrderReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default reducer = combineReducers({
    cart,
    categoriesProduct,
    signIn,
    signUp,
    topProductDetail,
    authenticationStatus,
    order,
    form : formReducer
}) 