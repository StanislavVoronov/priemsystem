import React from 'react';
import {Styles} from '../common/StylePriem'
import {connect} from "react-redux"
import AutoComplete from 'material-ui/AutoComplete';

import {getTypeDocList,getDefaultNames,getGovermentList} from '../actions/dataProviderActions/'
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField'; 
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Select from "../common/multiSelect";
import Subheader from 'material-ui/Subheader';
import PriemImageComponent from '../common/PriemImageComponent'
import Divider from 'material-ui/Divider';

import {setFirstName,setLastName,setMiddleName,setSexNewPerson,
setGovernment,
setCurPersonDocSeria,
setCurPersonDoc,
setDateOfBirth,
setPlaceOfBirth} from "../actions/regNewPerson/"
const dataSourceConfig = {
text: 'value',
value: 'id',
};

export class PriemRegPersonData extends React.Component{
componentWillMount()
{
	this.props.getDefaultNames()
	this.props.getGovermentList()
	this.props.getTypeDocList()
}
getDefaultFirstNames()
{
	return this.props.defaultNames && this.props.defaultNames.firstNames || []
}
getDefaultMiddleNames()
{
	const middleNames=this.props.defaultNames && this.props.defaultNames.middleNames || []
	if (this.props.newPerson && this.props.newPerson["firstName"]	){
		const personName=this.props.defaultNames.firstNames.find(name=>name.value===this.props.newPerson["firstName"])
		if (personName) {
			return middleNames.filter(name=> name.sex==personName.sex)
		}
	}
	return middleNames
}
filterNames(searchText, key,sex)
{
	return searchText.length>1 && searchText !== '' && key.indexOf(searchText) !== -1
}
checkExistData(mainData,message,innerData)
{
	if (innerData) return this.props.newPerson && this.props.newPerson[mainData][innerData] ? false : message
	return this.props.newPerson && this.props.newPerson[mainData] ? false : message
}
onSexNewPerson(value,key){
	if (key){
		
		const typeSex=this.props.defaultNames.firstNames[key].sex

		this.props.setSexNewPerson(typeSex)
	}
}
render(){
	console.log("newPerson===>>>",this.props)
	const currentDate=new Date().getFullYear();
	const requiredField= "Обязательно для заполнения"
	const {newPerson}=this.props
	return (
		<div style={{display:'flex'}}>
		 <div style={Styles.paddingSides}>
			<TextField style={Styles.marginBetweenTextField} onChange={this.props.setLastName} 
				fullWidth id='lastName' hintText="Иванов" errorText={this.checkExistData("last_name",requiredField)}   floatingLabelText={"Фамилия"}/>
		   <br />
		   	<AutoComplete style={{margin:0}}  floatingLabelText={"Имя"} listStyle={Styles.listAutoComplete} onUpdateInput={this.props.setFirstName} 
			      hintText="Иван" fullWidth onNewRequest={this.onSexNewPerson.bind(this)}
			      textFieldStyle={this.checkExistData("last_name",requiredField) ? Styles.marginBetweenTextField : Styles.marginBetweenTextFieldValid}
			      filter={(searchText, key)=>this.filterNames(searchText, key)}
			      dataSource={this.getDefaultFirstNames()}
    				  dataSourceConfig={dataSourceConfig} errorText={this.checkExistData("first_name",requiredField)}/>
  			<br />
    			<AutoComplete  floatingLabelText={"Отчество"} listStyle={Styles.listAutoComplete}
			      hintText="Иванович" fullWidth
			      textFieldStyle={this.checkExistData("first_name",requiredField) ? Styles.marginBetweenTextField : Styles.marginBetweenTextFieldValid}
			      filter={(searchText, key)=>this.filterNames(searchText, key)}
			      dataSource={this.getDefaultMiddleNames()} 
    				  dataSourceConfig={dataSourceConfig}/>	
    			
    			 	<RadioButtonGroup name="sexPerson" style={{display:'flex',marginTop:10}} 
    			 			valueSelected={newPerson && newPerson["sex"]} onChange={(event,value)=>this.props.setSexNewPerson(value-1)}>
			      <RadioButton style={{width:'auto'}}
			        	labelStyle={{marginRight:30}}
			        	iconStyle={{marginRight:8}}	
				        value={1}
				        label="Муж."/>
			          <RadioButton
			          		iconStyle={{marginRight:8}}
					        value={2}
					        label="Жен." />
			    </RadioButtonGroup>
			    
			    <TextField id='birthdate'  fullWidth onChange={this.props.setDateOfBirth} 
				    floatingLabelFixed floatingLabelText={"Дата рождения"} type={"date"} 
				    errorText={this.checkExistData("birthdate",requiredField)} />
			    <br />
			    <TextField id='placeOfBirth' fullWidth style={this.checkExistData("birthdate",requiredField) ? Styles.marginBetweenTextField : Styles.marginBetweenTextFieldValid}
			    floatingLabelText={"Место рождения"}  hintText={"г. Москва"} onChange={this.props.setPlaceOfBirth} />
			    

			    <Select divider={false}  filter={true} selectClass={{marginTop:10}}  selected={this.props.id_doc && this.props.id_doc.gov}
			    	title='Гражданство' onChange={(value)=>this.props.setGovernment(value.id)} data={this.props.govermentList} />	
			    

			    <Select divider={false} filter={true} selectClass={{marginTop:15}}  selected={this.props.govermentList && this.props.govermentList[0]}
			    	title='Документ, удостоверяющий личность' onChange={(value)=>this.props.setCurPersonDoc(value)} data={this.props.typeDocList} />	
			    
			    <TextField style={this.checkExistData("id_doc",requiredField,"seria") ? Styles.marginBetweenTextField : Styles.marginBetweenTextFieldValid} 
			    	id='SeriaPassportCur' hintText="4603"  fullWidth 
			    	onChange={this.props.setCurPersonDocSeria} 
			     	errorText={this.checkExistData("id_doc",requiredField,"seria")}   floatingLabelText={"Серия документа"}/>
		   			<br />
					
					<TextField style={Styles.marginBetweenTextField} id='NumberPassportCur' hintText="463012"   fullWidth
					errorText="Обязательно для заполнения"   floatingLabelText={"Номер документа"}/>
				   <br />	
				   <TextField style={Styles.marginBetweenTextField} id='PassportDepartment' hintText="ТП в пос. Быково ОУФМС России по Московской обл. в Раменском р-не"   
					    multiLine={true}
						rows={2}
					    rowsMax={4} fullWidth
						multiLine={true} errorText="Обязательно для заполнения"   floatingLabelText={"Кем выдан"}/>
				   <br />	
				   <TextField fullWidth id='dateOfDocPerson' floatingLabelFixed style={{marginTop:-7}} floatingLabelText={"Дата выдачи"}  type={"date"} errorText="Обязательно для заполнения" />
				   <br />
				   <TextField fullWidth id='codeOfDocPerson'  style={Styles.marginBetweenTextField} floatingLabelText={"Код подразделения"} hintText="500-144" errorText="Обязательно для заполнения" />
				   


				   <Divider style={{marginTop:10}}/>
				    <Subheader style={{lineHeight:0,marginTop:14}}>Сведения о ранее выданных паспортах(для получения результов ЕГЭ)</Subheader>
				     <TextField fullWidth id='oldSeriaDocPerson' floatingLabelText={"Серия документа"} hintText="4611"/>
					   <br />
					 <TextField fullWidth id='oldNumberDocPerson' style={Styles.marginBetweenTextField} floatingLabelText={"Номер документа"} hintText="012463" />
					<Divider style={{marginTop:10,marginBottom:10}}/>
					   <Checkbox labelPosition={'left'} label={`Учитывать при поступлении в Университет действующие результатам ЕГЭ (дата сдачи экзаменов 
					   				не позднее месяца прохождения испытаний в ${currentDate-4} году)`} />
			</div>		  	
      		<div style={{flex:1,selfAlign:'center',position:'relative'}}>
      		  	<PriemImageComponent />
      		</div>
    	 </div>
	)
}
}
const mapStateToProps=(state)=>
{
return {
      priemUser: state.PriemAccount.user, 
      error: state.PriemAccount.error, 
      defaultNames:state.PriemDataProvider.defaultNames,
      govermentList:state.PriemDataProvider.govermentList,
      typeDocList:state.PriemDataProvider.typeDocList,
      newPerson: state.PriemRegNewPerson
  }
}
const mapDispatchToProps=(dispatch) => {
  return {
  	getDefaultNames:()=> dispatch(getDefaultNames()),
  	getGovermentList:()=> dispatch(getGovermentList()),
  	getTypeDocList:()=> dispatch(getTypeDocList()),
  	setFirstName:(value)=>dispatch(setFirstName(value)),
  	setLastName:(event,value)=>dispatch(setLastName(value)),
  	setMiddleName:(event,value)=>dispatch(setMiddleName(value)),
  	setSexNewPerson:(value)=>dispatch(setSexNewPerson(value)),
  	setDateOfBirth:(event,value) => dispatch(setDateOfBirth(value)),
  	setPlaceOfBirth:(event,value) => dispatch(setPlaceOfBirth(value)),
  	setGovernment: (value) => dispatch(setGovernment(value)),
  	setCurPersonDoc:  (value) => dispatch(setCurPersonDoc(value)),
  	setCurPersonDocSeria:(event,value) => dispatch(setCurPersonDocSeria(value)),


  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriemRegPersonData)