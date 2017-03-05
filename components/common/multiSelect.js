import React, { PureComponent } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';




import Divider from 'material-ui/Divider';

import {Styles} from './StylePriem'
export default class Select extends PureComponent{

  constructor(props)
  {
    super(props)
    this.state={selected:null}
  }
  get selected()
  {
    if (this.props.clean) return null
    if (this.props.selected) return this.props.selected
    return this.state.selected
  }
  render() {
  const  {data,title,multiSelect,filter,styleTitle,placeholder,styleHR,flexDirection} = this.props
  const elementSelect=multiSelect ? <Multiselect 
      valueField='id' textField='name'
      data={data}
      placeholder={placeholder}
      value={this.selected}
      onChange={value=> {
          this.setState({selected:value})
          this.props.onChange(value) 
      }}  
    />
    : <DropdownList placeholder={placeholder ? placeholder : `Выберите ${title}`} 
    value={this.selected} 
    caseSensitive={false}
    filter={filter}
    busy={this.props.data && this.props.data.length>0 ? false : true}
    onChange={value=> {
      this.props.onChange(value)
    }} valueField='id' textField='name'  data={data} />
    let defaultStyleTitle= {'display':'none'}
    if (title)
    {
       defaultStyleTitle = styleTitle ? Object.assign(styleTitle,{'flexDirection':flexDirection}) : Styles.spanTitleSelect
    }
    return (
    <div style={Styles.selectClass}>
      <div style={defaultStyleTitle}>{title}</div>
      <div style={this.props.styleSelectContainer}>{elementSelect}</div>
      {this.props.divider ? <Divider style={Object.assign(Styles.hr,styleHR)}/> : null}
     </div>
    )
  }
}
Select.defaultProps={
  data:[],
  selected:undefined,
  clean:false,
  title:'',
  styleSelectContainer:{'width':'100%'},
  placeholder:false,
  multiSelect:false,
  filter:'contains',
  onChange:()=>{},
  serviceAttr:[],
  divider:true,
  styleHR:{},
  placeholder:false,
  flexDirection:'column',
  styleSelect:{},
  flexDirection:'column',
  styleTitle:null,
  styleHR:{},
}