import AvatarEditor from 'react-avatar-editor'

import React from 'react';
import Subheader from 'material-ui/Subheader';

export default class PriemImageComponent extends React.Component{

	constructor(props)
	{
		super(props)
		this.state={
			state:1.0,
			rotate:0,
		}
	}
	rotateLeft(e){
	    e.preventDefault()
	    this.setState({
	      rotate: this.state.rotate - 90
	    })
	 }

  	rotateRight(e){
	    e.preventDefault()
	    this.setState({
	      rotate: this.state.rotate + 90
	    })
  	}
  	handleScale(e){
	    const scale = parseFloat(e.target.value)
	    this.setState({ scale })
  	}
	render()
	{
		return (
				<div style={this.props.styleComponent}>
				 <div style={{display:'flex'}}>
				        <Subheader style={{textAlign:'center',margin:0,paddingLeft:0}}>Повернуть:
					        <button onClick={this.rotateLeft.bind(this)}>Влево</button>
					        <button onClick={this.rotateRight.bind(this)}>Вправо</button>
				         </Subheader>
				         <Subheader style={{textAlign:'center',margin:0,paddingLeft:0}}> 
				         Увеличить:<input
					          name="scale"
					          type="range"
					          onChange={this.handleScale.bind(this)}
					          min="1"
					          max="10"
					          step="1"
					          defaultValue="1"/></Subheader>
				  </div>
	      		 <AvatarEditor 
				        image={this.props.image}
				        width={window.innerWidth/2.2}
				        height={window.innerHeight/2.2}
				        color={this.props.color} // RGBA
				        scale={this.state.scale}
				        rotate={this.state.rotate}/>
				     
				 </div> )
	}

}  
PriemImageComponent.defaultProps=
{
	image:"/dev-bin/priem_get_document?id=29374",
	color:[255, 255, 255, 0.6],
	styleComponent:{
		selfAlign:'center',
		width: window.innerWidth/2.2+"px",
	    height: window.innerHeight/2.2+"px",
		position:'fixed'}
}