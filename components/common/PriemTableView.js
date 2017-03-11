import React, { PureComponent, PropTypes } from 'react';

import {sortAlfabet} from './priemGlobals'
import Select from "../common/multiSelect";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Styles} from "../common/StylePriem"
import PriemButtons from './PriemButtons'
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
export default class TableView extends PureComponent{

	constructor(props)
	{
		super(props)
		this.state={filterMap:new Map(),headerTableRow:[],searchTableRow:[]}
	}
	setFilterTable(index,value)
	{
		

		const filterMap=this.state.filterMap
		filterMap.set(index,value)
		console.log("filterMap",filterMap)
		this.setState({filterMap:new Map(filterMap)})
	}
	componentWillMount()
	{
		this.setState({headerTableRow:this.renderTableHeaderRow(),searchTableRow:this.renderTableSearchRow()})
	}
	renderTableSearchRow()
	{
		let countSearchFields=0;
		const priemSearchRows=this.props.priemHeaderTable.map((searchRow,index)=>{
			if (searchRow.isSearch==true) {
				countSearchFields++;
				const uniqueValues = [...new Set(this.props.priemDataTable.map(item => item[searchRow['key']]))];
				uniqueValues.sort(sortAlfabet)
				const dataSelect=uniqueValues.map((name,id) => new Object({id,name}))
				return (<TableRowColumn style={Styles.OverflowVisible} key={`SearchCell ${index}`}>
							<Select placeholder={`Фильтр по ${searchRow.placeholder}`} multiSelect={true}  onChange={this.setFilterTable.bind(this,index)}
								data={dataSelect} styleSelectContainer={{'width':'100%'}}
		                  		filter='startsWith' divider={false} />
						</TableRowColumn>)
			}
			else {
				return (<TableRowColumn key={`SearchCell ${index}`}>
						</TableRowColumn>)
			}
		})
		if (countSearchFields>0){
			return (<TableRow selectable={false} key={`SearchRow`}>{priemSearchRows}</TableRow>);
		}	
	}
	renderActionElement(header,row,index,key){

		switch (header.type){
			case "button":
			{
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}><PriemButtons
                    type={header.type}
                    label={header.title} 
                    onClick={this.props.onAction.bind(this,row)} /></TableRowColumn>)
			}
			case "radio":
			{
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}>
								<RadioButtonGroup valueSelected={this.props.selected} onChange={this.props.onAction.bind(this,row)} name="shipSpeed" >
							  	<RadioButton
						        	//value="enterprise
						        	value={row.id}
						        	label={header.title} /> 
						        </RadioButtonGroup>
	                    </TableRowColumn>)
			}
			case "checkbox":
			{
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}>
							<Checkbox onCheck={this.props.onAction.bind(this,row)}
						      //checkedIcon={<ActionFavorite />}
						      //uncheckedIcon={<ActionFavoriteBorder />}
						      label={header.title}/>
						 </TableRowColumn>)
			}
			case "menu":
			{
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}><PriemButtons
                    type={header.type}
                    label={header.title} 
                    onClick={this.props.onAction.bind(this,row)} /></TableRowColumn>)
			}

		}
		
	}
	renderDataTable()
	{
		const filterValues=this.props.priemDataTable.filter(value=>{
				let dataExists=this.props.priemHeaderTable.filter((header,key)=>{
					if (this.state.filterMap.has(key))
					{
						const dataFilter=this.state.filterMap.get(key)
						if (dataFilter.length==0) return true
						dataExists=dataFilter.findIndex((row,index)=>row.name===value[header['key']])
						return dataExists>-1
					}
					return true
				})
				return dataExists.length==this.props.priemHeaderTable.length
		})
		return filterValues.map((row,index)=>{
			const priemCell= this.props.priemHeaderTable.map((header,key)=>{
				if (header.component){
					return this.renderActionElement(header,row,index,key)
				}
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}>{row[header['key']]}</TableRowColumn>)
			})
			return (<TableRow key={`Column ${index}`}>{priemCell}</TableRow>)
		})
	}
	renderTableHeaderRow()
	{
		let headerTable=this.props.priemHeaderTable.map((header,index)=>
				<TableHeaderColumn key={`Header ${index}`}>{header.name}</TableHeaderColumn>)
		return (<TableRow key={`MainHeader`}>{headerTable}</TableRow>);
	}
	render()
	{
		return ( 

			<Table>
			    <TableHeader adjustForCheckbox={false} enableSelectAll={false} displaySelectAll={false}>
				   
				    {this.state.headerTableRow}
				   
			     </TableHeader>

			      <TableBody displayRowCheckbox={false} adjustForCheckbox={false} > 
			     	
				      	{this.state.searchTableRow}
				       	{this.renderDataTable()}
			      
			      </TableBody>
			</Table>)
	}
}