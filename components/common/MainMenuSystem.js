import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux'
class MainMenuList extends React.Component {
   renderMenu()
   {
     //console.log("Links",this.props.user)
      if (!this.props.user) return []
      const links=this.props.user.links;
      if (!links) return []
      let chapter=[];
      let mainLinks=[];
      for (let i=0; i<links.length; i++)
      {
         let linkItems=[];
         let primaryText=links[i].primaryText;
         if (links[i].nestedItems && links[i].nestedItems.length>0)
         {  
            const nestedItems=links[i].nestedItems;
            for (let a=0;a<nestedItems.length;a++)
            {
                linkItems.push( <ListItem
                    key={`SubListItem ${a+i}`}
                    primaryText={nestedItems[a].primaryText}/>)
            }
         }
         mainLinks.push(<ListItem key={`ListItem ${i}`}
                          primaryText={primaryText}
                          initiallyOpen={true}
                          primaryTogglesNestedList={true}
                          nestedItems={linkItems} />)

        mainLinks.push(<Divider key={`Divider ${i}`}/>)
      }
      return mainLinks;
   }
  render() 
  {
      return <List>{this.renderMenu()}</List>
  }
}
export default MainMenuList
// const mapStateToProps=(state,ownProps)=>
// {
//   return {user:state.PriemUser}
// }
// const mapDispatchToProps=(dispatch) => {
//         return {
//             setUser: (action) => dispatch(action)
//         }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(MainMenuList)