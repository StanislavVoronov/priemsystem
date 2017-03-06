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

	constructor(props)
	{
		super(props)
		this.state={filterMap:new Map(),headerTable:null}
	}
	setFilterTable(index,value)
	{
		console.log("setFilterTable",value)
		const filterMap=this.state.filterMap
		filterMap.set(index,value)
		this.setState({filterMap:new Map(filterMap)})
	}
	componentWillMount()
	{
		this.setState({headerTable:this.renderHeaderTable()})
	}
	getSearchField()
	{
		
		const priemSearchRows=priemHeaderTable.map((searchRow,index)=>{
			if (searchRow.isSearch==true) {
				const uniqueValues = [...new Set(priemDataTable.map(item => item[index]))];
				const dataSelect=uniqueValues.map((name,id) => new Object({id,name}))
				return (<TableRowColumn style={Styles.OverflowVisible} key={`SearchCell ${index}`}>
							<Select placeholder={"Фильтр по полю"} multiSelect={true}  onChange={this.setFilterTable.bind(this,index)}
								data={dataSelect} styleSelectContainer={{'width':'100%'}}
		                  		filter='startsWith' divider={false} />
						</TableRowColumn>)
			}
			else {
				return (<TableRowColumn key={`SearchCell ${index}`}>
						</TableRowColumn>)
			}
		})
		return (<TableRow style={Styles.OverflowVisible} key={`SearchRow`}>{priemSearchRows}</TableRow>)

	}
	renderDataTable()
	{
		let selectField=[]
		let filterValues=[]
		let dataExists=false
		filterValues=priemDataTable.filter(value=>{
				let dataExists=priemHeaderTable.filter((search,key)=>{
					if (this.state.filterMap.has(key))
					{
						const dataFilter=this.state.filterMap.get(key)
						dataExists=dataFilter.findIndex((row,index)=>row.name===value[key])
						return dataExists>-1
					}
					return true
				})
				return dataExists.length==priemHeaderTable.length
		})
		console.log(filterValues)
		return filterValues.map((row,index)=>{
			const priemCell= priemHeaderTable.map((search,key)=>
				 (<TableRowColumn key={`RowTable ${index} - ${key}`}>{row[key]}</TableRowColumn>))
			return (<TableRow key={`Column ${index}`}>{priemCell}</TableRow>)
		})
	}
	renderHeaderTable()
	{
		let headerTable=priemHeaderTable.map((header,index)=>
				<TableRowColumn key={`Header ${index}`}>{header.name}</TableRowColumn>)
		return [(<TableRow key={`MainHeader`}>{headerTable}</TableRow>),this.getSearchField()];

	}
	render()
	{

		return (   
			<Table>
			    <TableHeader adjustForCheckbox={true} enableSelectAll={false} displaySelectAll={false}>
				   
				    {this.state.headerTable}
				    
			     </TableHeader>
			      <TableBody displayRowCheckbox={false}>
			       	{this.renderDataTable()}
			      </TableBody>
			</Table>)
	}
}