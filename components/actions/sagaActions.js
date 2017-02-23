
import {UPDATE_DOC_TYPES_LIST,
    UPDATE_FILE_TYPE,
    UPDATE_DOC_NEED_SCANS,
    ADD_NEW_FILE_TO_SERVER,
    UPDATE_UPLOAD_IMAGE_FILE,
    GET_USER_WORK_ROOM,
    SET_PRIEM_USER,
    DELETE_FILE_ITEM,
    SET_LOGGED_PRIEM_USER,
    ADD_NEW_PRIEM_REQUEST,
    GET_DOWNLOAD_FILE_IMAGE,
    SYSTEM_STATUS_STATE,
    UPDATE_FILE_LIST} from './'
import {put,call,takeEvery,take,takeLatest,fork,select} from 'redux-saga/effects'
import {networkService} from "../common/networkService";
export function* getDownloadFileImage()
{
	yield take(GET_DOWNLOAD_FILE_IMAGE)
	const userData = yield select(state => state.PriemAccount.user)
	let items;
	try 
    {
			items = yield call(networkService,
			{name:"userFileImage",data:userData.id_operator,method:"GET"})
			console.log("userFileImage",items)
			yield put({type:UPDATE_FILE_LIST,items})
	}catch(error)
	{
		yield put({type:UPDATE_FILE_LIST,item})
	}

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
		}catch(error)
		{
			yield put({type:SET_LOGGED_PRIEM_USER,item})
		}
}
export function* setLoginUser(state)
{
		yield take(SET_PRIEM_USER)
		const userData = yield select(state => state.PriemAccount.user)
		console.log(userData)
		let item;
  	  	try 
	    {
				item = yield call(networkService,
				{name:"regOper",data:userData,method:"POST"})
				const priemUser=JSON.stringify(item)
				if (priemUser.id_operator==0) {
					alert("Error has occured")
					item=undefined
				}
				else 
				{
					localStorage["priemUser"]=JSON.stringify(item)
				}
				
				yield put({type:SET_PRIEM_USER,item})
		}catch(error)
		{
			yield put({type:SET_PRIEM_USER,items})
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
		}catch(error)
		{
			yield put({type:UPDATE_DOC_NEED_SCANS,items})
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
		  	let image;
		    try 
		    {
				 image = yield call(networkService,
						 {	
							name:file.name,
							data:file,
							format:true,
							url:'priem_image_upload?json=1',
							method:'POST'})
				yield put({type:UPDATE_UPLOAD_IMAGE_FILE,item:image})
			}catch(error)
			{
				console.log(error)
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
			}catch(error)
			{
				console.log(error)
			}
		  }
		
		
}
export function* getRequestUserWorkRoom()
{
   		
		yield take(GET_USER_WORK_ROOM)
		yield put({type:SYSTEM_STATUS_STATE,item:{loading:true,loaded:false}})
		let items;
	    try 
	    {
			items = yield call(networkService,{name:'userWorkRoom'})
			yield put({type:GET_USER_WORK_ROOM,items})
		}catch(error)
		{
			yield put({type:GET_USER_WORK_ROOM,items:items})
		}
  		yield put({type:SYSTEM_STATUS_STATE,item:{loading:false,loaded:true}})
}
export function* getDocList()
{
   		
		yield take(UPDATE_DOC_TYPES_LIST)
		let items;
	    try 
	    {
			items = yield call(networkService,{name:'DocumentList'})
			yield put({type:UPDATE_DOC_TYPES_LIST,items})
		}catch(error)
		{
			yield put({type:UPDATE_DOC_TYPES_LIST,items:items})
		}
  
}

export function* addNewPriemRequest()
{
   		
		yield take(ADD_NEW_PRIEM_REQUEST)
		let items;
	   	const files = yield select(state => {
				return state.PriemAddNewRequest.DocFileList.filter(file=> 
				file.selected==true)
		}); 
		const operator=yield select(state => {
				return state.PriemAddNewRequest.requestPerformer ? state.PriemAddNewRequest.requestPerformer.id_oper : state.PriemAccount.user.id
		});
		const typeRequest=yield select(state => {
				return state.PriemAddNewRequest.typeRequest
		});
		let requestData= new FormData(); 
		let error=false
		const typesDocFile=files.map(file=>{
			requestData.append(file.name,file)
			if (file.typeDoc.typeDoc || file.typeDoc.subTypeDoc)
			{
				return Object.assign({},{typeDoc:file.typeDoc.typeDoc},{subTypeDoc:file.typeDoc.subTypeDoc})
			}
			else 
			{
				error=true;
				alert('У документа '+file.name+' отсутствует тип документа. Для добавления документа в пакет необходимо выбрать тип документа, либо исключить документ из пакета')
			}
		})
		if (error)
		{
			put({type:ADD_NEW_PRIEM_REQUEST,item:'error'})
			return false
		}
		requestData.append('addNewTypeRequest',typeRequest.id);
		requestData.append('operatorIdNewRequest',operator);
  		requestData.append('newDocFilesRequest',JSON.stringify(typesDocFile));
  		console.log("requestData",requestData)
  		const zaprosNumber=yield call(networkService,
							{	
								name:"addNewRequest",
								formData:requestData,
								format:true,
								method:'POST'
							})
  		console.log("zaprosNumber",zaprosNumber)
  		put({type:ADD_NEW_PRIEM_REQUEST,item:zaprosNumber})
}
const reduxSagaActions=[
addNewPriemRequest(),
getDocList(),
getRequestUserWorkRoom(),
removeFileImageFromServer(),
sendNewFileToServer(),
getDocNeedScans(),
setLoginUser(),
setLoggedPriemUser(),
getDownloadFileImage(),
]
export default reduxSagaActions