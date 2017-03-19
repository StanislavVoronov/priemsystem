import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';


import {Styles} from '../common/StylePriem'
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Select from "../common/multiSelect";
import {
    updateDocTypeList,
    updateFileItemType,
    addNewFileToServer,
    deleteImageFile,
    updateFileItemStatus,
    updateDocNeedScans,
    getUserWorkRoom,
    getUserUploadImage,
    setNewTypeRequest,
    sendNewPriemRequestForServer,
    setDefaultStateNewRequest,
    setRequestPerformer,
    setStateNewRequest,
    updateFileList} from '../actions'
import {connect} from "react-redux"
import UserWorkRoom from '../common/UserWorkRoom'
import AddNewDocFile from '../common/AddNewDocFile'
class PriemNewRequest extends React.Component {

  componentWillMount()
  {
      if ( !(this.props.docsNeedScans && this.props.docsNeedScans.length>0)) this.props.updateDocNeedScans();
      if ( !(this.props.docTypeList && this.props.docTypeList.length>0)) this.props.updateDocTypeList();
      if (this.props.priemUser.typeOperator!=2)  this.props.setRequestPerformer(this.props.priemUser)
      //this.props.getUserUploadImage();
  }

  handleNext (){
    let {stepIndex,finished} = this.props.projectStates;

     if (stepIndex ==3) {
        finished=false;
        stepIndex=0
     } else if (stepIndex==2) {
        finished=true;
        stepIndex+=1
        this.props.sendNewPriemRequestForServer()
     }
     else if (stepIndex==1 ) {
        this.props.priemUser.typeOperator==2 && this.props.getUserWorkRoom();
        stepIndex+=1
     } else {
        stepIndex+=1;
     }
     this.props.setStateNewRequest(stepIndex,finished) 
  };

  handlePrev (stepIndex){
     this.props.setStateNewRequest(stepIndex-1,false) 
  };

  getStepContent(stepIndex) {
   
    switch(stepIndex) {
      case 0:
        return (
          <Select  selected={this.props.typeRequest} filter={false} title='Тип запроса' onChange={this.props.updateTypeRequest} placeholder='Выберите тип нового запроса' data={this.props.docsNeedScans} />
        );
      case 1:
        return (  <AddNewDocFile updateFileItemStatus={this.props.updateFileItemStatus}
                                 addNewFileToServer={this.props.addNewFileToServer} DocFileList={this.props.DocFileList} 
                                 updateFileItemType={this.props.updateFileItemType} 
                                 deleteImageFile={this.props.deleteImageFile} 
                                 docTypeList={this.props.docTypeList} 
                                 updateFileList={this.props.updateFileList} />

        );
      case 2:
        
        if (this.props.priemUser.typeOperator==2){
            return (
               <UserWorkRoom stateSystem={this.props.stateSystem} requestPerformer={this.props.requestPerformer} onSelectPerformerМ={this.props.setRequestPerformer} userWorkRoom={this.props.userWorkRoom}/>
            )
        }else {
           return (<p style={{marginLeft:5}}><p><span style={Styles.boldRed}>Отсутствуют доступные методисты.</span></p>
            <p><span style={{fontWeight:'bold'}}>Для отправки запроса текущему пользователю</span> нажмите <span style={Styles.boldGreen}>«Создать запрос».</span></p></p>)
        }
      case 3:
      {
         return(<p style={{marginLeft:5}}>
                {`<span style={{fontWeight:'bold'}}>Запрос № ${this.props.newNumberRequest} успешно отправлен</span> методисту: ${this.props.requestPerformer.name}`}
                </p>)
      }
      default:
        return '';
    }
  }
  renderLabelButton(stepIndex)
  {
     switch (stepIndex)
     {
        case 0: {
           return "Выбрать тип запроса"
        }
        case 1: {
           return "Добавить документы в запрос"
        }
        case 2:{
           return "Создать запрос"
        }
        case 3:{
           return "Создать новый запрос"
        }
     }

  }
  getNextButtonStatus(stepIndex,DocFileList)
  {
     switch (stepIndex)
     {
       case 0: return !this.props.typeRequest
       case 1: {
            const listDocSelectedFiles=DocFileList.filter(file=> file.selected)
            const listDocTypeSelectedFiles=listDocSelectedFiles.filter(file=> file.typeDoc && file.typeDoc.typeDoc)
            return !(listDocTypeSelectedFiles.length===listDocSelectedFiles.length && listDocSelectedFiles.length>0)
       }
       case 2: {
         return !this.props.requestPerformer
       }

     }
  }
  renderContent() {
      const {finished, stepIndex} = this.props.projectStates,
      contentStyle = {margin: '0 16px', overflow: 'hidden'};
      let titleLabel='';
    return (
      <div>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12,'display':'flex', 'justifyContent': 'flex-end'}}>
                                     {stepIndex>0 && stepIndex < 3 && <FlatButton
                                          label="Назад"
                                          labelStyle={{'fontSize':12}}
                                          onTouchTap={this.handlePrev.bind(this,stepIndex)}
                                          style={{marginRight: 12}} />}
                                        <RaisedButton
                                          disabled={this.getNextButtonStatus(stepIndex,this.props.DocFileList)}
                                          label={this.renderLabelButton(stepIndex)}
                                          backgroundColor={'#2474f5'}
                                          labelStyle={{'fontSize':12}}
                                          labelColor={'#ffffff'}
                                          onTouchTap={this.handleNext.bind(this)}/>
                                  </div>
      </div>
    );
  }

  render() {
    const { stepIndex} = this.props.projectStates;
    console.log(this.props)
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Выбор типа запроса</StepLabel>
          </Step>
          <Step>
            <StepLabel>Добавление документов</StepLabel>
          </Step>
          <Step>
            <StepLabel>Выбор методиста приема</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}

const mapStateToProps=(state)=>
{
  return {
        docsNeedScans: state.directories.docsNeedScansList,
        projectStates: state.projectStates.priemNewRequestState,
        docTypeList:state.directories.subTypesDocList,
        DocFileList:state.PriemAddNewRequest.DocFileList,
        userWorkRoom: state.PriemAddNewRequest.userWorkRoom,
        typeRequest: state.PriemAddNewRequest.typeRequest,
        requestPerformer:state.PriemAddNewRequest.requestPerformer,
        newNumberRequest:state.PriemAddNewRequest.newNumberRequest,
        priemUser: state.PriemAccount.user, 
        stateSystem: state.SystemStatusState  
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
      setDefaultStateNewRequest:()       => dispatch(setDefaultStateNewRequest()),
      setStateNewRequest:(stepIndex,finished)  =>dispatch(setStateNewRequest(stepIndex,finished)),
      getUserUploadImage: action          => dispatch(getUserUploadImage(action)), 
      addNewFileToServer: action          =>dispatch(addNewFileToServer(action)),
      updateFileItemStatus:(action,status)=>dispatch(updateFileItemStatus(action,status)),
      updateFileItemType:(index,typeDoc)  => dispatch(updateFileItemType(index,typeDoc)),
      updateDocNeedScans:(action)         =>dispatch(updateDocNeedScans(action)),
      updateDocTypeList:(action)          => dispatch(updateDocTypeList(action)),
      updateFileList:(action)             => dispatch(updateFileList(action)),
      getUserWorkRoom:(action)            => dispatch(getUserWorkRoom()),
      deleteImageFile:(action)            => dispatch(deleteImageFile(action)),
      setRequestPerformer:(performer)     => dispatch(setRequestPerformer(performer)),
      updateTypeRequest: (typeRequest)    => dispatch(setNewTypeRequest(typeRequest)),
      sendNewPriemRequestForServer:(newRequest)    => dispatch(sendNewPriemRequestForServer(newRequest))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriemNewRequest)