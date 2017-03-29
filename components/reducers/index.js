import { createStore,applyMiddleware,combineReducers} from 'redux'

import createSagaMiddleware from 'redux-saga'

import {PriemAddNewRequest,SystemStatusState,PriemStructure,PriemAccount,PriemProjectStates} from './priemReducers'
import {PriemDataProvider} from './PriemDataProviderReducer'
const sagaMiddleware=createSagaMiddleware();
import PriemRegNewPerson from "./PriemRegNewPersonReducers/"
import  PriemRootSaga from "../actions"

const reducer = combineReducers({
  PriemDataProvider,
  projectStates:PriemProjectStates,
  PriemAddNewRequest,
  PriemRegNewPerson,
  PriemStructure,
  SystemStatusState,
  PriemAccount,
});
const store=createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(PriemRootSaga,store)

export default store