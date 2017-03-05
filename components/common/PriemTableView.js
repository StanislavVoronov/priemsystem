import React, { PureComponent, PropTypes } from 'react';


import Select from "../common/multiSelect";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Styles} from "../common/StylePriem"
const priemHeaderTable=[
{
	name:'ФИО',
	isSearch:false,
},
{
	name:'Номер телефона',
	isSearch:true,
},
{
	name:'Кол-во заявлений',
	isSearch:false,
},
{
	name:'Адрес',
	isSearch:false,
}
]
const priemDataTable=[
{
	0:'Воронов0 Станислав Игоревич',
	1:1444,
	2: 'Russia',
	3:1
},
{
	0:'Воронов1 Станислав Игоревич',
	1:1111,
	2: 'Russia',
	3:2
},
{
	0:'Воронов2 Станислав Игоревич',
	1:1234,
	2: 'Russia',
	3:3
},
{
	0:'Воронов3 Станислав Игоревич',
	1:1111,
	2: 'Russia',
	3:5
},
]
export default class TableView extends PureComponent{

	setSearchText(index)
	{

	}
	getSearchField(selectField)
	{

		const priemSearchRows=selectField.map((searchRow,index)=>{
			
			if (searchRow.length>0)
			{
				return (<TableRowColumn style={Styles.OverflowVisible} key={`SearchCell ${index}`}>
							<Select placeholder={"Фильтр по полю"} multiSelect={true}  data={searchRow} styleSelectContainer={{'width':'100%'}}
		                  		filter='startsWith' divider={false} onChange={this.setSearchText.bind(this,index)}/>
						</TableRowColumn>)
			}
			else 
			{
				return (<TableRowColumn key={`SearchCell ${index}`}>
						</TableRowColumn>)
			}
		})
		console.log("priemSearchRows",priemSearchRows)
		return (<TableRow style={Styles.OverflowVisible} key={`SearchRow`}>{priemSearchRows}</TableRow>)

	}
	renderDataTable()
	{
		let selectField=[]
		const priemRows=priemDataTable.map((row,index)=>
		{
			let priemCell= priemHeaderTable.map((search,key)=>{
				if (!selectField[key]) selectField[key]=[]
				if (search.isSearch==true)
				{
					selectField[key].push({id:index,name:row[key]})
				}
				return (<TableRowColumn key={`RowTable ${index} - ${key}`}>{row[index]}</TableRowColumn>)
			})
			return (<TableRow key={`Column ${index}`}>{priemCell}</TableRow>)
		})
		priemRows.unshift(this.getSearchField(selectField))
		return priemRows
	}
	renderHeaderTable()
	{
		return priemHeaderTable.map((header,index)=>
				<TableRowColumn key={`Header ${index}`}>{header.name}</TableRowColumn>)
	}
	render()
	{

		return (   
			<Table>
			    <TableHeader adjustForCheckbox={true} enableSelectAll={false} displaySelectAll={false}>
				    <TableRow>
				    		{this.renderHeaderTable()}
				    </TableRow>
			     </TableHeader>
			      <TableBody displayRowCheckbox={false}>
			       	{this.renderDataTable()}
			      </TableBody>
			</Table>)
	}
}