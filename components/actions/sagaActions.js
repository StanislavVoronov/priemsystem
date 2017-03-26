
import {GET_TYPE_DOC_LIST,
    UPDATE_FILE_TYPE,
    UPDATE_DOC_NEED_SCANS,
    ADD_NEW_FILE_TO_SERVER,
    UPDATE_UPLOAD_IMAGE_FILE,
    GET_USER_WORK_ROOM,
    SET_PRIEM_USER,
    DELETE_FILE_ITEM,
    SET_LOGGED_PRIEM_USER,
    CLEAN_DELETE_FILE_LIST,
    ADDED_NEW_PRIEM_REQUEST,
    GET_DOWNLOAD_FILE_IMAGE,
    GET_USER_LIST_REQUEST,
    SET_USER_LIST_REQUEST,
    PRIEM_ERROR_OCCURED,
    ADD_NEW_PRIEM_REQUEST,
    PRIEM_SUCCESS_OCCURED,
    SET_AUTH_DATA,
    SYSTEM_STATUS_STATE,
    UPDATE_FILE_LIST} from './'
import {put,call,takeEvery,take,takeLatest,fork,select} from 'redux-saga/effects'
import {networkService} from "../common/networkService";
function priemMakeErrorList(error)
{
 	const arrayErrors=error.message.split(";")
 	return {type:PRIEM_ERROR_OCCURED,
 		reason:arrayErrors[1],
 		service:arrayErrors[3],
 		codeError:arrayErrors[0],
 		request:arrayErrors[2]}
}
export function* getUserListRequest()
{
	while(true) {
		yield take(GET_USER_LIST_REQUEST)
		const userData =yield select(state => state.PriemAccount.getUserRequests)
		let item;
		try 
	    {
			item = yield call(networkService,
			{name:"userListRequests",data:userData,method:"GET"})

			yield put({type:GET_USER_LIST_REQUEST,item})
			yield put({type:SET_USER_LIST_REQUEST,item})	
		}catch(error){
			yield put(priemMakeErrorList(error))
		}
		
	}
}


export function* getDownloadFileImage()
{
	yield take(GET_DOWNLOAD_FILE_IMAGE)
	yield put({type:SYSTEM_STATUS_STATE,item:{loading:true,loaded:false}})
	const userData = yield select(state => state.PriemAccount.user)
	let items;
	try 
    {
			items = yield call(networkService,
			{name:"userFileImage",data:userData.id_operator,method:"GET"})
			
			yield put({type:UPDATE_FILE_LIST,items})
	}catch(error){
		yield put(priemMakeErrorList(error))
	}
	yield put({type:SYSTEM_STATUS_STATE,item:{loading:false,loaded:false}})
}
export function* setLoggedPriemUser()
{
		yield take(SET_LOGGED_PRIEM_USER)

		const userData = JSON.parse(localStorage["priemUser"])
		let item;
  	  	try 
	    {
				item = yield call(networkService,
				{name:"connOper",data:userData,method:"POST"})

				yield put({type:SET_LOGGED_PRIEM_USER,item})
		}catch(error){
			yield put(priemMakeErrorList(error))
		}
}
export function* setLoginUser(state)
{
	while(true)
	{
		yield take(SET_AUTH_DATA)
		const userData = yield select(state => state.PriemAccount.auth)
		let item;
  	  	try 
	    {
				item = yield call(networkService,
				{name:"regOper",data:userData,method:"POST"})
				if (item.id==0) {
					localStorage.clear()
					item=undefined
					yield put({type:SET_PRIEM_USER,item:{authMessage:"Неправильный логин или пароль!"}})
				}
				else 
				{
					localStorage["priemUser"]=JSON.stringify(item)
					yield put({type:SET_PRIEM_USER,item})
				}
				yield put({type:SET_AUTH_DATA,item:null})
				
		}catch(error){
			yield put({type:SET_AUTH_DATA,item:null})
			yield put(priemMakeErrorList(error))
		}
	}

}
export function* getDocNeedScans(state)
{
		
		yield take(UPDATE_DOC_NEED_SCANS)
		let items;
  	  	try 
	    {
	    		
				items = yield call(networkService,
				{name:'RequestTypesNeedScans'})
				yield put({type:UPDATE_DOC_NEED_SCANS,items})
		}catch(error){
			yield put(priemMakeErrorList(error))
		}
		  
}
export function* sendNewFileToServer()
{
		while(true) {
		    yield take(ADD_NEW_FILE_TO_SERVER)
			const file = yield select(state => {
				return state.PriemAddNewRequest.DocFileList.find((file,index)=> 
					state.PriemAddNewRequest.needsUpload==index)
			});
			const nameDocFile=file.docType && file.docType.docType==41 ? decodeURIComponent(escape(file.name)) : file.name
		  	let image;
		    try 
		    {
				 image = yield call(networkService,
						 {	
							name:nameDocFile,
							data:file,
							format:true,
							url:'priem_image_upload?json=1',
							method:'POST'})
				yield put({type:UPDATE_UPLOAD_IMAGE_FILE,item:image})
			}catch(error){
				yield put(priemMakeErrorList(error))
			}
		  }
		
		
}
export function* removeFileImageFromServer()
{
		while(true) {
		    yield take(DELETE_FILE_ITEM)
			const imageId = yield select(state => state.PriemAddNewRequest.needsImageRemove);
		    try 
		    {
				 yield call(networkService,
						 {	
							name:"removeUploadImageFile",
							data:imageId,
							format:true,

							method:'POST'})
			}catch(error){
				yield put(priemMakeErrorList(error))
			}
			yield put({type:CLEAN_DELETE_FILE_LIST,item:imageId})
		  }
		
		
}
export function* getRequestUserWorkRoom()
{
   		while(true) {
			yield take(GET_USER_WORK_ROOM)
			yield put({type:SYSTEM_STATUS_STATE,item:{loading:true,loaded:false}})
			let items;
		    try {
				items = yield call(networkService,{name:'userWorkRoom'})
				yield put({type:GET_USER_WORK_ROOM,items})
			}catch(error){
				yield put(priemMakeErrorList(error))
			}
	  		yield put({type:SYSTEM_STATUS_STATE,item:{loading:false,loaded:true}})
	  	}
}


export function* addNewPriemRequest()
{
	while(true) {
		yield take(ADD_NEW_PRIEM_REQUEST)
		yield put({type:SYSTEM_STATUS_STATE,item:{loading:true,loaded:false}})
		let items;
		const user  = yield select(state => {
	   		return state.PriemAccount.user})
	   	const addedFiles = yield select(state => {
	   		return state.PriemAddNewRequest.DocFileList})
		 
		console.log("addedFiles",addedFiles)
		const selectedDocs=addedFiles.filter(file=>{
						return file.selected && file.typeDoc
		})
		const idOperator=yield select(state => {
				return state.PriemAddNewRequest.requestPerformer.id
		});
		const typeRequest=yield select(state => {
				return state.PriemAddNewRequest.typeRequest
		});
		let requestData= new FormData(); 
		let needUploadFiles=[];
		addedFiles.filter(file=> {
			if (!file.id && file.selected && file.typeDoc) 
			{
				requestData.append('file',file)
				needUploadFiles.push(file)
				return false
			}
			return true
		})
		let error=false
		requestData.append('idNewTypeRequest',typeRequest.id);
		requestData.append('operatorIdNewRequest',idOperator);
  		requestData.append('addedDocFiles',JSON.stringify(selectedDocs));
  		requestData.append('needUploadDocFiles',JSON.stringify(needUploadFiles));
  		console.log("requestData",requestData)
  		try{
	  		const requestNumber=yield call(networkService,
								{	
									formData:requestData,
									format:true,
									method:'POST'
								})

	  		
	  		yield put({type:ADD_NEW_PRIEM_REQUEST,item:requestNumber.id_queue})
	  		yield put({type:SYSTEM_STATUS_STATE,item:{loading:false,loaded:false}})
	  		if (user.id==idOperator)
	  		{
	  			yield put ({type:GET_USER_LIST_REQUEST,item:idOperator})
	  		}
	  	}catch(error){
	  		console.log(error)
			yield put({type:ADD_NEW_PRIEM_REQUEST,item:0})
		}
  	}
}
const reduxSagaActions=[
addNewPriemRequest(),
getRequestUserWorkRoom(),
removeFileImageFromServer(),
sendNewFileToServer(),
getDocNeedScans(),
setLoginUser(),
setLoggedPriemUser(),
getDownloadFileImage(),
getUserListRequest(),
]
export default reduxSagaActions