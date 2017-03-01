import React from 'react';



import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {Styles} from "../common/StylePriem"
import FileUploadZone from 'react-dropzone';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import PriemButtons from './PriemButtons'
import Dialog from 'material-ui/Dialog';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Select from "../common/multiSelect";
import Webcam from 'react-webcam';
export default class  AddNewDocFile extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
          webPhotoDialog:false,
          webPhoto:undefined,
          selectedDocType:null,
          defautStateDocTypes:false,
          showAddButton:this.showAddButton.bind(this),
          onDropFiles:this.onDropFiles.bind(this),
          renderTableAttachDocs:this.renderTableAttachDocs.bind(this)
     }
  }

  onDropFiles(files) {
       //TODO check the type of image - only JPG FILES
    const mapDocs=files.map(file=>  Object.assign(file,
      {selected:true},{typeDoc:this.state.selectedDocType}));

      this.props.updateFileList(mapDocs)
      this.setState(nextState => ({
          selectedDocType:null,
          defautStateDocTypes:true
        }))
  }
  showAddButton(value)
  {
    this.setState(()=> ({
      selectedDocType:value,
      defautStateDocTypes:false
    }))
  }
  addDocFileByButton(event){
      if (this.state.selectedDocType && this.state.selectedDocType.subTypeDoc==41)
      {
          this.setState({webPhotoDialog:true})
          event.preventDefault();
          event.stopPropagation();
          return false
      }
      
  }
  onPressActionButton(index,fileLoaded)
  {
     if (fileLoaded){
        this.props.deleteImageFile(index)
     }
     else 
     {
        this.props.addNewFileToServer(index)
     }
  }
  webPhotoDialogClose(isAddWebPhoto){
    
    if (isAddWebPhoto){
        const newWebPhotoFile = new File([this.state.webPhoto], "Фотография.jpeg", {type: "image/jpeg", lastModified: new Date()})
        newWebPhotoFile.preview=this.state.webPhoto
        this.onDropFiles([newWebPhotoFile])
    }
    this.setState({webPhotoDialog: false,webPhoto:undefined});
  };
  renderTableAttachDocs()
  {
    if (!this.props.DocFileList) return []
    
    return this.props.DocFileList.map((file,index)=>{
     

     return (<TableRow style={Styles.OverflowVisible} key={index} selectable={false}>
               <TableRowColumn style={Styles.StatusFileRowStyle}>
                      <Checkbox onCheck={()=> this.props.updateFileItemStatus(index,file.selected)} label=""  checked={file.selected}   />
               </TableRowColumn>
              <TableRowColumn  style={Styles.NameFileRowStyle}>{file.name}</TableRowColumn>
              <TableRowColumn  style={Styles.PreviewRowStyle}>
                  <a target='_blank' title='Изображение документа' href={file.preview}>Изображение</a>
              </TableRowColumn>
              <TableRowColumn  style={Object.assign({},Styles.TypeDocFileRowStyle,{'textAlign':'left'})}>{
                <Select data={this.props.docTypeList} styleSelectContainer={{'width':'100%'}}
                  filter='startsWith' 
                      divider={false}  
                  selected={file.typeDoc} onChange={type=> this.props.updateFileItemType(index,type)} 
          placeholder='Выберите тип документа' />}</TableRowColumn>
              <TableRowColumn style={Styles.DeleteButtonRowStyle} >
                <PriemButtons
                    type={file.id ? 'delete' : 'save'}
                    label={ file.id ? 'Удалить' : 'Сохранить'} 
                    onClick={this.onPressActionButton.bind(this,index,file.id)} />
                </TableRowColumn>
        </TableRow>)
    })
  }
  makeWebPhoto(){
      var screenshot = this.refs.webcam.getScreenshot();
      this.setState({webPhoto: screenshot});
  }
	render()
	{
     const styleAddWebPhotoButton=Object.assign({},this.state.webPhoto ? {} : Styles.DisplayNone,{marginLeft:25})
     const actions = [
      <PriemButtons
        label="Закрыть"
        type={'delete'}
        onTouchTap={false}
        onClick={this.webPhotoDialogClose.bind(this,0)}
      />,
      <PriemButtons
        label="Выбрать фотографию"
        type={'add'}
        onTouchTap={false}
        buttonStyle={styleAddWebPhotoButton}
        onClick={this.webPhotoDialogClose.bind(this,1)}
      />];
     const {defautStateDocTypes,renderTableAttachDocs,
            selectedDocType,showAddButton,onDropFiles}=this.state
    const isShowAddButton=!defautStateDocTypes && selectedDocType ? {} : Styles.DisplayNone
		return  (<div>
            <Select data={this.props.docTypeList} filter='startsWith' selected={selectedDocType} onChange={showAddButton} 
                placeholder='Выберите тип документа для добавления одного документа' 
                title='Тип документнта' />
            <FileUploadZone style={Styles.FileUploadZone} onDrop={onDropFiles}>
                 <PriemButtons 
                     onClick={event=>this.addDocFileByButton(event)} 
                     type='add'
                     buttonStyle={isShowAddButton}
                     label="Добавить новый документ" />
                 <Subheader style={Styles.centerBoxHeader} inset={true}>перенесите все необходимые документы в отмеченную область</Subheader>
            </FileUploadZone>
            <Table selectable={false} wrapperStyle={Styles.OverflowVisible} style={Styles.OverflowVisible} bodyStyle={Styles.OverflowVisible}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>

            <TableRow selectable={false}>
                    <TableHeaderColumn style={Styles.StatusFileRowStyle}>Статус</TableHeaderColumn>
              <TableHeaderColumn style={Styles.NameFileRowStyle}>Название файла</TableHeaderColumn>
                    <TableHeaderColumn style={Styles.PreviewRowStyle}>Файл</TableHeaderColumn>
              <TableHeaderColumn style={Styles.TypeDocFileRowStyle}>Тип документа</TableHeaderColumn>
              <TableHeaderColumn style={Styles.DeleteButtonRowStyle}>Действие</TableHeaderColumn>
            </TableRow>
          </TableHeader>
            <TableBody selectable={false} style={Styles.OverflowVisible} displayRowCheckbox={false}>
              {renderTableAttachDocs()}
            </TableBody>
        </Table>
        <Dialog
          title="Фотографирование на кампусную карту Университета"
          titleStyle={{fontSize:16,padding:10}}
          actions={actions}
          modal={true}
          autoDetectWindowHeight={false}
          bodyStyle={{height:'100%', maxHeight: '100%',overflowY:'none'}}
          autoScrollBodyContent={true}
          contentStyle={{ width: '100%',height:'100%', maxHeight: 'none', maxWidth: 'none'}}
          open={this.state.webPhotoDialog}>
              <div style={Styles.dialogWebPhotoBox}>
                    <Card containerStyle={{'textAlign':'center',}} style={{marginTop:5}}> 
                        <CardHeader titleStyle={{'fontWeight':'bold'}} style={{paddingTop:8,paddingBottom:0}}
                          title="Камера" />
                        <Divider style={Styles.hr}/>
                        <CardMedia>
                              <Webcam height={320} audio={false} screenshotFormat={'image/jpeg'} ref='webcam'/>
                        </CardMedia>
                    </Card>
                    { this.state.webPhoto ?
                      <Card containerStyle={{'textAlign':'center'}} style={{marginTop:5}}> 
                          <CardHeader titleStyle={{'fontWeight':'bold'}} style={{paddingTop:8,paddingBottom:0}}
                            title="Фотография" />
                          }
                          <Divider style={Styles.hr}/>
                          <CardMedia >
                                 <img  style={{height:320,width:460}} src={this.state.webPhoto} /> 
                          </CardMedia>
                      </Card> : null}     
              </div>
              <div style={Styles.webPhotoAddScreenBox} >
                  <PriemButtons 
                     onClick={this.makeWebPhoto.bind(this)} 
                     type='save'
                     buttonStyle={Object.assign({},Styles.widthAuto)}
                     label="Сделать снимок" />
                </div>
        </Dialog>
      </div>)
	}
}