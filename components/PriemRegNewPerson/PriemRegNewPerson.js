import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {connect} from "react-redux"


import {Styles} from '../common/StylePriem'
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RaisedButton from 'material-ui/RaisedButton';
import {updateTabPanelState} from '../actions'
import Loader from 'react-loader';
import {options,validateFields} from "../common/priemGlobals"
import ChevronRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import PriemRegPersonData from './PriemRegPersonData'

export class PriemRegNewPerson extends React.Component{


 componentWillMount()
 {
 	this.props.updateTabPanelState("priemRegNewPerson",{stepIndex:0,finished:false,loading:false,loaded:false})
 }
 handleNext (){
    let {stepIndex,finished} = this.props.projectStates;

     if (stepIndex ==3) {
        finished=false;
        stepIndex=0
     } else if (stepIndex==2) {
        finished=true;
        stepIndex+=1
     }
     else if (stepIndex==1 ) {
       
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
      		return(<PriemRegPersonData />)
      case 1:

      case 2:

      case 3:
      
      default:
        return '';
    }
  }
  renderLabelButton(stepIndex)
  {
     switch (stepIndex)
     {
        case 0: {
           return "контактные данные"
        }
        case 1: {
           return "данные об образовании"
        }
        case 2:{
           return "заявления на поступление"
        }
        case 3:{
           return "дополнительная информация"
        }
     }

  }
  getNextButtonStatus(stepIndex,DocFileList)
  {
     switch (stepIndex)
     {
       case 0: 

       case 1: 

       case 2: 

     }
  }
  simpleTextFunction(a)
  {
    return a
  }
  validateRequiredData(stepIndex)
  {
     if (this.props.newPerson) {
         switch (stepIndex){
            case 0:
            {
              console.log("validateFields",validateFields(this.props.newPerson,"personData"),this.props.newPerson.id_doc,"passportData")
              return !(validateFields(this.props.newPerson,"personData").length==0 
                     && validateFields(this.props.newPerson.id_doc,"passportData").length==0)
            }

         }
     }
  }
  renderContent(stepIndex=0) {

    return (
     <div>
	        <div>{this.getStepContent(stepIndex)}</div>
	        <div style={Styles.stepperRegNewPerson}>
                                     {stepIndex>0 && stepIndex < 3 && <FlatButton
                                          label="Назад"
                                          labelStyle={Styles.fontSizeTwelve}
                                          onTouchTap={this.handlePrev.bind(this,stepIndex)}
                                          style={{marginRight: 12}} />}
                                        <RaisedButton
                                          disabled={this.validateRequiredData(stepIndex)}
                                          label={this.renderLabelButton(stepIndex)}
                                          backgroundColor={'#2474f5'}
                                          labelStyle={Styles.fontSizeTwelve}
                                          labelColor={'#ffffff'}
                                          labelPosition={'before'}
                                          icon={<ChevronRight style={Styles.marginsIconButton}/>}
                                          onTouchTap={this.handleNext.bind(this)}/>
                                  </div>
      </div>
    );
  }
  render() {
  
    const { stepIndex,loading}= new Object(this.props.tabPanelState.get("priemRegNewPerson"))
    return (
       <Loader loaded={!loading} options={options} className="spinner">
        <Stepper activeStep={stepIndex} style={Styles.flexWrap}>
          <Step style={Styles.firstStepMarginLeft}>
            <StepLabel>Персональные данные</StepLabel>
          </Step>
          <Step>
            <StepLabel>Контактные данные</StepLabel>
          </Step>
            <Step>
            <StepLabel>Данные об образовании</StepLabel>
          </Step>
          <Step>
            <StepLabel>Заявления на поступление</StepLabel>
          </Step>
          <Step>
            <StepLabel>Дополнительная информация</StepLabel>
          </Step>
        </Stepper>
        	<Divider style={{marginBottom:10}}/>
	        <ExpandTransition open={true}>
	          	{this.renderContent(stepIndex)}
	        </ExpandTransition>
         </Loader>
    
    );
  }
}
PriemRegNewPerson.defaultProps=
{
	namePanelTab:"priemRegNewPerson"
}

const mapStateToProps=(state)=>
{
  return {
        tabPanelState: state.projectStates.priemTabPanelStates,
        priemUser: state.PriemAccount.user,
        newPerson: state.PriemRegNewPerson,
        stateSystem: state.SystemStatusState  
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
    	updateTabPanelState:(name,items) => dispatch(updateTabPanelState(name,items)),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PriemRegNewPerson)