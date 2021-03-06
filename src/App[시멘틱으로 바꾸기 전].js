import React, {Component} from 'react';
import './css/fileUpdown.css'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import {Button,Input, List, Pagination, Checkbox, Label, Header
,Grid, GridColumn} from 'semantic-ui-react'

class File {
  constructor(id,title,isChecked){
    this.id=id;
    this.title=title;
    this.isChecked=isChecked;
  }//cons
}//class File end

class App extends Component{
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
      url: 'http://localhost:8080/api/uploadFile',
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
       let thisFileId = this.state.fileId+1;
       thisFiles.push(new File(thisFileId,file.name,false));

       const  targetFileInputElement = document.querySelector("#targetFile");
       targetFileInputElement.value = "";;

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
    this.setState({file:file});
  }//selectUploadFile() end


  async getFileList() { 
    let fileId = this.state.fileId;
    await axios.get('/datas/').then((response)=>{
      let arr = response.data.map((data)=>{
        return new File(++fileId,data,false);
      })

      this.setState({getFiles : arr});
      this.setState({fileId:fileId});
      this.paintFileList();
    })
  }//getFileList() 

  paintFileList() {
    let totalFiles = this.state.getFiles;
    let startIdx = (this.state.pageNo-1)*this.state.offsetSize;
    let showFiles = [];
    let offset = this.state.offsetSize;

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

    checkedFiles.forEach((file) => {
      let a = document.createElement("a");
      a.href="/datas/"+file;
      a.download=file;
      a.click();
    });
  }//downloadFiles() end

  async changePage(event,data) {
    await this.setState({pageNo:data.activePage});
    this.paintFileList();
  }//changePage() end


  render(){
    const showFiles = this.state.showFiles;
    const checkedFiles = this.state.checkedFiles;

    return <div id ="layout_basic">
      <div id ="layout_upload">
        <Header as='h1'>uploadFile</Header>
        <Input id="targetFile" name="targetFile" type="file" onChange={(e)=>this.selectUploadFile(e)}></Input>
        <Button type="submit" onClick={this.uploadFile}>업로드</Button>
        
        <Header as='h1'>checkFiles</Header>
        <div id="section_checkList">
          <List  selection verticalAlign='middle'>
              {checkedFiles.map((checkFile,index)=>{return(
                <List.Item key={index} >
                    <List.Content >
                      <Label >{checkFile}</Label>
                    </List.Content>
                </List.Item>)})}
          </List>
        </div>
      </div>

      <div id="layout_download">
        <div id ="section_downLoad">
          <Button className="downloadBtn" onClick={this.downloadFiles}>다운로드</Button>
          
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
        </div>
      </div>

  </div>;
  }//render() end
}

export default App;