import React from 'react'
import Dialog from 'material-ui/Dialog'
import {Styles} from "../common/StylePriem"
import {Card, CardHeader, CardMedia} from "material-ui/Card"
import PriemButtons from './PriemButtons'
import Divider from 'material-ui/Divider'
import Webcam from 'react-webcam'
export default class WebPhoto extends React.Component{

  onMakeWebPhoto(){
      var screenshot = this.refs.webcam.getScreenshot();
      this.props.makeWebPhoto(screenshot)
     
  }
  dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);
      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
      }
      // write the ArrayBuffer to a blob, and you're done
      var bb = new Blob([ab], {type: 'image/jpeg'});
      return bb;
  }
  onWebPhotoDialogClose(isAddWebPhoto){
    let newWebPhotoFile;
    if (isAddWebPhoto){
        var fileBlob = this.dataURItoBlob(this.props.webPhoto);
        newWebPhotoFile = new File([fileBlob], "Фотография.jpeg", {type: "image/jpeg", lastModified: new Date()})
        newWebPhotoFile.blob=fileBlob
        newWebPhotoFile.preview=this.props.webPhoto
    }
    this.props.webPhotoDialogClose(isAddWebPhoto && [newWebPhotoFile])
  }
  render()
  {
    const styleAddWebPhotoButton=Object.assign({},this.props.webPhoto ? {} : Styles.DisplayNone,{marginLeft:25})
    const actions = [
      <PriemButtons
        label="Закрыть"
        type={'delete'}
        onTouchTap={false}
        onClick={this.onWebPhotoDialogClose.bind(this,0)}/>,
      <PriemButtons
        label="Выбрать фотографию"
        type={'add'}
        onTouchTap={false}
        buttonStyle={styleAddWebPhotoButton}
        onClick={this.onWebPhotoDialogClose.bind(this,1)} />]

    return (<Dialog
          title="Фотографирование на кампусную карту Университета"
          titleStyle={{fontSize:16,padding:10}}
          actions={actions}
          modal={true}
          autoDetectWindowHeight={false}
          bodyStyle={{height:'100%', maxHeight: '100%',overflowY:'none'}}
          autoScrollBodyContent={true}
          contentStyle={{ width: '100%',height:'100%', maxHeight: 'none', maxWidth: 'none'}}
          open={this.props.webPhotoDialog}>
              <div style={Styles.dialogWebPhotoBox}>
                    <Card containerStyle={{'textAlign':'center',}} style={{marginTop:5}}> 
                        <CardHeader titleStyle={{'fontWeight':'bold'}} style={{paddingTop:8,paddingBottom:0}}
                          title="Камера" />
                        <Divider style={Styles.hr}/>
                        <CardMedia>
                              <Webcam height={320} audio={false} screenshotFormat={'image/jpeg'} ref='webcam'/>
                        </CardMedia>
                    </Card>
                    { this.props.webPhoto ?
                      <Card containerStyle={{'textAlign':'center'}} style={{marginTop:5}}> 
                          <CardHeader titleStyle={{'fontWeight':'bold'}} style={{paddingTop:8,paddingBottom:0}}
                            title="Фотография" />
                          }
                          <Divider style={Styles.hr}/>
                          <CardMedia >
                                 <img  style={{height:320,width:460}} src={this.props.webPhoto} /> 
                          </CardMedia>
                      </Card> : null}     
              </div>
              <div style={Styles.webPhotoAddScreenBox} >
                  <PriemButtons 
                     onClick={this.onMakeWebPhoto.bind(this)} 
                     type='save'
                     buttonStyle={Object.assign({},Styles.widthAuto)}
                     label="Сделать снимок" />
                </div>
        </Dialog>)
  }
}
