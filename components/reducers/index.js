import { createStore,applyMiddleware,combineReducers} from 'redux'

import createSagaMiddleware from 'redux-saga'

import {PriemAddNewRequest,StatusSystemState,PriemStructure,PriemAccount,PriemDataProvider} from './priemReducers'

const sagaMiddleware=createSagaMiddleware();
import  PriemRootSaga from "../actions"

const reducer = combineReducers({
  directories:PriemDataProvider,
  PriemAddNewRequest,
  PriemStructure,
  state:StatusSystemState,
  PriemAccount
});
const store=createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(PriemRootSaga,store)

export default store