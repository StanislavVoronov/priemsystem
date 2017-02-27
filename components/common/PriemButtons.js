import React, { PureComponent } from 'react';


import FlatButton from 'material-ui/FlatButton';

export default class Buttons extends PureComponent {



	render()
	{
		const styleButton=Object.assign({},this.props.defaultButtonStyle,this.props.buttonStyle)
		const styleLabel=Object.assign({},this.props.defaultLabelStyle,this.props.labelStyle)
		switch (this.props.type)
		{
			case "delete":
			{
				return(<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={styleLabel}
					primary={this.props.primary}
					secondary={this.props.secondary}
					backgroundColor={'#ff0000'}
					hoverColor={'#ff6666'}
					icon={this.props.icon}
					onTouchTap={this.props.onTouchTap ? this.props.onClick : ()=>{}}
					onClick={this.props.onClick}
					style={styleButton} />)
			}
			case "save":
			{
				return (<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={styleLabel}
					primary={this.props.primary}
					hoverColor={'#00bcd4'}
					icon={this.props.icon}
					secondary={this.props.secondary}
					onClick={this.props.onClick}
					onTouchTap={this.props.onTouchTap ? this.props.onClick : ()=>{}}
					backgroundColor={'#2574f4'}
					style={styleButton} />)
			}
			case "add":
			{
				return (<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={styleLabel}
					primary={this.props.primary}
					hoverColor={'#00cc00'}
					icon={this.props.icon}
					secondary={this.props.secondary}
					onClick={this.props.onClick}
					onTouchTap={this.props.onTouchTap ? this.props.onClick : ()=>{}}
					backgroundColor={'#009900'}
					style={styleButton} />)
			}
			default: 
				return (<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={styleLabel}
					primary={this.props.primary}
					hoverColor={this.props.hoverColor}
					icon={this.props.icon}
					secondary={this.props.secondary}
					onClick={this.props.onClick}
					onTouchTap={this.props.onTouchTap ? this.props.onClick : ()=>{}}
					backgroundColor={this.props.backgroundColor}
					style={styleButton} />)


		}

	}

}
Buttons.defaultProps=
{
	backgroundColor:'#4286f4',
	defaultButtonStyle:{	'width':'auto',
							'height':'25px',
		     				'lineHeight':'25px'
     			},
	hoverColor:'',
	onTouchTap:true,
	disabled:false,
	defaultLabelStyle:{'color':'#ffffff','fontSize':'12px'},
	primary:false,
	secondary:false
}