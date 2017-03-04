import { createStore,applyMiddleware,combineReducers} from 'redux'

import createSagaMiddleware from 'redux-saga'

import {PriemAddNewRequest,SystemStatusState,PriemStructure,PriemAccount,PriemDataProvider,PriemProjectStates} from './priemReducers'

const sagaMiddleware=createSagaMiddleware();
import  PriemRootSaga from "../actions"

const reducer = combineReducers({
  directories:PriemDataProvider,
  projectStates:PriemProjectStates,
  PriemAddNewRequest,
  PriemStructure,
  SystemStatusState,
  PriemAccount
});
const store=createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(PriemRootSaga,store)

export default store