import React, {Component} from 'react';
import '../css/fileUpdown.css';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import {Button, List, Pagination, Checkbox, Label, Header
,Grid, GridColumn} from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';

class File {
  constructor(id,title,isChecked){
    this.id=id;
    this.title=title;
    this.isChecked=isChecked;
  }//cons
}//class File end


class Upload extends Component{
  constructor() {
    super();
    this.state={
      file: Object(),
      fileId:0,
      pageNo:1,
      offsetSize:5,
      getFiles : [],
      checkedFiles : [],
      showFiles :[],
    };

    this.uploadFile = this.uploadFile.bind(this);
    this.checkFile = this.checkFile.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
    this.getFileList = this.getFileList.bind(this);
    this.changePage = this.changePage.bind(this);
    this.getFileList();
  }//cons() end


  uploadFile() {
    const formData = new FormData();
    const {file} = this.state;

    if(file.name===undefined){
      alert("선택된 파일이 없습니다.");
      return ;
    }//if end

    formData.append("targetFile",file);
    let getFiles = this.state.getFiles;
    getFiles = getFiles.map((files)=>{return files.title});
    
    if(getFiles.indexOf(file.name)!==-1){
      alert("이미 있는 파일명입니다.");
      return;
    }//if end

    axios({
      url: 'http://10.10.19.32:8095/ae_fileIO/api/uploadFile',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
   }).then((response)=>{
     if(response.data===1){
       alert("파일 업로드에 성공했습니다");
       let thisFiles = this.state.getFiles;
       const thisFileId = this.state.fileId+1;
       thisFiles.push(new File(thisFileId,file.name,false));

       const  targetFileInputElement = document.querySelector(".ui.left.pointing.basic.label");
       targetFileInputElement.innerHTML="Select File";

       this.setState({getFiles:thisFiles});
       this.setState({fileId:thisFileId});
       this.setState({file:new File()});
       this.paintFileList();
     }else{
       alert("파일 업로드에 실패했습니다");
     }//if~else end
    });
  }//uploadFile() end

  
  selectUploadFile(e) {
    //파일리스트를 받아서
    const file = e.target.files[0];
    const targetFileInputElement = document.querySelector(".ui.left.pointing.basic.label");
    targetFileInputElement.innerHTML=file.name;
    this.setState({file:file});
  }//selectUploadFile() end


  async getFileList() { 
    let fileId = this.state.fileId;
    // await axios.get('C:/"Program Files"/"Apache Software Foundation"/"Tomcat 8.5"/webapps/ROOT/datas/').then((response)=>{
      await axios
      ({
        method:'GET',
        url: 'http://10.10.19.32:8095/ae_fileIO/api/getFiles',
        headers: {
          Accept: 'application/json'
        }
      })
      .then((response)=>{
        let arr = response.data.map((data)=>{
        return new File(++fileId,data.fileName,false);
      })

      this.setState({getFiles : arr});
      this.setState({fileId:fileId});
      this.paintFileList();
    })
  }//getFileList() 

  paintFileList() {
    const totalFiles = this.state.getFiles;
    const startIdx = (this.state.pageNo-1)*this.state.offsetSize;
    let showFiles = [];
    const offset = this.state.offsetSize;

    for(let i=startIdx;i<offset+startIdx;i++){
      if(i>=totalFiles.length)
        break;
      showFiles.push(totalFiles[i]);
    }//for end

    this.setState({showFiles:showFiles});
  }//paintFileList() end

  checkFile(e,file) {
    //아예 checkFiles에 File객체를 넣는건 어때?? Checked여부도 따져야하잖아.

    const {checkedFiles} = this.state;
    let targetFileName = file.title;
    
    if(checkedFiles.indexOf(targetFileName)===-1){
      checkedFiles.push(targetFileName);
      file.isChecked=true;
      this.setState({checkedFiles :checkedFiles});
    }else{
      const targetIdx = checkedFiles.indexOf(targetFileName);
      checkedFiles.splice(targetIdx,1);
      // checkedFiles.pop(targetFileName);
      file.isChecked=false;
      this.setState({checkedFiles :checkedFiles});
    }//if~else end

    // console.log(checkedFiles);
  }//checkFile() end

  downloadFiles() {
    const {checkedFiles} = this.state;
    let {getFiles} = this.state; 

    //이 부분에 파일 Download를 위한 Spring Backend API 가 준비되어야 할것 같다.
    // checkedFiles.forEach((file) => {
    //   let a = document.createElement("a");
    //   a.href="/datas/"+file;
    //   a.download=file;
    //   a.click();
    // });

    

    checkedFiles.forEach((checkedFile) => {

        let a = document.createElement("a");
        a.href='http://10.10.19.32:8095/ae_fileIO/api/downloadFile/'+checkedFile;
        a.click();

      //   const formData = new FormData();
      //   formData.append("checkedFile",checkedFile);
      //   axios({
      //     url: 'http://10.10.19.32:8095/ae_fileIO/api/downloadFile',
      //     method: 'POST',
      //     data: formData,
      // }).then((response)=>{
      //   console.log('파일다운로드 동작 완료');
      //   console.log(response);
        // let a = document.createElement("a");
        // a.href=response;
        // a.download=response;
        // a.click();
      // })
    });
  
    
    getFiles.filter((file)=>file.isChecked=false);
    this.setState({getFiles:getFiles}); 
    this.setState({checkedFiles:[]});
  }//downloadFiles() end

  async changePage(event,data) {
    await this.setState({pageNo:data.activePage});
    this.paintFileList();
  }//changePage() end


  render(){
    const showFiles = this.state.showFiles;
    const checkedFiles = this.state.checkedFiles;

    return<Grid id ="layout_basic" stackable>
      <GridColumn id ="layout_upload">
        <Header as='h1'>uploadFile</Header>
        <InputFile
            input={{
              id: 'targetFile',
              onChange: (e)=>this.selectUploadFile(e),
            }}
        />
        <Button type="submit" onClick={this.uploadFile}>Upload</Button>
        
        <Header as='h1'>checkFiles</Header>
          <List  id="section_checkList" selection verticalAlign='middle'>
              {checkedFiles.map((checkFile,index)=>{return(
                <List.Item key={index} >
                    <List.Content >
                      <Label >{checkFile}</Label>
                    </List.Content>
                </List.Item>)})}
          </List>
      </GridColumn>

      <GridColumn id="layout_download">
          <Button className="downloadBtn" onClick={this.downloadFiles}>Download</Button>
          
          <List id ="section_fileList" selection verticalAlign='middle'>
            <List.Item className ="fileItem" >
              {/* {console.log('\n')} */}
                {showFiles.map((file)=> {return (
              <List.Content key={file.id}>
                <Checkbox onChange={(e)=>{this.checkFile(e,file);}} label={file.title} checked={file.isChecked} />
                {/* {console.log(file.title+' '+file.id)} */}
              </List.Content>)})}
            </List.Item>
          </List>

          <div id="section_pagination">
            <Pagination
              defaultActivePage={1}
              totalPages={Math.ceil(this.state.getFiles.length/this.state.offsetSize)}
              onPageChange={this.changePage}
            />
          </div>
      </GridColumn>
                      
  </Grid>;
  }//render() end
}

export default Upload;