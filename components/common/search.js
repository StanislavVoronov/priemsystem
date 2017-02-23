import React, { PureComponent } from 'react';


import AutoComplete from 'material-ui/AutoComplete';

const dataSourceConfig = {
  text: 'folder',
  value: 'fullName',
};

export default class SearchPeople extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      data:null,
      value:'',
      disabled:true,
    };    
    let formdata=new FormData();
    if (!localStorage["operator"]) {return false}
    
    formdata.append("SEARCH_LIST",1);
    fetch(path,{
        method:'POST',
        credentials:'same-origin',
        header:
        {
            "Accept":"text/plain;charset='UTF-8'",
            "Content-Type":"multipart/formdata"
        },
        body:formdata
    }).then((response)=>
    {
       return response.json();
    }).then((data)=>{
        
        this.setState({data:data,disabled:false})
    });
  }
  _changeText(text)
  {
     let dataSource=[];
     if (!Number.isInteger(+text) && text.length>4)
     {
        dataSource=this.state.data["fullName"].filter((value)=>
        {
           return value.includes(text);
        })
       this.setState({dataSource:dataSource});
     }
     else if (Number.isInteger(+text))
     {
       let key;
       this.state.data["folder"].find((value,index)=> { if (+value == +text) return key=index});
       if (key)
       {
            dataSource.push(this.state.data["fullName"][key]);
            this.setState({dataSource:dataSource});
       }
     }
     this.setState({value:text}); 
     
  }
  _resetValue()
  {
    this.setState({dataSource:[],value:''});
  }

  

  render() {
    const { filterType,dataSource,value } = this.state;
    return (
      <AutoComplete
            floatingLabelText ='1111'
            
            openOnFocus={true}
            dataSource={dataSource}
      />
       
    );
  }
}

