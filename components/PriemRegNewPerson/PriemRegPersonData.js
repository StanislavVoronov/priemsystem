import React from 'react';
import {Styles} from '../common/StylePriem'
import {connect} from "react-redux"
import AutoComplete from 'material-ui/AutoComplete';

import {getTypeDocList,getDefaultNames,getGovermentList} from '../actions/dataProviderActions/'

import TextField from 'material-ui/TextField'; 
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Select from "../common/multiSelect";
import Subheader from 'material-ui/Subheader';
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
		return this.props.defaultNames && this.props.defaultNames.middleNames || []
	}
	filterNames(searchText, key)
	{
		return searchText.length>1 && searchText !== '' && key.indexOf(searchText) !== -1
	}
	render(){
		return (
			<div style={{display:'flex'}}>
			 <div style={Styles.paddingSides}>
				<TextField style={Styles.marginBetweenTextField} fullWidth id='lastName' hintText="Иванов"   errorText="Обязательно для заполнения"   floatingLabelText={"Фамилия"}/>
			   <br />
			   	<AutoComplete style={{margin:0}}  floatingLabelText={"Имя"} listStyle={Styles.listAutoComplete}
				      hintText="Иван" fullWidth
				      textFieldStyle={Styles.marginBetweenTextField}
				      filter={(searchText, key)=>this.filterNames(searchText, key)}
				      dataSource={this.getDefaultFirstNames()}
      				  dataSourceConfig={dataSourceConfig} errorText="Обязательно для заполнения"/>
    			<br />
      			<AutoComplete  floatingLabelText={"Отчество"} listStyle={Styles.listAutoComplete}
				      hintText="Иванович" fullWidth
				      textFieldStyle={Styles.marginBetweenTextField}
				      filter={(searchText, key)=>this.filterNames(searchText, key)}
				      dataSource={this.getDefaultMiddleNames()} 
      				  dataSourceConfig={dataSourceConfig}/>	
      			
      			 	<RadioButtonGroup name="sexPerson" style={{display:'flex',marginTop:14,marginBottom:5}}>
				      <RadioButton style={{width:'auto'}}
				        	labelStyle={{marginRight:30}}
				        	iconStyle={{marginRight:8}}	
					        value="light"
					        label="Муж."/>
				          <RadioButton
				          		iconStyle={{marginRight:8}}
						        value="not_light"
						        label="Жен." />
				    </RadioButtonGroup>
				    
				    <TextField id='dateOfBirth'  fullWidth
				    floatingLabelFixed floatingLabelText={"Дата рождения"} type={"date"} 
				    errorText="Обязательно для заполнения" />
				    <br />
				    <TextField id='placeOfBirth' fullWidth style={Styles.marginBetweenTextField} floatingLabelText={"Место рождения"}  hintText={"г. Москва"} />
				    <Select divider={false}  filter={true} selectClass={{marginTop:10}}  selected={this.props.govermentList && this.props.govermentList[0]}
				    	title='Гражданство' onChange={()=>{}} data={this.props.govermentList} />	
				    <Select divider={false} filter={true} selectClass={{marginTop:15,marginBottom:15}}  selected={this.props.govermentList && this.props.govermentList[0]}
				    	title='Документ, удостоверяющий личность' onChange={()=>{}} data={this.props.typeDocList} />	
				    <TextField style={Styles.marginBetweenTextField} id='SeriaPassportCur' hintText="4603"  fullWidth
				     errorText="Обязательно для заполнения"   floatingLabelText={"Серия документа"}/>
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
					   <br />
					    <Subheader style={{lineHeight:0,marginTop:14}}>Сведения о ранее выданных паспортах(для получения результов ЕГЭ)</Subheader>
					     <TextField fullWidth id='oldSeriaDocPerson' floatingLabelText={"Серия документа"} hintText="4611"/>
						   <br />
						 <TextField fullWidth id='oldNumberDocPerson' style={Styles.marginBetweenTextField} floatingLabelText={"Номер документа"} hintText="012463" />
				</div>		  	
	      		<div style={{flex:1,backgroundColor:'rgba(217, 217, 217,0.3)'}}>
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
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
    	getDefaultNames:()=> dispatch(getDefaultNames()),
    	getGovermentList:()=> dispatch(getGovermentList()),
    	getTypeDocList:()=> dispatch(getTypeDocList()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriemRegPersonData)