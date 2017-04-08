import {SET_MIDDLE_NAME,SET_FIRST_NAME,SET_LAST_NAME,
	SET_SEX_NEW_PERSON,
	SET_PLACE_OF_BIRTH_NEW_PERSON,
	SET_DATE_OF_BIRTH_NEW_PERSON,
	SET_CUR_PERSON_DOC_SERIA,
	SET_CUR_PERSON_DOC_NUMBER,
	SET_CUR_PERSON_DOC_DEPARTMENT,
	SET_CUR_PERSON_DOC_DATE,
	SET_GOVERNMENT,SET_CUR_PERSON_DOC,
	SET_CUR_PERSON_DOC_CODE_DEPARTMENT,
	SET_OLD_PERSON_DOC_NUMBER,
	SET_OLD_PERSON_DOC_SERIA,
	SET_CUR_PERSON_DOC_PAGE,
	SET_IS_FROM_KRIM
} from "../../actions/regNewPerson/"

const DateISOFormat=(date)=> new Date(date).toISOString().slice(0,10)

export default function PriemRegNewPerson(state={
		middle_name:"",
		id_doc:{},
		is_from_krim:0,
		birthplace:""
	},action)
	{
		switch(action.type)
		{
			case SET_MIDDLE_NAME: {
				return Object.assign({},state,{middle_name:action.item})
			}
			case SET_FIRST_NAME: {
				return Object.assign({},state,{first_name:action.item})
			}
			case SET_LAST_NAME:{
				return Object.assign({},state,{last_name:action.item})
			}
			case SET_SEX_NEW_PERSON: {
				return Object.assign({},state,{sex:action.item})
			}
			case SET_DATE_OF_BIRTH_NEW_PERSON: {
				return Object.assign({},state,{birthdate:DateISOFormat(action.item)})
			}
			case SET_PLACE_OF_BIRTH_NEW_PERSON: {
				return Object.assign({},state,{birthplace:action.item})
			}
			case SET_GOVERNMENT: {
				const updatePersonDoc=new Object(state.id_doc)
				updatePersonDoc.gov=action.item
				return Object.assign({},state,{id_doc:updatePersonDoc})
			}
			case SET_CUR_PERSON_DOC:{
				const updatePersonDoc=new Object(state.id_doc)
				updatePersonDoc.type=action.item.type
				return Object.assign({},state,{id_doc:updatePersonDoc})
			}
			case SET_CUR_PERSON_DOC_SERIA:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.seria=action.item
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_CUR_PERSON_DOC_NUMBER:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.num=action.item
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_CUR_PERSON_DOC_DEPARTMENT:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.org=action.item
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_CUR_PERSON_DOC_DATE:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.date=DateISOFormat(action.item)
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_CUR_PERSON_DOC_CODE_DEPARTMENT:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.code=action.item
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_CUR_PERSON_DOC_PAGE:{
				const updateCurPersonDoc=new Object(state.id_doc)
				updateCurPersonDoc.page=action.item
				return Object.assign({},state,{id_doc:updateCurPersonDoc})
			}
			case SET_OLD_PERSON_DOC_NUMBER:{
				return Object.assign({},state,{oldPassportNumber:action.item})
			}
			case SET_OLD_PERSON_DOC_SERIA:{
				return Object.assign({},state,{oldPassportSeria:action.item	})
			}
			case SET_IS_FROM_KRIM:{

				const is_from_krim=+!state.is_from_krim
				
				return Object.assign({},state,{is_from_krim})
			}

			default: return state
		}
}
