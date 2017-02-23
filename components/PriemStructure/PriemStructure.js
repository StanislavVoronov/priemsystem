import React, { PureComponent } from "react";
import Divider from 'material-ui/Divider';
import Select from "../common/multiSelect";
import TextField from "react-md/lib/TextFields";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import { List, ListItem } from "react-md/lib/Lists";
import Subheader from "react-md/lib/Subheaders";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "react-md/lib/FontIcons";
import networkService from "../common/networkService";
import Snackbar from "react-md/lib/Snackbars";
import Checkbox from "material-ui/Checkbox";
import PriemAdd from "material-ui/svg-icons/av/playlist-add"
import {Styles} from "../common/StylePriem"
import {connect} from "react-redux"

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class StructurePK extends PureComponent{


    constructor(props)
    {
        super(props)
        this.state={status:[],example:"",
                    autohide:true,
                    expanded:true,
                    InfoAdm:[],
                    tableAdm:[],
                    admList:[],
                    examCard:[],
                    viewExamCard:[],
                    isKrim:0
                };
    }

    setTableInfo(data)
    {
        const mapFilial=new Map();
        const infoTable=[], {filList,dirList,educList,finList,InfoAdm}=this.props.priemStructure;
        let arrInfoAdm=[];
        let ArrDirObject=[];
        this.setState({_wavesFirst:[],_wavesSecond:[]});
        if (filList && filList.length>0 && educList && educList.length>0 && finList && finList.length>0 && dirList && dirList.length>0)
        {   
            filList.filter(fil=> mapFilial.has(fil.idFilial) ? "" : mapFilial.set(fil.idFilial,fil.nameFilial));
            filList.map(fil=>{
                dirList.map(dir=>
                {
                    let ArrEducFinObject=[]
                    educList.map(educ=>
                    {
                        
                       finList.map(fin=>
                        {
                            let component=[]
                            let wavesArr=[]
                            let objInfoAdm={
                                key:arrInfoAdm.length,
                                filial:fil.idFilial,
                                inst:fil.id,
                                dir:dir.id,
                                educ:educ.id,
                                fin:fin.id,
                                count: InfoAdm[arrInfoAdm.length] ? InfoAdm[arrInfoAdm.length].count : 0,
                                waveFirst:InfoAdm[arrInfoAdm.length] ? InfoAdm[arrInfoAdm.length].waveFirst : 0,
                                waveSecond:InfoAdm[arrInfoAdm.length] ? InfoAdm[arrInfoAdm.length].waveSecond : 0,
                                cost:0,
                                duration:0
                            }   
                            const waveFirst=<TextField id={this.state._wavesFirst.length} ref={value=>{ if(value) this.state._wavesFirst.push(value)}}    
                            onChange={(object,text)=>{this.props.getChanged({type:"WaveFirst",
                                                                                   data:{key:object.target.id,waveFirst}
                                                                                  })}} 
                             key={`FirstWave: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`} 
                                                                label="1 волна зачисления"
                                                                type="number"
                                                                min="1"/>
                            const waveSecond=<TextField id={arrInfoAdm.length} ref={value=>{ if(value) this.state._wavesSecond.push(value)}}    
                            onChange={(object,text)=>{  this.props.getChanged({type:"WaveSecond",
                                                                                   data:{key:object.target.id,waveSecond}
                                                                                  })}} 
                             key={`SecondWave: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`} 
                                                                label="2 волна зачисления"
                                                                type="number"
                                                                min="1"/>
                            const infoADM=
                            {
                                key:arrInfoAdm.length,
                                pay:fin.id
                            }
                            component.push(<TextField  id={JSON.stringify(infoADM)} onBlur={(object)=> {
                                                            const count=parseInt(object.target.value);
                                                            const {key,pay}=JSON.parse(object.target.id);
                                                            console.log(object.target.id)
                                                            this.props.getChanged({type:"Count",
                                                                                   data:{key,count}
                                                                                  })
                                                            let waveFirst=pay!=15 ? parseInt(count*80/100) : count;
                                                            let waveSecond=count-waveFirst;
                                                            let fieldFirstWave=this.state._wavesFirst[key];
                                                            let fieldSecondWave=this.state._wavesSecond[key];
                                                            fieldFirstWave.setState({value:waveFirst});
                                                            fieldSecondWave.setState({value:waveSecond});
                                                            
                                                            this.props.getChanged({type:"WaveFirst",
                                                                                   data:{key,waveFirst}
                                                                                  })
                                                            this.props.getChanged({type:"WaveSecond",
                                                                                   data:{key,waveSecond}
                                                                                  })
                                                        }
                                                    }
                                key={`Count:${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`}
                                                                label="Количество мест (чел.)"
                                                                type="number"
                                                                min="1"
                                                                required />)
                             component.push(waveFirst)  
                             component.push(waveSecond)
                            if (fin.id==15)
                            {
                                component.push(<br key={`HR: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`}/>)
                                component.push(<TextField onBlur={object=>{ this.props.getChanged({type:"Cost",data:{key:objInfoAdm.key,cost:parseFloat(object.target.value)|| 0}})}} 
                                key={`Pay: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`}
                                                                label="Стоимость обучения (руб.)"
                                                                type="number"
                                                                size={30}
                                                                min="1"
                                                                required />)
                                component.push(<TextField onBlur={object=>{ this.props.getChanged({type:"Duration",data:{key:objInfoAdm.key,
                                    duration:parseFloat(object.target.value)|| 0}})}} key={`Time: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}
                                    -${educ.id}-${objInfoAdm.key}`}
                                                                label="Срок обучения (сем.)"
                                                                type="number"
                                                                min="1"
                                                                required />)
                            }
                            arrInfoAdm.push(objInfoAdm);
                            ArrEducFinObject.push(
                                    <CardText expandable key={`EducFin: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`}>
                                             <CardTitle key={`Title: ${fil.idFilial}-${fil.id}-${dir.id}-${fin.id}-${educ.id}-${objInfoAdm.key}`}
                                                title="Форма обучения/финансирования:&nbsp;" subtitle={`${educ.name}/${fin.name}`}
                                            />
                                            {component}
                                    </CardText>
                                )
                        })
                    })
                   ArrDirObject.push(<CardText expandable key={`Dir: ${fil.idFilial}-${fil.id}-${dir.id}-${ArrDirObject.length}`}>
                   <List key={`List: ${fil.idFilial}-${fil.id}-${dir.id}-${ArrDirObject.length}`} className="example-list">
                   <CardTitle key={`TitleDir: ${fil.idFilial}-${fil.id}-${dir.id}-${ArrDirObject.length}`}
                                                 title="Направление подготовки:&nbsp;" subtitle={dir.name}
                                            />
                   {ArrEducFinObject}</List></CardText>)
                })
                infoTable.push(<Card className="media-card" key={`Filial: ${fil.idFilial}-${fil.id}-${infoTable.length}`} initiallyExpanded>  
                                        <CardActions key={`FilialAction: ${fil.idFilial}-${fil.id}-${infoTable.length}`} isExpander>
                                            <CardTitle key={`TitleFilial: ${fil.idFilial}-${fil.id}-${infoTable.length}`}
                                                 title="Региональный институт:&nbsp;" subtitle={fil.name}
                                            />
                                        </CardActions>
                                        {ArrDirObject}
                                        <Divider key={`FilialDivider: ${fil.id}`}/>
                                    </Card>
                           )
            })
            
      }
      this.props.getChanged({type:"InfoAdm",data:arrInfoAdm});
      this.setState({tableAdm:infoTable});
        
    }
    addNewGroup()
    {
        const {filList,dirList,profList}=this.props;
        const examListArr=structure.ExamList ? structure.ExamList :  []
        const infoAdmArr=structure.InfoAdm ? structure.InfoAdm : []
        let errList=+(examListArr.length==0 || infoAdmArr.length==0 || examListArr.some(exam=> {return exam.setExam==0}) || infoAdmArr.some(info=>{ return info.count==0}))
        let statusClass="errorMsg";
        let text="Ошибка добавления. Проверьте заполнение обязательных полей!" 
     
        const status = [];
        if (errList==0)
        {
            statusClass="successMsg";
            text="Запрос на добавление конкурсных групп обрабатывается";
            networkService("addNewGroup",{examListArr,infoAdmArr},null,"POST");
        }
        status.push({
                    class:statusClass,
                    key: Date.now(),
                    text,
                    null,
        });
        this.setState({ status, autohide:true });
    }
    _dismissToast()
    {
        this.setState({status:[]});   
    }

    
    setCardExams()
    {
            const mapFilial=new Map();
            const selectedExam=this.props.priemStructure.examList
            
            const examCard=[],{filList,dirList,profList,isKrim,examList}=this.props.priemStructure
            let listExam=[];
            if (filList && filList.length>0  && dirList && dirList.length>0 && profList &&  profList.length>0 )
            {

               filList.filter((fil)=> mapFilial.has(fil.idFilial) ? "" : mapFilial.set(fil.idFilial,fil.nameFilial));
               
                for(let fil of mapFilial.keys()) {
                    const examRowTable=[];
                    
                    
                    dirList.map((dir)=>{
                        profList.map((prof)=>
                        {
                            
                            const defaultExamSet=selectedExam.find(setExam=> setExam.key==listExam.length)
                            const examSet=
                            {
                                key:listExam.length,
                                filial:fil,
                                examSet:defaultExamSet ? defaultExamSet.examSet : -1,
                                dir:dir.id,
                                prof:prof.id,
                                isKrim:this.state.isKrim
                            }
                            listExam.push(examSet)
                            examRowTable.push(
                                <CardText style={{padding:5}} key={`DirTitle ${fil}-${dir.id}-${prof.id}`}  expandable={true}>
                                Направление подготовки:<b>{dir.name} </b> </CardText>)
                            examRowTable.push(<CardText style={{padding:5}} key={`ProfTitle ${fil}-${dir.id}-${prof.id}`}  expandable={true}>
                                Профиль: <b>{prof.name}</b> </CardText>)
                            examRowTable.push(<CardText style={{padding:5}}  key={`ExamTitle ${fil}-${dir.id}-${prof.id}`} expandable={true}>
                                <Select styleTitle={{fontSize:'auto',color:'black'}} divider={false} 
                                flexDirection={'row'} title={"Набор экзаменов: "} placeholder="Не определен"
                                key={`Exam ${fil}-${dir.id}-${prof.id}`} service="ExamList" serviceAttr={examSet} filter="contains" 
                                    onChange={data=>{ this.props.getChanged({type:"setExam",data})}}/> </CardText>)
                            examRowTable.push(<Divider  key={`examHR ${fil}-${dir.id}-${prof.id}`}  style={Styles.hr}/>)
                        })
                    })
                    
                    examCard.push(<Card expanded={true} expandable={true} key={`FilialExam ${fil}`} >
                            <CardHeader  style={{paddingTop:8,paddingBottom:8}}  titleStyle={{color:'rgb(0, 162, 183)',fontSize:16}} key={`ExamFilTitle ${fil}`} title={mapFilial.get(fil)} subtitle="Вступительные экзамены" />{examRowTable}</Card>)
                    
                }
               
            }

            this.props.getChanged({type:'examList',data:listExam})
            this.setState({examCard})
            

    }
  render() {
    const {examCard,isKrim,needDoc,tableAdm,status,autohide}=this.state, titleButton=`Добавить в план \"Прием-${new Date().getFullYear()}\"`
 
    return (
    <div>
     
      <Select  multi="1" id="FilialList" title="Институты" service="Filial"  
      onChange={data=>{ 
        const viewExamCard=this.state.viewExamCard
        data.map(fil=> viewExamCard[fil.idFilial]=viewExamCard[fil.idFilial] ? viewExamCard[fil.idFilial] : true)
        this.setState({viewExamCard})
        this.setCardExams(this.props.getChanged({type:'Filial',data}))}
      }/>
      
      <Select  multi="1" title="Направления подготовки" service="Dir"  
      onChange={data=>this.setCardExams(this.props.getChanged({type:'Dir',data}))}/>
      
      <Select  multi="1" title="Профили" service="Prof" onChange={data=>this.setCardExams(this.props.getChanged({type:'Prof',data}))} /> 

      <Checkbox  label="Необходима справка №086у"  onChange={data=> this.props.getChanged({type:"DocList",data:+data})}/>
      <Divider style={Styles.hr}/>
      <Checkbox  label="Конкурсные группы для жителей Крыма" 
      onChange={data=>{ this.setState({isKrim:+data});this.props.getChanged({type:"Krim",data:+data})}} />
      <Divider style={Styles.hr}/>
       {examCard}
      <Divider style={Styles.hr}/>
      <Select  service="formEduc" multi="1" title="Формы обучения" onChange={data=>this.setTableInfo(this.props.getChanged({type:"Educ",data}))}  filter="contains" />
      <Select  service="formFin" multi="1" title="Формы финансирования" onChange={data=>this.setTableInfo(this.props.getChanged({type:"Fin",data}))}  filter="contains"/>
      {tableAdm}
   <RaisedButton
      label={titleButton}
     
      primary={true}
      icon={<PriemAdd />}
      onClick={this.addNewGroup.bind(this)} 
      style={Styles.centerBox}
      buttonStyle={Styles.widthAuto}
    />
    <Snackbar
          toasts={status}
          className={status[0] && status[0]["class"] }
          onDismiss={this._dismissToast.bind(this)}
          autohide={autohide} />
    </div>)
  }
}
const mapStateToProps=(state,ownProps)=>
{
 
  return {
        priemStructure:state.PriemStructure
    }
}
const mapDispatchToProps=(dispatch) => {
      
        return {
            getChanged: (action) => {  dispatch(action) }
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(StructurePK)