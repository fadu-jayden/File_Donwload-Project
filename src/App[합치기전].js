import React, {Component} from 'react';
import ListModule from './components/fileList.js'
import './css/fileUpdown.css'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import {Button,Input} from 'semantic-ui-react'

class App extends Component{
  constructor() {
    super();
    this.state={
      file: Object(),
    };
    this.fileUpload = this.fileUpload.bind(this);
  }//cons() end
  fileUpload(listRefresh) {
    const formData = new FormData();
    const {file} = this.state;
    formData.append("targetFile",file);
    axios({
      url: 'http://localhost:8080/api/fileUpload',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
   }).then((response)=>{
     if(response.data===1){
       alert("파일 업로드에 성공했습니다");
       listRefresh();
     }else{
       alert("파일 업로드에 실패했습니다");
     }//if~else end
    });
  }//fileUpload() end
  fileSelect(e) {
    //파일리스트를 받아서
    const file = e.target.files[0];
    this.setState({file:file});
  }//fileSelect() end
  render(){
    return <div id ="layout_basic">
      
      <div id ="layout_upload">
        <h1>FileUpload</h1>
        <Input id="targetFile" name="targetFile" type="file" onChange={(e)=>this.fileSelect(e)}></Input>
        <Button type="submit" onClick={()=>this.fileUpload(this.ListModule.getFileList)}>업로드</Button>
      </div>


      <div id="layout_download">

        <ListModule ref={(ref)=>this.ListModule=ref}></ListModule>

      </div>

  </div>;
  }//render() end
}

export default App;
