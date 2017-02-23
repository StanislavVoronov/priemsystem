import React, { PureComponent } from 'react';


import FlatButton from 'material-ui/FlatButton';

export default class Buttons extends PureComponent {



	render()
	{
		
		switch (this.props.type)
		{
			case "delete":
			{
				return(<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={this.props.labelStyle}
					primary={this.props.primary}
					secondary={this.props.secondary}
					backgroundColor={'#ff0000'}
					hoverColor={'#ff6666'}
					icon={this.props.icon}
					onTouchTap={this.props.onClick}
					style={this.props.buttonStyle} />)
			}
			case "save":
			{
				return (<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					labelStyle={this.props.labelStyle}
					primary={this.props.primary}
					hoverColor={'#00bcd4'}
					icon={this.props.icon}
					secondary={this.props.secondary}
					onTouchTap={this.props.onClick}
					backgroundColor={'#2574f4'}
					style={this.props.buttonStyle} />)
			}
			default: 
				return (<FlatButton
					disabled={this.props.disabled}
					label={this.props.label}
					primary={this.props.primary}
					hoverColor={this.props.hoverColor}
					icon={this.props.icon}
					secondary={this.props.secondary}
					onTouchTap={this.props.onClick}
					backgroundColor={this.props.backgroundColor}
					style={this.props.buttonStyle} />)


		}

	}

}
Buttons.defaultProps=
{
	backgroundColor:'#4286f4',
	buttonStyle:{	'width':'auto',
					'height':'25px',
     				'lineHeight':'25px'
     			},
	hoverColor:'',
	disabled:false,
	labelStyle:{'color':'#ffffff','fontSize':'12px'},
	primary:false,
	secondary:false
}