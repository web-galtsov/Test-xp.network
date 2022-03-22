import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    api: apiReducer,
    tableData: dataReducer,
});

export default rootReducer;
