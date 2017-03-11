
import React,{PureComponent} from 'react'
import {Styles} from "../common/StylePriem"


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import PriemTableView from '../common/PriemTableView'




export default class PriemUserRequestList extends PureComponent{
	setHeaderTable()
	{
		return [
			{
				name:'Тип запроса',
				key:'type',
				placeholder: 'типу запроса',
				isSearch:true,
			},
			{
				name:'Дата создания',
				key:'created'
			},{
				component:true,
				typeClass:'save',
				name:'Действие',
				type:'button',
				title:'Обработать'
			}]
	}
	onSelectRequest(priemUser)
	{
		//this.props.onSelectPerformer(priemUser)
	}
	render()
	{
	
		if (!this.props.userListRequests) return null
		return ( <PriemTableView 
					onAction={this.onSelectRequest.bind(this)} 
					priemHeaderTable={this.setHeaderTable()} 
					priemDataTable={this.props.userListRequests}/>)		
	}
}
