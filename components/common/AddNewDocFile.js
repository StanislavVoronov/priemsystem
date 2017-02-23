import React from 'react';




import Subheader from 'material-ui/Subheader';
import {Styles} from "../common/StylePriem"
import FileUploadZone from 'react-dropzone';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import PriemButtons from './PriemButtons'
import Popover from 'material-ui/Popover';
import FontIcon from 'material-ui/FontIcon';
import ImageView from 'material-ui/svg-icons/image/image';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Select from "../common/multiSelect";
export default class  AddNewDocFile extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
          dialogOpen:false,
          openPopOverView:false,
          source:'',
          titlePopOver:'',
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
  onPressActionButton(index,fileLoaded)
  {
     if (fileLoaded)
     {
        this.props.deleteImageFile(index)
     }
     else 
     {
        this.props.addNewFileToServer(index)
     }
  }

  showPopOverView(event,file){
    event.preventDefault();
    this.setState({
      openPopOverView: true,
      source:file.preview,
      titlePopOver:file.name,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose(){
    this.setState({
      openPopOverView: false,
    });
  };
  renderPopOverImage()
  {
    
    return (<Popover
              open={this.state.openPopOverView}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
              targetOrigin={{horizontal: 'middle', vertical: 'center'}}
              onRequestClose={this.handleRequestClose.bind(this)}>
               <Card style={{backgroundColor:'#e6e6e6'}}>
                 <CardHeader
                    title={this.state.titlePopOver} />
                  <CardMedia>
                    <img src={this.state.source} />
                  </CardMedia>
            </Card>
        </Popover>)
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
                    type={file.image ? 'delete' : 'save'}
                    label={ file.image ? 'Удалить' : 'Сохранить'} 
                    onClick={this.onPressActionButton.bind(this,index,file.image)} />
                </TableRowColumn>
        </TableRow>)
    })
  }
	render()
	{
     const {defautStateDocTypes,renderTableAttachDocs,
            selectedDocType,showAddButton,onDropFiles}=this.state
    const isAddButton=!defautStateDocTypes && selectedDocType ?  Styles.centerBox : Styles.DisplayNone
		return  (<div>
             {this.renderPopOverImage()}
            <Select data={this.props.docTypeList} filter='startsWith' selected={selectedDocType} onChange={showAddButton} 
                placeholder='Выберите тип документа для добавления одного документа' 
                title='Тип документнта' />
            <FileUploadZone style={Styles.FileUploadZone} onDrop={onDropFiles}>
                 <RaisedButton 
                 style={isAddButton}
               buttonStyle={Styles.widthAuto}
                 label="Добавить новый документ" primary={true} />
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
       
      </div>)
	}
}