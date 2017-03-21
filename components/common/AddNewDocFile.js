import React from 'react';



import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {Styles} from "../common/StylePriem"
import FileUploadZone from 'react-dropzone';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import PriemButtons from './PriemButtons'
import WebPhoto from './WebPhoto'
import Popover from 'material-ui/Popover';
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
          popOverImageOpen:false,
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
                  <a href={"#"} onClick={this.handleTouchTap.bind(this,file)} title='Изображение документа'>Изображение</a>
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
  handleTouchTap(file,event){
    event.preventDefault();
    console.log(event.currentTarget)
    this.setState({
      popOverImageOpen:true,
      popOverUrlImage:file.preview,
      popOverNameImage:file.name,
      anchorEl: event.currentTarget,
    });
  };
  makeWebPhoto(screenshot)
  {
      this.setState({webPhoto: screenshot});
  }
  webPhotoDialogClose(photo)
  {
     photo && this.onDropFiles(photo)
     this.setState({webPhotoDialog: false,webPhoto:undefined});
  }
  handleRequestClose(){
    this.setState({
      popOverImageOpen: false,
    });
  };
  renderPopOverImage()
  {
   
    return(
     <Popover
          open={this.state.popOverImageOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'rigth', vertical: 'top'}}
          targetOrigin={{horizontal: 'rigth', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <Card> 
              <CardHeader titleStyle={{'fontWeight':'bold'}} style={{paddingTop:8,paddingBottom:0}}
                title={this.state.popOverNameImage} />
                  <Divider style={Styles.hr}/>
                  <CardMedia>
                        <img style={{width:window.innerWidth/1.4,height:window.innerHeight/1.4}} src={this.state.popOverUrlImage} /> 
                  </CardMedia>
          </Card>
      </Popover>)
  } 
	render()
	{
     const styleAddWebPhotoButton=Object.assign({},this.state.webPhoto ? {} : Styles.DisplayNone,{marginLeft:25})
 
     const {defautStateDocTypes,renderTableAttachDocs,
            selectedDocType,showAddButton,onDropFiles}=this.state
    const isShowAddButton=!defautStateDocTypes && selectedDocType ? {} : Styles.DisplayNone
		return  (<div>
            <Select data={this.props.docTypeList} filter='startsWith' selected={selectedDocType} onChange={showAddButton} 
                placeholder='Выберите тип документа для добавления одного документа' 
                title='Тип документа' />
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
        {this.renderPopOverImage()}
        <WebPhoto makeWebPhoto={this.makeWebPhoto.bind(this)} 
                  webPhotoDialogClose={this.webPhotoDialogClose.bind(this)} 
                  webPhotoDialog={this.state.webPhotoDialog} 
                  webPhoto={this.state.webPhoto}/>
      </div>)
	}
}