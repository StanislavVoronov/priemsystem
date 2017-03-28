

import   {GET_DEFAULT_NAMES,GET_GOVERMENT_LIST,GET_TYPE_DOC_LIST} from '../actions/dataProviderActions/'



export function PriemDataProvider(state={},action)
{   
    //console.log(action.type,action.items)
    switch(action.type)
    { 
        case GET_TYPE_DOC_LIST:
             return Object.assign({},state,{typeDocList:action.items})
        case GET_DEFAULT_NAMES: {
            return Object.assign({},state,{defaultNames:action.items})
        }
        case GET_GOVERMENT_LIST: {
            return Object.assign({},state,{govermentList:action.items})
        }
        default: return state
    }
}