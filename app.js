/* index.jsx */
import "babel-polyfill"
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux'
import PriemRootReducer from './components/reducers'
import DrawerMainMenu from './components/common/Drawer';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import WebFontLoader from 'webfontloader';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {networkService} from "./components/common/networkService";



class App extends Component {
  getChildContext() {
     return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    return (
      <Provider store={PriemRootReducer}>
        <DrawerMainMenu localStorage={localStorage["priemUser"]} /> 
      </Provider>
    );
  }
}
App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
render( <App />,document.getElementById('app'));