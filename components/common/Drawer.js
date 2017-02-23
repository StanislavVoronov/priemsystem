/* eslint-disable react/jsx-no-bind */
import React, { PureComponent, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Styles} from './StylePriem'
import IconButton from 'material-ui/IconButton';


import IconMenu from 'material-ui/IconMenu';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchIcon from 'material-ui/svg-icons/action/search';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';
import Person from 'material-ui/svg-icons/social/person';
import AddNew from 'material-ui/svg-icons/action/note-add';
import MainMenuSystem from './MainMenuSystem'

//import PriemStructure from "../PriemStructure/PriemStructure";
import PriemNewRequest from "../PriemNewRequest/PriemNewRequest";
//import Search from "./search";
import {Card} from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {connect} from "react-redux"
import {setLoggedUser,setPriemUser} from '../actions'
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
  renderStateSystem()
  {
    const leftMargin=(window.innerWidth-150)/2
    const styleConteiner=!this.props.stateSystem.loading ? {display: 'none'} : {position: 'relative'}
    return (<div style={styleConteiner}>
      <RefreshIndicator
          size={70}
          left={leftMargin}
          top={20}
          status={"loading"}
          style={Styles.refreshStateStatus} /></div>)
  }
  componentWillMount()
  {
      if (localStorage["priemUser"]) this.props.setLoggedUser(JSON.parse(localStorage["priemUser"]));
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
    return (<div>  
                  <IconButton style={{'marginTop':0}} tooltip='Поиск'  iconStyle={{'color':'white'}} ><SearchIcon /></IconButton>
                   <Badge
                        badgeContent={10}
                        secondary={true}
                        style={{padding:0}}
                        badgeStyle={{top: 1, backgroundColor:'#ff0000', right: 5, fontSize:11,width:18,height:18}}>
                        <IconButton style={{'marginTop':0}} tooltip='Очередь запросов' iconStyle={{'color':'white','marginTop':0}} >
                            <NotificationsIcon color='#ffaa00' />
                        </IconButton>
                  </Badge>
                  <IconButton style={{'marginTop':0}} iconStyle={{'color':'white'}} tooltip='Новый запрос'  ><AddNew /></IconButton> 
                  <Profile />
             </div> )
  }
  render() {
    const {ComponentRender,isMainIconMenu,titleMainApp}=this.state
    if (this.props.priemUser){ 
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
              {this.renderStateSystem()}
             <Card style={Object.assign({},Styles.mainCard,this.props.stateSystem.loading ? {display:'none'} : {})}>
                      <PriemNewRequest />
                    
              </Card>

            </div> 
        )}
        return <LoginForm setPriemUser={this.props.setPriemUser} />

  }
}


const mapStateToProps=(state)=>
{
  return {
        priemUser: state.PriemAccount.user, 
        stateSystem: state.SystemStatusState  
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
      setPriemUser: user => dispatch(setPriemUser(user)),
      setLoggedUser: user => dispatch(setLoggedUser(user)),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawerMainMenu)