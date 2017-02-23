import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';



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
    setRequestPerformer,
    updateFileList} from '../actions'
import {connect} from "react-redux"
import UserWorkRoom from '../common/UserWorkRoom'
import AddNewDocFile from '../common/AddNewDocFile'
class PriemNewRequest extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
          finished: false,
          stepIndex: 0,
     }
  }
  componentWillMount()
  {
      if (!this.props.docsNeedScans)    this.props.updateDocNeedScans()
      if (!this.props.docTypeList)      this.props.updateDocTypeList()
      this.props.getUserUploadImage()
  }

  handleNext (){
    const {stepIndex} = this.state;
     if (stepIndex >=2 )
     {
       this.props.sendNewPriemRequestForServer()
     }
     if (stepIndex==1)
     {
        this.props.getUserWorkRoom();
     }
     this.setState({
        stepIndex: stepIndex >= 2 ? 0 : stepIndex+ 1,
      })

     
  };

  handlePrev (){
    const {stepIndex} = this.state;

    this.setState({
        stepIndex: stepIndex - 1,
    })
  };

  getStepContent(stepIndex) {
   
    switch (stepIndex) {
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
        return (
           <UserWorkRoom onSelectPerformer={this.props.setRequestPerformer} userWorkRoom={this.props.userWorkRoom}/>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  renderContent() {
      const {finished, stepIndex} = this.state;
      const contentStyle = {margin: '0 16px', overflow: 'hidden'};
    return (
      <div>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12,'display':'flex', 'justifyContent': 'flex-end'}}>
                                     {stepIndex!=0 && <FlatButton
                                          label="Назад"
                                          onTouchTap={this.handlePrev.bind(this)}
                                          style={{marginRight: 12}} />}
                                        <RaisedButton
                                          disabled={!this.props.typeRequest}
                                          label={stepIndex === 2 ? 'Создать новый запрос' : 'Готово'}
                                          backgroundColor={'#86b2f9'}
                                          labelColor={'#ffffff'}
                                          onTouchTap={this.handleNext.bind(this)}/>
                                  </div>
      </div>
    );
  }

  render() {
    const { stepIndex} = this.state;
    console.log(this.props)
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Выбор типа запроса</StepLabel>
          </Step>
          <Step>
            <StepLabel>Добавление документов абитуриента</StepLabel>
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
        docTypeList:state.directories.subTypesDocList,
        DocFileList:state.PriemAddNewRequest.DocFileList,
        userWorkRoom: state.PriemAddNewRequest.userWorkRoom,
        typeRequest: state.PriemAddNewRequest.typeRequest,
        requestPerformer:state.PriemAddNewRequest.requestPerformer,
        infoUser:state.PriemUser
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
      getUserUploadImage: action          => dispatch(getUserUploadImage(action)), 
      addNewFileToServer: action          =>dispatch(addNewFileToServer(action)),
      updateFileItemStatus:(action,status)=>dispatch(updateFileItemStatus(action,status)),
      updateFileItemType:(index,typeDoc)  => dispatch(updateFileItemType(index,typeDoc)),
      updateDocNeedScans:(action)         =>dispatch(updateDocNeedScans(action)),
      updateDocTypeList:(action)          => dispatch(updateDocTypeList(action)),
      updateFileList:(action)             => dispatch(updateFileList(action)),
      getUserWorkRoom:(action)            => dispatch(getUserWorkRoom([])),
      deleteImageFile:(action)            => dispatch(deleteImageFile(action)),
      setRequestPerformer:(performer)     => dispatch(setRequestPerformer(performer)),
      updateTypeRequest: (typeRequest)    => dispatch(setNewTypeRequest(typeRequest)),
      sendNewPriemRequestForServer:(newRequest)    => dispatch(sendNewPriemRequestForServer(newRequest))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriemNewRequest)