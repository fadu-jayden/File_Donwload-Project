import React from 'react'
import axious from 'axios'
import { Checkbox, List, Button, Pagination } from 'semantic-ui-react'
import '../css/fileItem.css'
import { Component } from 'react'

class ListExampleSelection extends Component{

  constructor(){
    super();
    
    this.state = {
      offsetSize:3,
      getFiles : [],
      selectedFiles : [],
    }
    this.selectFile = this.selectFile.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
    this.getFileList = this.getFileList.bind(this);
    this.getFileList();
  }//cons end

  async getFileList() { 
    // let idNum = 1;
    await axious.get('/datas/').then((response)=>{
      // let arr = response.data.map((data)=>{
      //   return {id:idNum++,title:data};
      // })
      this.setState({getFiles : response.data});
    })
  }//getFileList() 

  paintFileList(baseIndex) {

  }

  selectFile(e) {
    const {selectedFiles} = this.state;
    let targetFileName = e.target.innerHTML;
    
    if(selectedFiles.indexOf(targetFileName)===-1){
      selectedFiles.push(targetFileName);
      this.setState({selectedFiles :selectedFiles});
    }else{
      selectedFiles.pop(targetFileName);
      this.setState({selectedFiles :selectedFiles});
    }//if~else end
  }//selectFile() end

  downloadFiles() {
    const {selectedFiles} = this.state;

    selectedFiles.forEach((file) => {

      let a = document.createElement("a");
      a.href="/datas/"+file;
      a.download=file;
      a.click();
    });
  }//downloadFiles() end

  changePage(e) {
    console.log(e);
  }//changePage() end

  render(){
      const getFiles = this.state.getFiles;

      return<div id ="section_downLoad">
        <Button className="downloadBtn" onClick={this.downloadFiles}>다운로드</Button>

        <List id ="section_fileList" selection verticalAlign='middle'>
        <List.Item className ="fileItem" >
            {getFiles.map((file,index)=> {
              return <List.Content>
              <Checkbox onChange={this.selectFile} label={file} key={index} />
              {/* {console.log(file.title+' '+file.id)} */}
              </List.Content>}
            )}
        </List.Item>
        </List>

        <div id="section_pagination">
        
        <Pagination
          defaultActivePage={1}
          totalPages={Math.ceil(this.state.getFiles.length/this.state.offsetSize)}
          onPageChange={(e)=>this.changePage(e)}
        />
        </div>
      </div>;
      

      }
}

export default ListExampleSelection
