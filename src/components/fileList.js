import React from 'react'
import axious from 'axios'
import { Checkbox, List } from 'semantic-ui-react'
import '../css/fileItem.css'
import { Component } from 'react'

class ListExampleSelection extends Component{

  constructor(){
    super();
    this.state = {
      files : [],
    }
    this.getFileList();
  }//cons end

  async getFileList() { 
    await axious.get('/datas/').then((response)=>{
      this.setState({files : response.data});
    })
  }//getFileList() 

  render(){
      const files = this.state.files;
      return<List selection verticalAlign='middle'>
        <List.Item class ="group_fileItem" >
          
            {files.map(file=>(
            <List.Content>
              <Checkbox label={file} />
            </List.Content>
            ))}

        </List.Item>
      </List>;
      }
}

export default ListExampleSelection
