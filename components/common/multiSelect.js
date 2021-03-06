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
  const filterType=filter ? {filter:this.props.filterType} : {}
  const elementSelect=multiSelect ? <Multiselect 
      valueField='id' textField='name'
      data={data}
      caseSensitive={false}
      placeholder={placeholder}
      value={this.selected}
      onChange={value=> {
          this.setState({selected:value})
          this.props.onChange(value) 
      }} />
    : <DropdownList placeholder={placeholder ? placeholder : `Выберите ${title.toLowerCase()}`} 
    value={this.selected} 
    caseSensitive={false}
    {...filterType}
    busy={this.props.data && this.props.data.length>0 ? false : true}
    onChange={value=> {
      this.setState({selected:value})
      this.props.onChange(value)
    }} valueField='id' textField='name'  data={data} />
    let defaultStyleTitle= {'display':'none'}
    if (title)
    {
       defaultStyleTitle = styleTitle ? Object.assign(styleTitle,{'flexDirection':flexDirection}) : Styles.spanTitleSelect
    }
   
    const selectClass=Object.assign({},Styles.selectClass,this.props.selectClass)
    return (
    <div style={selectClass}>
      <div style={defaultStyleTitle}>{title}</div>
      <div style={this.props.styleSelectContainer}>{elementSelect}</div>
      {this.props.required && !this.selected && <div style={Styles.requiredSelectField}>{this.props.requiredTitle}</div>}
      {this.props.divider ? <Divider style={Object.assign(Styles.hr,styleHR)}/> : null}
     </div>
    )
  }
}
Select.defaultProps={
  data:[],
  selectClass:{},
  selected:undefined,
  clean:false,
  title:'',
  styleSelectContainer:{'width':'100%'},
  placeholder:false,
  multiSelect:false,
  filter:false,
  filterType:'contains',
  onChange:()=>{},
  serviceAttr:[],
  divider:true,
  styleHR:{},
  required:false,
  requiredTitle:'Обязательно для заполнения',
  placeholder:false,
  flexDirection:'column',
  styleSelect:{},
  flexDirection:'column',
  styleTitle:null,
  styleHR:{},
}