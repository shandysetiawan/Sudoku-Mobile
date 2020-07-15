import { createStore, combineReducers, applyMiddleware } from 'redux'
import boardReducer from './reducers/boardReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    boardReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store