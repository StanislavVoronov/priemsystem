
import React,{PureComponent} from 'react'
import {Styles} from "../common/StylePriem"


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import PriemTableView from './PriemTableView'

export default class UserWorkRoom extends PureComponent{
	
	setHeaderTable()
	{
		return [
			{
				name:'ФИО методиста',
				key:'name'
			},
			{
				name:'Институт',
				key:'department',
				placeholder: 'институтам',
				isSearch:true,
			},
			{
				name:'Расположение',
				key:'workSpace',
				placeholder: 'расположению',
				isSearch:true,
			},
			{
				name:'Кол-во запросов в работе',
				key:'done'
			},
			{
				name:'Кол-во запросов обработано',
				key:'inProgress'
			},
			{
				component:true,
				name:'Статус',
				type:'radio',
				title:'Выбрать'
			},
		]
	}
	selectRequestPerformer(priemUser)
	{
		this.props.onSelectPerformer(priemUser)
	}
	render()
	{

		return ( <PriemTableView selected={this.props.requestPerformer.id} onAction={this.selectRequestPerformer.bind(this)} priemHeaderTable={this.setHeaderTable()} priemDataTable={this.props.userWorkRoom}/>)		
	}
}
