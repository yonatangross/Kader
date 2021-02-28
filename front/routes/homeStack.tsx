import { createStackNavigator } from 'react-navidation-stack';
import { CreateAppContainet } from 'react-navigation';
import Register from '../src/components/Register/index';

const screens = {

    Register: {
        screen: Register
    }
}

const MyStack = createStackNavigator(screens);

export default CreateAppContainet(MyStack);