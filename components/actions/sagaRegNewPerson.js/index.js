

export const SET_FIRST_NAME="SET_FIRST_NAME"
export const SET_LAST_NAME="SET_LAST_NAME"
export const SET_MIDDLE_NAME="SET_MIDDLE_NAME"



export const getTypeDocList=(items)=>
{
	return {type:SET_FIRST_NAME,items}
}

export const setLastName=()=>
{
	return {type:GET_DEFAULT_NAMES,items:{}}
}
export const setFirstName=()=>
{
	return {type:SET_LAST_NAME,items:[]}
}
