
import {combineReducers} from 'redux';
import chatReducer from './chatReducers/chatReducer';
import authReducer from './authReducers/authReducer';

const rootReducer = combineReducers({
    chatReducer,
    authReducer
});

export default rootReducer;