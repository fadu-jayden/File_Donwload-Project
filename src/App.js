import React, {Component} from 'react';
import axios from 'axios';
import ListModule from './components/fileList.js'
import Pagination from './components/pagination.js'
import './css/fileUpdown.css'
import 'semantic-ui-css/semantic.min.css'
import { Input,Button } from 'semantic-ui-react';

class App extends Component{
  constructor() {
    super();
    this.state={
    };
  }//cons() end

  //선택된 파일이 변경될때(onChange이벤트) 일어나는 콜백함수 manageFile
  selectUploadFile(e) {
    let fileList = e.target.files; //Input요소에서 선택한 파일들의 집합, ArrayLike형태인 FileList로 담김
    let file = fileList[0]; //리스트중에 제일 첫번째 요소를 반환
    
    let reader = new FileReader(); //파일리더 객체 생성
    this.loadFile(file, reader, this.downloadFile, this.uploadFile);
  }//manageFile() end

  loadFile(file, reader, uploadFile ) {
    let content = "";
    reader.readAsText(file);
    reader.onload = function(progressEvent) { //파일리더 객체의 읽기메소드 성공시 호출하는 함수 정의
      content = reader.result;
      // uploadFile(); //파일을 업로드합니다.
    };
  }//loadFile() end

  uploadFile() { //Ajax를 통해 백단과 통신한다. 파일업로드.
    
  }//uploadFile() end

  getFileList() { //백단에서 파일리스트를 받는다, (페이지네이트 포함)
    axios.get('/datas/fileList.json').then(response => {
      alert(response.data);
    })
  }//getFileList() 

  
  downloadFile() { //Ajax를 통해 백단과 통신한다. 파일다운로드. 

  }

  render(){
    return <div id ="layout_basic">
      
      <div id ="layout_upload">
        <h1>FileUpload</h1>
        <Input type="file" onChange={this.uploadFile}></Input>
      </div>

      <div id="layout_download">
        <div id ="section_download">
          <Button>DownLoad</Button>
        </div>

        <div id ="section_fileList">
          <ListModule></ListModule>
        </div>

        <div id ="section_paginate">
          <div id="paginate">
            <Pagination></Pagination>
          </div>
        </div>
        
      </div>


  </div>;
  }//render() end
}

export default App;