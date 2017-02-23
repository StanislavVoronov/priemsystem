
import {UPDATE_DOC_TYPES_LIST,
    UPDATE_FILE_LIST,
    UPDATE_FILE_ITEM_STATUS,
    UPDATE_FILE_ITEM_TYPE,
    DELETE_FILE_ITEM,
    ADD_NEW_FILE_TO_SERVER,
    UPDATE_UPLOAD_IMAGE_FILE,
    GET_USER_WORK_ROOM,
    SET_REQUEST_PERFORMER,
    SET_PRIEM_USER,
    SET_NEW_TYPE_REQUEST,
    CHECK_BEFORE_SEND_REQUEST,
    ADD_NEW_PRIEM_REQUEST,
    SET_LOGGED_PRIEM_USER,
    SYSTEM_STATUS_STATE,
    UPDATE_DOC_NEED_SCANS} from '../actions'
import {merge} from "lodash";

export function PriemAccount(state={},action)
{

    switch(action.type)
    {
        case SET_PRIEM_USER:
        {
             return Object.assign({},state,{'user':action.item})   
        }
        case SET_LOGGED_PRIEM_USER:
        {
             return Object.assign({},state,{'user':action.item})   
        }
        default:
            return state
    }

}
export function PriemDataProvider(state={},action)
{   
    //console.log(action.type,action.items)
    switch(action.type)
    { 

        case UPDATE_DOC_NEED_SCANS:
             return Object.assign({},state,{docsNeedScansList:action.items}) 
        case UPDATE_DOC_TYPES_LIST:
             return Object.assign({},state,{subTypesDocList:action.items})
        default: return state
    }
}
export function StatusSystemState(state={loading:false,loaded:true},action)
{
    switch(action.type)
    { 
        case SYSTEM_STATUS_STATE:
        {
            return Object.assign({},state,{state:action.item}) 
        }

        default:
           return state
    }
}
export function PriemAddNewRequest(state={DocFileList:[],userWorkRoom:[],requestPerformer:undefined},action){
       
    
        console.log(action.type,action.items,action.item)
        switch(action.type)
        {  
            case ADD_NEW_PRIEM_REQUEST:
            {
                 return Object.assign({},state,{requestNumber:action.item})   
            }       
            case SET_REQUEST_PERFORMER:
            {
                 return Object.assign({},state,{requestPerformer:action.item})   
            }
            case UPDATE_UPLOAD_IMAGE_FILE:
            {
                if (action.item[0].error!="OK") {
                    alert("Возникла ошибка при добавлении файла. Повторите попытку еще раз!")
                    return false
                }
                const updatedDocListFiles=state.DocFileList.map((file,index)=>{
                    if (index==state.needsUpload)
                    {
                        file.image=action.item[0].id
                    }
                    return file
                })
                return Object.assign({},state,{DocFileList:updatedDocListFiles})
            }
            case ADD_NEW_FILE_TO_SERVER:
            {
                return Object.assign({},state,{needsUpload:action.item})
            }
            case GET_USER_WORK_ROOM:
            {
                return Object.assign({},state,{userWorkRoom:action.items})
            }
            case SET_NEW_TYPE_REQUEST:
            {
                return Object.assign({},state,{typeRequest:action.item})
            }
            case UPDATE_FILE_ITEM_TYPE:
            {
                 const updateTypeItemFileList=state.DocFileList.map((file,index)=>{
                    console.log(action.typeDoc)
                    if (action.item==index)
                    {
                        file.typeDoc=action.typeDoc
                    }
                    return file
                })
                return Object.assign({},state,{DocFileList:updateTypeItemFileList})
            }
            case UPDATE_FILE_ITEM_STATUS:
            {
                const updateStatusItemFileList=state.DocFileList.map((file,index)=>{

                    if (action.item==index)
                    {
                        file.selected=!action.status
                    }
                    return file
                })
                return Object.assign({},state,{DocFileList:updateStatusItemFileList})
            }
            case DELETE_FILE_ITEM:
            {
                let imageId
                const updateDocList=state.DocFileList.map((file,index)=>{
                    if (index==action.item)
                    {
                        imageId=file.image
                        delete file.image
                    }
                    return file
                })
                return Object.assign({},state,{DocFileList:updateDocList},{needsImageRemove:imageId})
            }
            case UPDATE_FILE_LIST:
            {
                 const newListFileDoc=state.DocFileList.concat(action.items)
                 return Object.assign({},state,{DocFileList:newListFileDoc}) 
            }
            default:
                return state 
        }
}

export function PriemStructure(state={"Krim":0,"DocList":0,examList:[]},component)
    {
        
        switch(component.type)
        {
            case 'Filial':
                return Object.assign(state,{"filList":component.data})
            case 'Dir':
                return Object.assign(state,{"dirList":component.data})
            case 'Prof':
                return Object.assign(state,{"profList":component.data})
            case 'formEduc':
                return Object.assign(state,{"educList":component.data})
            case 'formFin':
                return Object.assign(state,{"finList":component.data})    
            case 'Krim':
                return Object.assign(state,{"Krim":component.data})
            case 'Fin':
                return Object.assign(state,{"Fin":component.data})
            case 'DocList':
                return Object.assign(state,{"DocList":component.data})
            case 'cleanExamList':
                return Object.assign(state,{"examList":component.data})
            case 'examList':
                
                return Object.assign(state,{"examList":component.data})
            case 'setExam':
            {
                
                const examSets=state.examList.map(list=> {
                    if (list.key==component.data[0].key)
                    {
                       list.examSet=component.data[0].id
                    }
                    return list
                })
                return Object.assign(state,{"examList":examSets})
            }   
            case 'InfoAdm':
                return Object.assign(state,{"InfoAdm":component.data})
            case 'Count':
            {
                
                return Object.assign(state,{"InfoAdm":state.InfoAdm.map(value=> {
                    if (value.key==component.data.key) {value.count=component.data.count} return value})})
            } 
            case 'WaveFirst':
            {
                
                return Object.assign(state,{"InfoAdm":state.InfoAdm.map(value=> {
                    if (value.key==component.data.key) {value.waveFirst=component.data.waveFirst} return value})})
            } 
            case 'WaveSecond':
            {
                return Object.assign(state,{"InfoAdm":state.InfoAdm.map(value=> {
                    if (value.key==component.data.key) {value.waveSecond=component.data.waveSecond} return value})})
            } 
              case 'Duration':
            {
                
                return Object.assign(state,{"InfoAdm":state.InfoAdm.map(value=> {
                    if (value.key==component.data.key) {value.duration=component.data.duration} return value})})
            } 
            case 'Cost':
            {
                
                return Object.assign(state,{"InfoAdm":state.InfoAdm.map(value=> {
                    if (value.key==component.data.key) {value.cost=component.data.cost} return value})})
            } 
            default:
                return state
        }
    
}