import {put,call,takeEvery,take,takeLatest,fork,select} from 'redux-saga/effects'
import {networkService} from "../../common/networkService";

import   {GET_DEFAULT_NAMES,GET_GOVERMENT_LIST,GET_TYPE_DOC_LIST} from './'
export function* getDefaultNames()
{
		yield take(GET_DEFAULT_NAMES)
		let items;
	    try {
			items = yield call(networkService,{name:'priemDefaultNames'})
			yield put({type:GET_DEFAULT_NAMES,items})
		}catch(error){
			yield put({type:GET_DEFAULT_NAMES,items:items})
		}
}
export function* getGovermentList()
{
		yield take(GET_GOVERMENT_LIST)
		let items;
	    try {
			items = yield call(networkService,{name:'govermentList'})
			yield put({type:GET_GOVERMENT_LIST,items})
		}catch(error){
			yield put({type:GET_GOVERMENT_LIST,items:items})
		}
}

export function* getTypeDocPersonList()
{
		yield take(GET_TYPE_DOC_LIST)
		let items;
	    try {
			items = yield call(networkService,{name:'DocumentList'})
			yield put({type:GET_TYPE_DOC_LIST,items})
		}catch(error){
			yield put({type:GET_TYPE_DOC_LIST,items:items})
		}
}
const sagaDataProvider=[
getDefaultNames(),
getGovermentList(),
getTypeDocPersonList(),
]
export default sagaDataProvider