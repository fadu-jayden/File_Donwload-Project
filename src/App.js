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

  fileUpload() {
    axios.post('http://localhost:8080/api/fileUpload',{
      filename: 'temp',////
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  render(){
    return <div id ="layout_basic">
      
      <div id ="layout_upload">
        <h1>FileUpload</h1>

      <form action="http://localhost:8080/api/fileUpload" id="form" name="form" method="post" encType="multipart/form-data">
          <input id="filename" name="filename" type="file"></input>
          <button type="submit" onClick={this.fileUpload}>aa</button>
        </form>
      </div>

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