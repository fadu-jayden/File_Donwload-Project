import React from 'react'
import axious from 'axios'
import { Checkbox, List, Button } from 'semantic-ui-react'
import '../css/fileItem.css'
import { Component } from 'react'

class ListExampleSelection extends Component{

  constructor(){
    super();
    
    this.state = {
      getFiles : [],
      selectedFiles : [],
    }
    this.selectFile = this.selectFile.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);

    this.getFileList();
  }//cons end

  async getFileList() { 
    await axious.get('/datas/').then((response)=>{
      this.setState({getFiles : response.data});
    })
  }//getFileList() 

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
    
    console.log(selectedFiles);
    // alert(files);
  }//selectFile() end

  downloadFiles() {
    const {selectedFiles} = this.state;

    selectedFiles.map((file)=>{
      let a = document.createElement("a");
      a.href="/datas/"+file;
      a.download="'downloadFile.txt";
      a.click();
    });


  }//downloadFiles() end

  render(){
      const getFiles = this.state.getFiles;

      return<List selection verticalAlign='middle'>
        <Button onClick={this.downloadFiles}>다운로드</Button>
        <List.Item class ="group_fileItem" >
          
            {getFiles.map(file=>(
            <List.Content>
              <Checkbox onChange={this.selectFile} label={file} />
            </List.Content>
            ))}

        </List.Item>
      </List>;
      }
}

export default ListExampleSelection
