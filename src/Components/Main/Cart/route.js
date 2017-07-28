import Cart from './Cart';
import Payment from '../Payment/Payment';
import { StackNavigator } from 'react-navigation';

export default CartNav = StackNavigator({
    Cart : { screen : Cart },
    Payment : { screen : Payment }
})
