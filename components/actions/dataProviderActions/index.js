export const GET_DEFAULT_NAMES="GET_DEFAULT_NAMES"
export const GET_GOVERMENT_LIST="GET_GOVERMENT_LIST"
export const GET_TYPE_DOC_LIST="GET_TYPE_DOC_LIST"




export const getTypeDocList=(items)=>
{
	return {type:GET_TYPE_DOC_LIST,items}
}

export const getDefaultNames=()=>
{
	return {type:GET_DEFAULT_NAMES,items:{}}
}
export const getGovermentList=()=>
{
	return {type:GET_GOVERMENT_LIST,items:[]}
}
