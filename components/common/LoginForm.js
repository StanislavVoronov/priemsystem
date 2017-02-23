

import React, { PureComponent } from 'react';






import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  button: {
    color:'white',
    
    hover: {
        backgroundColor: 'rgba(0, 188, 212,0.5)'
      }
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    backgroundColor:'rgb(0, 188, 212)'
  },
};
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
    const  isOpen = this.props.loginForm;
    const actions = [
      <FlatButton
        hoverColor={'rgba(0, 188, 212,0.7)'}
        labelStyle={{'color':'rgb(255,255,255)'}}
        backgroundColor={'rgb(0, 188, 212)'}
        label="Войти в систему"
        onTouchTap={this.regOperator.bind(this)}
      />,
    ];
    const titleLogin='Система приема абитуриентов \nМГУТУ им. К. Г. Разумовского (ПКУ)'
    return (
        <Dialog
          open={true}
          title={titleLogin}
          modal
          actionsContainerStyle={{'display':'flex','justifyContent':'center'}}
          close={this.regOperator.bind(this)}
          actions={actions}>
            <TextField id='loginName'
              hintText="Логин"
              ref='textLogin'
              fullWidth={true}/>
            <Divider /> 
            <TextField id='password'
              hintText="Пароль"
              ref='textPassword'
              fullWidth={true}
              type="password"
            />
            <Divider /> 
            <h3 className='errorEntry'>{this.props.priemUser && this.props.priemUser.errorText}</h3>
        </Dialog>
     
    );
  }
}
