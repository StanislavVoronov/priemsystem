//********PersonData - begin***********
export const SET_FIRST_NAME="SET_FIRST_NAME"
export const SET_LAST_NAME="SET_LAST_NAME"
export const SET_MIDDLE_NAME="SET_MIDDLE_NAME"
export const SET_SEX_NEW_PERSON="SET_SEX_NEW_PERSON"
export const SET_GOVERNMENT="SET_GOVERNMENT"
export const SET_CUR_PERSON_DOC="SET_CUR_PERSON_DOC"
export const SET_DATE_OF_BIRTH_NEW_PERSON="SET_DATE_OF_BIRTH_NEW_PERSON"
export const SET_PLACE_OF_BIRTH_NEW_PERSON="SET_PLACE_OF_BIRTH_NEW_PERSON"
export const SET_CUR_PERSON_DOC_SERIA="SET_CUR_PERSON_DOC_SERIA"
export const setFirstName=(item)=>
{
	return {type:SET_FIRST_NAME,item}
}

export const setLastName=(item)=>
{
	return {type:SET_LAST_NAME,item}
}
export const setMiddleName=(item)=>
{
	return {type:SET_MIDDLE_NAME,item}
}
export const setSexNewPerson=(item)=>
{
	return {type:SET_SEX_NEW_PERSON,item}
}
export const setDateOfBirth=(item)=>
{
	return {type:SET_DATE_OF_BIRTH_NEW_PERSON,item}
}
export const setPlaceOfBirth=(item)=>
{
	return {type:SET_PLACE_OF_BIRTH_NEW_PERSON,item}
}
export const setGovernment=(item)=>
{
	return {type:SET_GOVERNMENT,item}
}
export const setCurPersonDoc=(item)=>
{
	return {type:SET_CUR_PERSON_DOC,item}
}
export const setCurPersonDocSeria=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_SERIA,item}
}
//***********PersonData - end***********