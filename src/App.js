import React, {Component} from 'react';
import './css/fileUpdown.css'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import {Button,Input, List, Pagination, Checkbox, Label} from 'semantic-ui-react'

class App extends Component{
  constructor() {
    super();
    this.state={
      file: Object(),
      fileNo:0,
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
    formData.append("targetFile",file);
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
       let thisFileNo = this.state.fileNo+1;
       thisFiles.push({title:file.name,id:thisFileNo});
       this.setState({getFiles:thisFiles});
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
    let fileNo = this.state.fileNo;
    await axios.get('/datas/').then((response)=>{
      let arr = response.data.map((data)=>{
        return {id:++fileNo,title:data};
      })
      this.setState({getFiles : arr});
      this.setState({fileNo:fileNo});
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

  checkFile(e) {
    const {checkedFiles} = this.state;
    let targetFileName = e.target.innerHTML;
    
    if(checkedFiles.indexOf(targetFileName)===-1){
      checkedFiles.push(targetFileName);
      this.setState({checkedFiles :checkedFiles});
    }else{
      checkedFiles.pop(targetFileName);
      this.setState({checkedFiles :checkedFiles});
    }//if~else end
    console.log(checkedFiles);
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
        <h1>uploadFile</h1>
        <Input id="targetFile" name="targetFile" type="file" onChange={(e)=>this.selectUploadFile(e)}></Input>
        <Button type="submit" onClick={this.uploadFile}>업로드</Button>
        
        <h1>checkFiles</h1>
        <List selection verticalAlign='middle'>
            {checkedFiles.map((checkFile)=>{
              return(
              <List.Item >
                  <List.Content>
                    <Label>{checkFile}</Label>
                  </List.Content>
              </List.Item>)
            })}
          </List>
      </div>

      <div id="layout_download">
        <div id ="section_downLoad">
          <Button className="downloadBtn" onClick={this.downloadFiles}>다운로드</Button>

          <List id ="section_fileList" selection verticalAlign='middle'>
          <List.Item className ="fileItem" >
            {console.log('\n')}
                {showFiles.map((file)=> {
                return <List.Content key={file.id}>
                <Checkbox onChange={this.checkFile} label={file.title}  />
                {console.log(file.title+' '+file.id)}
                </List.Content>})}
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
