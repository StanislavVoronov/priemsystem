export const UPDATE_FILE_LIST="UPDATE_FILE_LIST"
export const UPDATE_UPLOAD_IMAGE_FILE="UPDATE_UPLOAD_IMAGE_FILE"
export const UPDATE_FILE_ITEM_TYPE="UPDATE_FILE_ITEM_TYPE"
export const UPDATE_FILE_ITEM_STATUS="UPDATE_FILE_ITEM_STATUS"
export const DELETE_FILE_ITEM="DELETE_FILE_ITEM"
export const UPDATE_DOC_NEED_SCANS="UPDATE_DOC_NEED_SCANS"
export const ADD_NEW_FILE_TO_SERVER="ADD_NEW_FILE_TO_SERVER"
export const GET_USER_WORK_ROOM="GET_USER_WORK_ROOM"
export const SET_REQUEST_PERFORMER="SET_REQUEST_PERFORMER"
export const SET_PRIEM_USER="SET_PRIEM_USER"
export const SET_LOGGED_PRIEM_USER="SET_LOGGED_PRIEM_USER"
export const SET_NEW_TYPE_REQUEST="SET_NEW_TYPE_REQUEST"
export const ADDED_NEW_PRIEM_REQUEST="ADDED_NEW_PRIEM_REQUEST"
export const CHECK_BEFORE_SEND_REQUEST="CHECK_BEFORE_SEND_REQUEST"
export const GET_DOWNLOAD_FILE_IMAGE="GET_DOWNLOAD_FILE_IMAGE"
export const SYSTEM_STATUS_STATE="SYSTEM_STATUS_STATE"
export const DEFAULT_STATE_NEW_REQUEST="DEFAULT_STATE_NEW_REQUEST"
export const CLEAN_DELETE_FILE_LIST="CLEAN_DELETE_FILE_LIST"
export const SET_STATE_NEWREQUEST="SET_STATE_NEWREQUEST"
export const GET_USER_LIST_REQUEST="GET_USER_LIST_REQUEST"
export const SET_USER_LIST_REQUEST="SET_USER_LIST_REQUEST"
export const PRIEM_ERROR_OCCURED="PRIEM_ERROR_OCCURED"
export const PRIEM_SUCCESS_OCCURED="PRIEM_SUCCESS_OCCURED"
export const PRIEM_CLEAR_ERRORS="PRIEM_CLEAR_ERRORS"
export const SET_AUTH_DATA="SET_AUTH_DATA"
export const ADD_NEW_PRIEM_REQUEST="ADD_NEW_PRIEM_REQUEST"
export const SET_USER_TABS_MENU_LIST="SET_USER_TABS_MENU_LIST"
export const REMOVE_USER_TAB_PANEL="REMOVE_TAB_PANEL"
export const PRIEM_LOGOUT_USER="PRIEM_LOGOUT_USER"
export const UPDATE_STATE_TAB_PANEL="UPDATE_STATE_TAB_PANEL"


/////////////////////////////////////////////
import reduxSagaActions from './sagaActions'
import sagaDataProvider from './dataProviderActions/sagaDataProvider'
export default function* PriemRootSaga(state)
{
 	yield [...reduxSagaActions,...sagaDataProvider]
}
/////////////////////////////////////////////

export const logOutUser=()=>{
   	return {type:PRIEM_LOGOUT_USER}
}

export const removeUserTabPanel=(item)=>{
   	return {type:REMOVE_USER_TAB_PANEL,item}
}

export const getUserListRequest=(item)=>{
   	return {type:GET_USER_LIST_REQUEST,item}
}

export const addNewTabPanel=(item)=>{
   	return {type:SET_USER_TABS_MENU_LIST,item}
}


export const setStateNewRequest=(stepIndex,finished)=>{
   	return {type:SET_STATE_NEWREQUEST,items:{stepIndex,finished}}
}
export const clearErrorState=()=>
{
	return {type:PRIEM_CLEAR_ERRORS}
}



export const addNewFileToServer=(item)=>
{
	return {type:ADD_NEW_FILE_TO_SERVER,item}
}
export const getUserWorkRoom=(items)=>
{
	return {type:GET_USER_WORK_ROOM,items}
}

export const updateDocNeedScans=(items)=>
{
	return {type:UPDATE_DOC_NEED_SCANS,items}
}

export const updateFileList=(items)=>
{
	return {type:UPDATE_FILE_LIST,items}
}

export const updateFileItemType=(item,typeDoc)=>
{
	return {type:UPDATE_FILE_ITEM_TYPE,
		item,
		typeDoc
	}
}

export const updateFileItemStatus=(item,status)=>
{

	return {type:UPDATE_FILE_ITEM_STATUS,item,status}
}

export const deleteImageFile=(item)=>
{
	return {type:DELETE_FILE_ITEM,item}
}
export const setRequestPerformer=(item)=>
{
	return {type:SET_REQUEST_PERFORMER,item}
}
export const setPriemUser=(item)=>
{
	return {type:SET_AUTH_DATA,item}
}
export const setLoggedUser=(item)=>
{
	return {type:SET_LOGGED_PRIEM_USER,item}
}
export const sendNewPriemRequestForServer=(item)=>
{
	return {type:ADD_NEW_PRIEM_REQUEST,item}
}
export const setNewTypeRequest=(item)=>
{
	return {type:SET_NEW_TYPE_REQUEST,item}
}
export const getUserUploadImage=()=>
{
	return {type:GET_DOWNLOAD_FILE_IMAGE,items:[]}
}

export const setDefaultStateNewRequest=()=>
{
	return {type:DEFAULT_STATE_NEW_REQUEST}
}

//////

export const updateTabPanelState=(name,items)=>
{
	return {type:UPDATE_STATE_TAB_PANEL,name,items}
}
//////
