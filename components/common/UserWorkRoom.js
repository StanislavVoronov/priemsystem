import React,{PureComponent} from 'react'
import {Styles} from "../common/StylePriem"


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Loader from 'react-loader';


export default class UserWorkRoom extends PureComponent{
	
	renderUserContent()
	{
		
		if (this.props.userWorkRoom && this.props.userWorkRoom.length>0)
		{ 
		  return this.props.userWorkRoom.map((user,index)=>
			
			<TableRow key={`Row ${index}`}>
				<TableRowColumn key={`Name ${index}`}>{user.name}</TableRowColumn>
                <TableRowColumn key={`Department ${index}`}>{user.department}</TableRowColumn>
                <TableRowColumn key={`WorkSpace ${index}`}>{user.workSpace}</TableRowColumn>
                <TableRowColumn key={`Done ${index}`}>{user.done}</TableRowColumn>
                <TableRowColumn key={`InProgress ${index}`}>{user.inProgress}</TableRowColumn>
            </TableRow> 	
			)
 		}
	}
	selectRequestPerformer(key)
	{
		this.props.onSelectPerformer(this.props.userWorkRoom[key])
	}
	render()
	{

		return (   
		     
			<Table 	onCellClick={this.selectRequestPerformer.bind(this)}>

			    <TableHeader adjustForCheckbox={true} enableSelectAll={false} displaySelectAll={false}>
			     <TableRow>
			      
	              <TableHeaderColumn >ФИО методиста</TableHeaderColumn>
			      <TableHeaderColumn >Институт</TableHeaderColumn>
			      <TableHeaderColumn >Расположение</TableHeaderColumn>
			      <TableHeaderColumn >Кол-во запросов в работе</TableHeaderColumn>
			      <TableHeaderColumn >Кол-во запросов обработано</TableHeaderColumn>
			       
			      </TableRow>
			    </TableHeader>
			      <TableBody>
			       	{this.renderUserContent()}
			      </TableBody>
	     	</Table>)
	}
}
UserWorkRoom.propTypes={
	usersList:React.PropTypes.array,
	onSelectPerformer:React.PropTypes.func 	
}
UserWorkRoom.defaultProps={
	usersList:[],
	onSelectPerformer:()=>{}
}