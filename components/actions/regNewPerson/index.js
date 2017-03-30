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
export const SET_CUR_PERSON_DOC_NUMBER="SET_CUR_PERSON_DOC_NUMBER"
export const SET_CUR_PERSON_DOC_DEPARTMENT="SET_CUR_PERSON_DOC_DEPARTMENT"
export const SET_CUR_PERSON_DOC_DATE="SET_CUR_PERSON_DOC_DATE"
export const SET_CUR_PERSON_DOC_CODE_DEPARTMENT="SET_CUR_PERSON_DOC_CODE_DEPARTMENT"
export const SET_CUR_PERSON_DOC_PAGE="SET_CUR_PERSON_DOC_PAGE"
export const SET_OLD_PERSON_DOC_SERIA="SET_OLD_PERSON_DOC_SERIA"
export const SET_OLD_PERSON_DOC_NUMBER="SET_OLD_PERSON_DOC_NUMBER"
export const SET_IS_FROM_KRIM="SET_IS_FROM_KRIM"


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
export const setCurPersonDocNumber=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_NUMBER,item}
}
export const setCurPersonDocDepartment=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_DEPARTMENT,item}
}
export const setCurPersonDocDate=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_DATE,item}
}
export const setCurPersonDocCodeDepartment=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_CODE_DEPARTMENT,item}
}
export const setCurPersonDocPage=(item)=>
{
	return {type:SET_CUR_PERSON_DOC_PAGE,item}
}
export const setOldPersonDocSeria=(item)=>
{
	return {type:SET_OLD_PERSON_DOC_SERIA,item}
}
export const setOldPersonDocNunmber=(item)=>
{
	return {type:SET_OLD_PERSON_DOC_NUMBER,item}
}
export const setIsFromKrim=()=>
{
	return {type:SET_IS_FROM_KRIM}
}

//***********PersonData - end***********