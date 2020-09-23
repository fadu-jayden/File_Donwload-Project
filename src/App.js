import React, {Component} from 'react';
import ListModule from './components/fileList.js'
import Pagination from './components/pagination.js'
import './css/fileUpdown.css'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';

class App extends Component{
  constructor() {
    super();
    this.state={
    };

  }//cons() end


  
/* <form action="http://localhost:8080/api/fileUpload" id="form" name="form" method="post" encType="multipart/form-data">
          <input id="targetFile" name="targetFile" type="file" onChange={this.fileSelect}></input>
          <button type="submit" onClick={this.fileUpload}>aa</button>
        </form>
       */
  fileUpload(file) {

    const formData = new FormData();
    formData.append("targetFile",file);

    axios({
      url: 'http://localhost:8080/api/fileUpload',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
   }).then((response)=>alert(response.data==1?"성공!":"실패.."));
  }//fileUpload() end

  fileSelect(e) {
    //파일리스트를 받아서
    const file = e.target.files[0];
    //FileUpload를 호출하면 된다.
    this.fileUpload(file);
  }//fileSelect() end

  render(){
    return <div id ="layout_basic">
      
      <div id ="layout_upload">
        <h1>FileUpload</h1>
      </div>
      
      <input id="targetFile" name="targetFile" type="file" onChange={(e)=>this.fileSelect(e)}></input>
      <button type="submit" onClick={this.fileUpload}>aa</button>

      <div id="layout_download">

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