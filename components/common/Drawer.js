/* eslint-disable react/jsx-no-bind */
import React, { PureComponent, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Styles} from './StylePriem'
import IconButton from 'material-ui/IconButton';


import IconMenu from 'material-ui/IconMenu';
import Loader from 'react-loader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchIcon from 'material-ui/svg-icons/action/search';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';
import Person from 'material-ui/svg-icons/social/person';
import AddNew from 'material-ui/svg-icons/action/note-add';
import MainMenuSystem from './MainMenuSystem'
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
//import PriemStructure from "../PriemStructure/PriemStructure";
import Divider from 'material-ui/Divider';
import PriemUserRequestList from "../PriemUserRequestList/PriemUserRequestList"
import PriemNewRequest from "../PriemNewRequest/PriemNewRequest";

//import Search from "./search";
import {Card} from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {connect} from "react-redux"
import {setLoggedUser,setPriemUser,getUserListRequest,clearErrorState} from '../actions'
import LoginForm from "./LoginForm";
const Profile = () => (
  <IconMenu iconStyle={{'color':'white'}} 
    iconButtonElement={
      <IconButton tooltip='Профиль' ><MoreVertIcon /></IconButton>}>
    <MenuItem primaryText="Пользователь" />
    <MenuItem primaryText="Права доступа" />
    <MenuItem primaryText="Выход" />
  </IconMenu>
);

class DrawerMainMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      drawerDisplay:false,
      isMainIconMenu:true,
      titleMainApp:'Меню',
      ComponentRender: PriemNewRequest
    }
  }
  componentWillMount()
  {
      
      if (localStorage["priemUser"]) {
        const userPriem=JSON.parse(localStorage["priemUser"])
        this.props.setLoggedUser(userPriem)
        //this.props.getUserListRequest(userPriem.id)
      };
  }

  _showMainMenu()
  {
    this.setState({drawerDisplay:true})
  }
  _changeViewDrawer(open,reason)
  {
     this.setState({drawerDisplay:reason=='clickaway' ? false : true})
  }
  renderRightPanel()
  {
    console.log("renderRightPanel",this.props.userListRequests)
    return (<div>  
                  <IconButton style={{'marginTop':0}} tooltip='Поиск'  iconStyle={{'color':'white'}} ><SearchIcon /></IconButton>
                   <Badge
                        badgeContent={Array.isArray(this.props.userListRequests)  ? this.props.userListRequests.length : 0}
                        secondary={true}
                        style={{padding:0}}
                        badgeStyle={{top: 4, backgroundColor:'#ff0000', right: 6, fontSize:10,width:20,height:20}}>
                        <IconButton style={{'marginTop':0}} tooltip='Очередь запросов' iconStyle={{'color':'white','marginTop':0}} >
                            <NotificationsIcon color='#ffaa00' />
                        </IconButton>
                  </Badge>
                  <IconButton style={{'marginTop':0}} iconStyle={{'color':'white'}} tooltip='Новый запрос'  ><AddNew /></IconButton> 
                  <Profile />
             </div> )
  }
  closeErrorDialog(){
      this.props.clearErrorState()
  }
  closeMessageBox(){

  }
  render() {
    const {ComponentRender,isMainIconMenu,titleMainApp}=this.state
    
    if (this.props.priemUser && this.props.priemUser.id>0){

         return (<div>
          
            <AppBar titleStyle={Styles .mainTitleSystem}
              showMenuIconButton={isMainIconMenu}
              title={titleMainApp}
              iconStyleLeft={Styles.LeftInfoUserMainMenu}
              iconStyleRight={Styles.RightInfoUserMainMenu}
              iconElementLeft={<IconButton tooltip='Меню' ><NavigationMenu /></IconButton>}
              onLeftIconButtonTouchTap={this._showMainMenu.bind(this)}
              iconElementRight={ this.renderRightPanel() }/>
            <Drawer open={this.state.drawerDisplay} docked={false} onRequestChange={(open,reason) => this._changeViewDrawer(open,reason)}>
              <MainMenuSystem user={this.props.priemUser}/>
            </Drawer>
           
             <Card style={Object.assign({},Styles.mainCard,this.props.stateSystem.loading ? {display:'none'} : {})}>
               <Loader loaded={!this.props.stateSystem.loading}> 
                    <PriemNewRequest />     
   
               </Loader>
                      
              </Card>
                 <Snackbar
                    open={false}
                    action="Закрыть"
                    message={`${this.props.error.service}`}
                    onActionTouchTap={this.closeMessageBox.bind(this)} />
                  <Dialog
                      title="Сообщения сервера об ошибке"
                      modal={false}
                      titleStyle={Styles.errorDialogTitle}  
                      onRequestClose={this.closeErrorDialog.bind(this)}
                      open={this.props.error.show}>
                        <Divider style={Styles.hr}/>
                        <div><b>ErrorCode:</b> {this.props.error.codeError}</div>
                        <Divider style={Styles.hr}/>
                        <div><b>Service=parametrs:</b> {this.props.error.service}</div>
                        <Divider style={Styles.hr}/>
                        <div><b>Request:</b> {this.props.error.request}</div>
                        <Divider style={Styles.hr}/>
                        <div><b>Reason:</b> {this.props.error.reason}</div>
                  </Dialog>
            </div> 
        )}
    
        return <LoginForm setPriemUser={this.props.setPriemUser} priemUser={this.props.priemUser}/>

  }
}


const mapStateToProps=(state)=>
{
  return {
        priemUser: state.PriemAccount.user, 
        stateSystem: state.SystemStatusState,
        userListRequests:state.PriemAccount.listRequests,
        error: state.PriemAccount.error, 
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
      clearErrorState:() => dispatch(clearErrorState()),
      setPriemUser: user => dispatch(setPriemUser(user)),
      setLoggedUser: user => dispatch(setLoggedUser(user)),
      getUserListRequest: user=> dispatch(getUserListRequest(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawerMainMenu)