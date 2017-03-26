

import React, { PureComponent } from 'react';





import {Styles} from './StylePriem'
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class LoginForm extends PureComponent { 

  regOperator()
  {
        let user={}
        if (this.refs.textLogin.input.value=='' || this.refs.textPassword.input.value=='') return false;
        
        console.log(this.refs.textLogin.input.value)
        user["login"]=this.refs.textLogin.input.value;
        user["pass"]=this.refs.textPassword.input.value;
        this.props.setPriemUser(user)
  }
 
  render() {
    const actions = [
      <FlatButton
        hoverColor={'rgba(0, 188, 212,0.7)'}
        labelStyle={{'color':'rgb(255,255,255)'}}
        backgroundColor={'rgb(0, 188, 212)'}
        label="Войти в систему"
        onTouchTap={this.regOperator.bind(this)}
      />,
    ];
    const titleLogin='ЕАИСПА \nМГУТУ им. К. Г. Разумовского (ПКУ)'
    return (
        <Dialog
          open={!(localStorage["priemUser"] && localStorage["priemUser"].id_operator>0)}
          title={titleLogin}
          modal
          actionsContainerStyle={{'display':'flex','justifyContent':'center'}}
          close={this.regOperator.bind(this)}
          actions={actions}>
            <TextField id='loginName'
              hintText="Логин"
              underlineFocusStyle={{borderColor: '#00e600'}}
              ref='textLogin'
              inputStyle={{paddingLeft:7}}
              fullWidth={true} />
             <Divider /> 
            <TextField id='password'
              hintText="Пароль"
              inputStyle={{paddingLeft:7}}
              underlineFocusStyle={{borderColor: '#00e600'}}
              ref='textPassword'
              fullWidth={true}
              type="password"/>
            <Divider /> 
            <h3 style={Styles.authFailed}>{this.props.priemUser && this.props.priemUser.authMessage}</h3>
        </Dialog>
     
    );
  }
}
