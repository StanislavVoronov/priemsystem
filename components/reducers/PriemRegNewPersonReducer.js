


import {SET_MIDDLE_NAME,SET_FIRST_NAME,SET_LAST_NAME,SET_SEX_NEW_PERSON,SET_DATE_OF_BIRTH_NEW_PERSON} from "../actions/regNewPerson/"


const DateISOFormat=(date)=> new Date(date).toISOString().slice(0,10)

export function PriemRegNewPerson(state={middle_name:''},action)
{
	switch(action.type)
	{
		case SET_MIDDLE_NAME: 
		{
			return Object.assign({},state,{middle_name:action.item})
		}
		case SET_FIRST_NAME: 
		{
			return Object.assign({},state,{first_name:action.item})
		}
		case SET_LAST_NAME: 
		{
			return Object.assign({},state,{last_name:action.item})
		}
		case SET_SEX_NEW_PERSON: 
		{
			return Object.assign({},state,{sex:action.item+1})
		}
		case SET_DATE_OF_BIRTH_NEW_PERSON: 
		{
			return Object.assign({},state,{birthdate:DateISOFormat(action.item)})
		}
		default: return state
	}
}